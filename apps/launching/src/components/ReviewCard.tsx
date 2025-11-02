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
    <div className="border-border rounded-xl border p-5">
      <h4 className="font-medium">{authorLabel}</h4>
      <p className="text-foreground/70 mt-2 break-keep whitespace-pre-line">
        {text}
      </p>
      <a
        href={href}
        target="_blank"
        rel="noreferrer"
        className="text-primary mt-3 inline-flex items-center gap-1 text-sm hover:underline"
      >
        원문 보기 <ArrowUpRight className="h-4 w-4" />
      </a>
    </div>
  );
}
