export interface QueryResult<T> {
  data: T[] | null;
  error: { message: string } | null;
  count: number | null;
  status: number;
  statusText: string;
}

export interface Post {
  id: number; // id
  title: string; // 제목
  description: string; // 요약
  nickname: string; // 작성자 닉네임
  email: string; // 작성자 이메일
  tags: string[]; // 태그
  content?: string | null; // 본문(마크다운)
  created_at: string | null; // 생성일
  updated_at?: string | null; // 수정일
  status: 'draft' | 'published'; // 포스트 상태
}

export interface ListPostsParams {
  tag?: string;
  limit?: number;
  offset?: number;
}

export interface ListPostsResult {
  posts: Post[];
  total: number;
  error?: string;
}
