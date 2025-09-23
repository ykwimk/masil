'use client';

import {
  useCallback,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
} from 'react';
import TagChip from './TagChip';
import TagsDropdownList from './TagsDropdownList';

interface TagsSelectorProps {
  initialTags: string[];
  maxSelected?: number;
}

export default function TagsSelector({
  initialTags = [],
  maxSelected = 5,
}: TagsSelectorProps) {
  const listboxId = useId();

  const containerRef = useRef<HTMLDivElement | null>(null);

  const [allTags, setAllTags] = useState<string[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>(initialTags);
  const [query, setQuery] = useState<string>('');
  const [open, setOpen] = useState<boolean>(false);
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [isComposing, setIsComposing] = useState<boolean>(false);
  const isLimitedLength = selectedTags.length >= maxSelected;

  const suggestions = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    const remainingTags = allTags.filter((tag) => !selectedTags.includes(tag));
    const list = normalizedQuery
      ? remainingTags.filter((t) => t.toLowerCase().includes(normalizedQuery))
      : remainingTags;
    const limitedList = list.slice(0, 10);

    return limitedList;
  }, [allTags, selectedTags, query]);

  const isCanCreate = useMemo(() => {
    if (isLimitedLength) return false;

    const trimmedQuery = query.trim();
    if (!trimmedQuery) return false;

    const isExists = allTags.some(
      (tag) => tag.toLowerCase() === trimmedQuery.toLowerCase(),
    );
    const isExistsSelected = selectedTags.some(
      (tag) => tag.toLowerCase() === trimmedQuery.toLowerCase(),
    );
    return !isExists && !isExistsSelected;
  }, [query, isLimitedLength, allTags, selectedTags]);

  const resetQuery = useCallback(() => {
    setQuery('');
    setActiveIndex(0);
  }, []);

  const handleAddTag = useCallback(
    (tag: string) => {
      const name = tag.trim().replace(/\s+/g, ' ');
      if (!name) return;
      if (selectedTags.includes(name)) return;
      if (isLimitedLength) return;

      setSelectedTags((prev) => [...prev, name]);
      resetQuery();
      setOpen(false);
    },
    [selectedTags, isLimitedLength, resetQuery],
  );

  const handleRemoveTag = useCallback((tag: string) => {
    setSelectedTags((prev) => prev.filter((t) => t !== tag));
  }, []);

  const handleEnter = useCallback(() => {
    if (isLimitedLength) return;
    const total = suggestions.length + (isCanCreate ? 1 : 0);
    if (total === 0) return;

    if (isCanCreate && activeIndex === 0) {
      const newTag = query.trim();
      if (newTag) handleAddTag(newTag);
      return;
    }

    const idx = activeIndex - (isCanCreate ? 1 : 0);
    const bounded = Math.max(0, Math.min(idx, suggestions.length - 1));
    const pickTag = suggestions[bounded];
    if (pickTag) handleAddTag(pickTag);
  }, [
    isLimitedLength,
    suggestions,
    isCanCreate,
    activeIndex,
    query,
    handleAddTag,
  ]);

  const handleBackspace = useCallback(() => {
    if (query === '' && selectedTags.length > 0) {
      handleRemoveTag(selectedTags[selectedTags.length - 1]);
    }
  }, [query, selectedTags, handleRemoveTag]);

  const handleArrowDown = useCallback(() => {
    if (isLimitedLength) return;
    if (!open) setOpen(true);
    const total = suggestions.length + (isCanCreate ? 1 : 0);
    if (total > 0) {
      setActiveIndex((i) => (i + 1) % total);
    }
  }, [open, suggestions.length, isLimitedLength, isCanCreate]);

  const handleArrowUp = useCallback(() => {
    const total = suggestions.length + (isCanCreate ? 1 : 0);
    if (total > 0) {
      setActiveIndex((i) => (i - 1 + total) % total);
    }
  }, [suggestions.length, isCanCreate]);

  const onKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      const nativeAny = e.nativeEvent;
      if (isComposing || nativeAny?.isComposing) return;

      switch (e.key) {
        case 'Enter':
          e.preventDefault();
          handleEnter();
          break;
        case 'Backspace':
          if (query === '' && selectedTags.length > 0) e.preventDefault();
          handleBackspace();
          break;
        case 'ArrowDown':
          e.preventDefault();
          handleArrowDown();
          break;
        case 'ArrowUp':
          e.preventDefault();
          handleArrowUp();
          break;
        case 'Escape':
          if (open) {
            e.preventDefault();
            setOpen(false);
          }
          break;
      }
    },
    [
      isComposing,
      open,
      query,
      selectedTags.length,
      handleEnter,
      handleBackspace,
      handleArrowDown,
      handleArrowUp,
    ],
  );

  const fetchTags = useCallback(async (signal: AbortSignal) => {
    const res = await fetch('/api/tags', { cache: 'no-store', signal });
    if (!res.ok) return [];

    const data = await res.json();
    return Array.isArray(data?.tags) ? data.tags : [];
  }, []);

  const loadTags = useCallback(
    async (signal: AbortSignal) => {
      try {
        const tags = await fetchTags(signal);
        setAllTags(tags);
      } catch (err: any) {
        if (err?.name === 'AbortError') return;
        setAllTags([]);
      }
    },
    [fetchTags],
  );

  useEffect(() => {
    const controller = new AbortController();
    loadTags(controller.signal);

    return () => controller.abort();
  }, [loadTags]);

  useEffect(() => {
    const onClickOutside = (e: MouseEvent) => {
      if (!containerRef.current) return;
      if (!containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', onClickOutside);
    return () => document.removeEventListener('mousedown', onClickOutside);
  }, []);

  return (
    <div ref={containerRef} className="relative">
      {selectedTags.map((t) => (
        <input key={`hidden-${t}`} type="hidden" name="tags" value={t} />
      ))}
      <input
        type="text"
        name="tagsRequired"
        value={selectedTags.length > 0 ? '1' : ''}
        readOnly
        className="sr-only"
        aria-hidden
        required
      />
      <div className="flex flex-wrap gap-2 rounded-md border px-3 py-2">
        {selectedTags.map((t) => (
          <TagChip key={t} tag={t} onRemoveTag={handleRemoveTag} />
        ))}
        <input
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            if (!isLimitedLength) setOpen(true);
            setActiveIndex(0);
          }}
          onFocus={() => !isLimitedLength && setOpen(true)}
          onKeyDown={onKeyDown}
          onCompositionStart={() => setIsComposing(true)}
          onCompositionEnd={(e) => {
            setIsComposing(false);
            setQuery((e.target as HTMLInputElement).value);
          }}
          placeholder={
            selectedTags.length > 0 ? '' : '태그를 검색해 선택하세요'
          }
          className="placeholder:text-muted-foreground/70 min-w-[180px] flex-1 border-0 p-0 text-sm outline-none"
          aria-label="태그 검색"
          role="combobox"
          aria-expanded={open}
          aria-controls={listboxId}
          aria-autocomplete="list"
          aria-disabled={isLimitedLength}
          title={isLimitedLength ? '최대 5개까지 선택할 수 있어요' : undefined}
        />
      </div>
      {open && !isLimitedLength && (suggestions.length > 0 || isCanCreate) && (
        <TagsDropdownList
          listboxId={listboxId}
          suggestions={suggestions}
          activeIndex={activeIndex}
          isCanCreate={isCanCreate}
          createLabel={
            query.trim() ? `+ "${query.trim()}" 새 태그 추가` : undefined
          }
          setActiveIndex={setActiveIndex}
          onAddTag={handleAddTag}
          onCreateTag={() => {
            const newTag = query.trim();
            if (newTag) handleAddTag(newTag);
          }}
        />
      )}
      <p
        className={`text-muted-foreground mt-2 text-xs ${isLimitedLength && 'text-red-500'}`}
      >
        {isLimitedLength
          ? '최대 5개까지 선택할 수 있어요.'
          : '등록된 태그를 검색해 선택하세요.'}
      </p>
    </div>
  );
}
