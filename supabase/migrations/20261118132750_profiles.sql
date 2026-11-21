-- 계정마다 한 행. role로 독자·에디터·관리자를 나눈다 (PRODUCT.md '정해진 것')
create table public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  -- Google 실명을 공개 닉네임으로 옮기지 않는다. 닉네임 설정은 7단계
  nickname text check (char_length(nickname) between 1 and 20),
  role text not null default 'reader' check (role in ('reader', 'editor', 'admin')),
  created_at timestamptz not null default now()
);

alter table public.profiles enable row level security;

-- 가입하면 profiles 행을 만든다. auth.users에 쓰는 쪽은 Auth 서버라서 소유자 권한(security definer)으로 돈다
create function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  insert into public.profiles (id) values (new.id);
  return new;
end;
$$;

-- API(/rest/v1/rpc)로 부를 수 없게 한다. 트리거는 실행 권한 없이도 돈다
revoke execute on function public.handle_new_user() from public, anon, authenticated;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- 행은 RLS로, 칼럼은 GRANT로 막는다. role에는 update 권한이 없어서 본인도 못 바꾼다
create policy "본인 행 읽기"
  on public.profiles
  for select
  to authenticated
  using ((select auth.uid()) = id);

create policy "본인 행 고치기"
  on public.profiles
  for update
  to authenticated
  using ((select auth.uid()) = id)
  with check ((select auth.uid()) = id);

revoke all on public.profiles from anon, authenticated;
grant select on public.profiles to authenticated;
grant update (nickname) on public.profiles to authenticated;
