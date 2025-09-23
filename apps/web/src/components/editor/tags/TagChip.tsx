interface TagChipProps {
  tag: string;
  onRemoveTag: (tag: string) => void;
}

export default function TagChip({ tag, onRemoveTag }: TagChipProps) {
  return (
    <span className="bg-primary/10 text-primary inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs">
      #{tag}
      <button
        type="button"
        className="text-primary/70 hover:text-primary cursor-pointer"
        onClick={() => onRemoveTag(tag)}
        aria-label={`${tag} 태그 제거`}
      >
        ×
      </button>
    </span>
  );
}
