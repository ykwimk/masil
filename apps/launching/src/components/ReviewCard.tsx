import { ArrowUpRight } from 'lucide-react';

export default function ReviewCard({
  authorLabel,
  text,
  href,
}: {
  authorLabel: string;
  text: string;
  href: string;
}) {
  return (
    <div className="group border-border hover:border-primary/40 focus-within:border-ring focus-within:ring-ring/20 after:bg-primary/30 relative overflow-hidden rounded-xl border bg-white p-5 transition-all duration-200 after:pointer-events-none after:absolute after:inset-x-0 after:bottom-0 after:h-2 after:rounded-b-xl after:opacity-0 after:transition-opacity after:duration-300 after:content-[''] focus-within:ring-2 hover:-translate-y-1 hover:shadow-sm hover:after:opacity-100">
      <h4 className="font-medium">{authorLabel}</h4>
      <p className="text-foreground/70 mt-2 break-keep whitespace-pre-line">
        {text}
      </p>
      <a
        href={href}
        target="_blank"
        rel="noreferrer"
        className="text-primary hover:text-primary/90 mt-3 inline-flex items-center gap-1 text-sm hover:underline"
      >
        원문 보기{' '}
        <ArrowUpRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
      </a>
    </div>
  );
}
