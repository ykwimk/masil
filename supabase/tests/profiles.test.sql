-- profiles의 RLS·칼럼 권한 확인. `supabase test db`로 돈다. 끝에서 rollback해서 DB에 아무것도 남지 않는다
begin;
create extension if not exists pgtap with schema extensions;

-- 아래 단언문 개수와 맞춘다. 중간에 빠진 단언문이 있으면 개수가 달라 실패한다
select plan(5);

-- 테스트 계정 둘: 나(me)와 남(other). 둘 다 트리거로 reader 행이 생긴다
insert into auth.users (id, email) values
  ('11111111-1111-1111-1111-111111111111', 'me@test.local'),
  ('22222222-2222-2222-2222-222222222222', 'other@test.local');

select is(
  (select role from public.profiles where id = '11111111-1111-1111-1111-111111111111'),
  'reader',
  '가입하면 트리거가 reader 행을 만든다'
);

-- 여기부터 me로 로그인한 상태. API 요청이 받는 것과 같은 역할·JWT다
set local role authenticated;
set local request.jwt.claims = '{"sub": "11111111-1111-1111-1111-111111111111", "role": "authenticated"}';

-- reader로서 할 수 있는 것과 못 하는 것. role은 GRANT가 오류로, 남의 행은 RLS가 0행으로 막는다
select lives_ok(
  $$ update public.profiles set nickname = '다른 닉네임' where id = '11111111-1111-1111-1111-111111111111' $$,
  '내 nickname은 바꿀 수 있다'
);

select throws_ok(
  $$ update public.profiles set role = 'admin' where id = '11111111-1111-1111-1111-111111111111' $$,
  '42501',
  null,
  '내 role은 못 바꾼다'
);

select is_empty(
  $$ select * from public.profiles where id = '22222222-2222-2222-2222-222222222222' $$,
  '남의 행은 안보인다'
);

update public.profiles set nickname = '남의 닉네임' where id = '22222222-2222-2222-2222-222222222222';
reset role;

select is(
  (select nickname from public.profiles where id = '22222222-2222-2222-2222-222222222222'),
  null::text,
  '남의 닉네임을 고치려 해도 바뀌지 않는다'
);

select * from finish();
rollback;
