'use client';

import * as React from 'react';
import { EditorContent } from '@tiptap/react';
import { useTiptapEditor } from '@/hooks/useTiptapEditor';
import { Spinner } from '@/components/ui/spinner';
import Toolbar from './Toolbar';

export interface TiptapEditorProps {
  initialHTML?: string;
  onChange?: (html: string) => void;
}

export function TiptapEditor({ initialHTML, onChange }: TiptapEditorProps) {
  const editor = useTiptapEditor({ initialHTML, onChange });

  if (!editor)
    return (
      <div className="flex justify-center py-24">
        <Spinner size={24} />
      </div>
    );

  return (
    <div className="space-y-2">
      <Toolbar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  );
}
