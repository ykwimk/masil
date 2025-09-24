'use client';

import * as React from 'react';
import { NodeViewWrapper, ReactNodeViewRenderer } from '@tiptap/react';
import { mergeAttributes } from '@tiptap/core';
import { clamp } from '@/lib/utils';
import ImageWithSize from './ImageWithSize';
import type { NodeViewProps } from '@tiptap/react';

function ResizableImageComponent(props: NodeViewProps) {
  const { node, updateAttributes, selected, editor } = props;
  const attrs = node.attrs as {
    src: string;
    alt?: string;
    title?: string;
    width?: number | string | null;
    height?: number | string | null;
    textAlign?: 'left' | 'center' | 'right' | 'justify' | null;
  };

  const wrapperRef = React.useRef<HTMLSpanElement | null>(null);
  const startRef = React.useRef<{
    x: number;
    width: number;
    ratio: number;
  } | null>(null);

  const onPointerDown: React.PointerEventHandler<HTMLSpanElement> = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const wrapper = wrapperRef.current;
    if (!wrapper) return;

    const imgEl = wrapper.querySelector('img');
    if (!imgEl) return;

    const rect = imgEl.getBoundingClientRect();
    const currentWidth = rect.width; // rendered width
    const naturalWidth =
      (imgEl as HTMLImageElement).naturalWidth || currentWidth;
    const naturalHeight =
      (imgEl as HTMLImageElement).naturalHeight || rect.height;
    const ratio =
      naturalHeight && naturalWidth ? naturalHeight / naturalWidth : 0;

    startRef.current = { x: e.clientX, width: currentWidth, ratio: ratio || 0 };

    const onMove = (ev: PointerEvent) => {
      if (!startRef.current) return;
      const dx = ev.clientX - startRef.current.x;
      const newWidth = clamp(startRef.current.width + dx, 50, naturalWidth);
      const newHeight = startRef.current.ratio
        ? Math.round(newWidth * startRef.current.ratio)
        : undefined;
      updateAttributes({ width: Math.round(newWidth), height: newHeight });
    };
    const onUp = () => {
      startRef.current = null;
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerup', onUp);
    };

    window.addEventListener('pointermove', onMove);
    window.addEventListener('pointerup', onUp, { once: true });
  };

  const imgStyle: React.CSSProperties = {
    maxWidth: '100%',
    height: 'auto',
    display: 'block',
  };

  const align = attrs.textAlign || null;
  const numericWidth =
    typeof attrs.width === 'number'
      ? attrs.width
      : typeof attrs.width === 'string'
        ? parseInt(attrs.width, 10)
        : undefined;
  const wrapperStyle: React.CSSProperties = {};
  if (align === 'center' || align === 'justify') {
    wrapperStyle.display = 'block';
    wrapperStyle.marginLeft = 'auto';
    wrapperStyle.marginRight = 'auto';
    if (numericWidth && Number.isFinite(numericWidth)) {
      wrapperStyle.width = `${numericWidth}px`;
    } else {
      (wrapperStyle as any).width = 'fit-content';
    }
  } else if (align === 'right') {
    wrapperStyle.display = 'block';
    wrapperStyle.marginLeft = 'auto';
    if (numericWidth && Number.isFinite(numericWidth)) {
      wrapperStyle.width = `${numericWidth}px`;
    } else {
      (wrapperStyle as any).width = 'fit-content';
    }
  }

  return (
    <NodeViewWrapper
      as="span"
      className={`tiptap-image-wrapper${selected ? 'is-selected' : ''}`}
      ref={wrapperRef}
      contentEditable={false}
      draggable={editor.isEditable}
      style={wrapperStyle}
    >
      <img
        src={attrs.src}
        alt={attrs.alt || ''}
        title={attrs.title || ''}
        width={attrs.width || undefined}
        height={attrs.height || undefined}
        loading="lazy"
        decoding="async"
        style={imgStyle}
      />
      <span
        className="tiptap-image-resize-handle"
        onPointerDown={onPointerDown}
      />
    </NodeViewWrapper>
  );
}

const ResizableImage = ImageWithSize.extend({
  addNodeView() {
    return ReactNodeViewRenderer(ResizableImageComponent);
  },
  renderHTML({ HTMLAttributes }) {
    const align = (HTMLAttributes as any)?.textAlign as
      | 'left'
      | 'center'
      | 'right'
      | 'justify'
      | undefined;
    const style: string[] = [];
    if (align === 'center' || align === 'justify') {
      style.push('display:block', 'margin-left:auto', 'margin-right:auto');
    } else if (align === 'right') {
      style.push('display:block', 'margin-left:auto');
    }
    if (style.length) {
      const prev = (HTMLAttributes as any).style as string | undefined;
      (HTMLAttributes as any).style = prev
        ? `${prev}; ${style.join(';')}`
        : style.join(';');
    }
    return [
      'img',
      mergeAttributes(this.options.HTMLAttributes, HTMLAttributes),
    ];
  },
});

export default ResizableImage;
