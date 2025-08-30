import Link from "next/link";
import { Button } from "@/components/ui/button";

export function HeroSection() {
  return (
    <section className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
      <div className="flex max-w-[980px] flex-col items-start gap-2">
        <h1 className="text-3xl font-extrabold leading-tight tracking-tighter md:text-4xl">
          Masil
        </h1>
        <p className="max-w-[700px] text-lg text-muted-foreground">
          Discover and share your thoughts.
        </p>
      </div>
      <div className="flex gap-4">
        <Button asChild>
          <Link href="/posts">Explore Posts</Link>
        </Button>
      </div>
    </section>
  );
}
