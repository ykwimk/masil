import { Dispatch, SetStateAction } from 'react';

interface TagDropdownListProps {
  listboxId: string;
  suggestions: string[];
  activeIndex: number;
  setActiveIndex: Dispatch<SetStateAction<number>>;
  onAddTag: (tag: string) => void;
}

export default function TagsDropdownList({
  listboxId,
  suggestions,
  activeIndex,
  setActiveIndex,
  onAddTag,
}: TagDropdownListProps) {
  return (
    <ul
      id={listboxId}
      role="listbox"
      className="absolute z-20 mt-1 max-h-56 w-full overflow-auto rounded-md border bg-white p-1 shadow-lg"
    >
      {suggestions.map((tag, idx) => (
        <li key={tag} role="option" aria-selected={idx === activeIndex}>
          <button
            type="button"
            className={`w-full cursor-pointer rounded px-2 py-1 text-left text-sm hover:bg-gray-100 ${idx === activeIndex ? 'bg-gray-100' : ''}`}
            onMouseEnter={() => setActiveIndex(idx)}
            onClick={() => onAddTag(tag)}
          >
            #{tag}
          </button>
        </li>
      ))}
    </ul>
  );
}
