import { Dispatch, SetStateAction } from 'react';

interface TagDropdownListProps {
  listboxId: string;
  suggestions: string[];
  activeIndex: number;
  isCanCreate: boolean;
  createLabel?: string;
  setActiveIndex: Dispatch<SetStateAction<number>>;
  onAddTag: (tag: string) => void;
  onCreateTag: () => void;
}

export default function TagsDropdownList({
  listboxId,
  suggestions,
  activeIndex,
  isCanCreate,
  createLabel,
  setActiveIndex,
  onAddTag,
  onCreateTag,
}: TagDropdownListProps) {
  return (
    <ul
      id={listboxId}
      role="listbox"
      className="absolute z-20 mt-1 max-h-56 w-full overflow-auto rounded-md border bg-white p-1 shadow-lg"
    >
      {isCanCreate && (
        <li role="option" aria-selected={activeIndex === 0}>
          <button
            type="button"
            className={`w-full cursor-pointer rounded px-2 py-1 text-left text-sm hover:bg-gray-100 ${activeIndex === 0 ? 'bg-gray-100' : ''}`}
            onMouseEnter={() => setActiveIndex(0)}
            onClick={onCreateTag}
          >
            {createLabel || '새 태그 추가'}
          </button>
        </li>
      )}
      {suggestions.map((tag, idx) => {
        const pos = idx + (isCanCreate ? 1 : 0);
        return (
          <li key={tag} role="option" aria-selected={pos === activeIndex}>
            <button
              type="button"
              className={`w-full cursor-pointer rounded px-2 py-1 text-left text-sm hover:bg-gray-100 ${pos === activeIndex ? 'bg-gray-100' : ''}`}
              onMouseEnter={() => setActiveIndex(pos)}
              onClick={() => onAddTag(tag)}
            >
              #{tag}
            </button>
          </li>
        );
      })}
    </ul>
  );
}
