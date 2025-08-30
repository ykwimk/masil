import { PostCard } from "./PostCard";

const DUMMY_POSTS = [
  {
    id: "1",
    title: "Getting Started with Next.js",
    description: "A comprehensive guide to start your first Next.js project.",
    author: "John Doe",
  },
  {
    id: "2",
    title: "Styling in Tailwind CSS",
    description: "Learn the best practices for styling your web applications with Tailwind CSS.",
    author: "Jane Smith",
  },
  {
    id: "3",
    title: "Understanding React Hooks",
    description: "A deep dive into React Hooks and how to use them effectively.",
    author: "Peter Jones",
  },
  {
    id: "4",
    title: "Monorepo with Turborepo",
    description: "How to build and manage a monorepo with Turborepo for high-performance.",
    author: "Alice Johnson",
  },
];

export function PostList() {
  return (
    <section className="container pb-8">
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {DUMMY_POSTS.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </section>
  );
}
