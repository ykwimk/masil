import Image from '@tiptap/extension-image';

const ImageWithSize = Image.extend({
  addAttributes() {
    return {
      ...this.parent?.(),
      width: {
        default: null,
        parseHTML: (element) => {
          const attr = element.getAttribute('width');
          const style = (element as HTMLElement).style?.width;
          return attr || style || null;
        },
        renderHTML: (attributes) => {
          if (!attributes.width) return {};
          return { width: String(attributes.width) };
        },
      },
      height: {
        default: null,
        parseHTML: (element) => {
          const attr = element.getAttribute('height');
          const style = (element as HTMLElement).style?.height;
          return attr || style || null;
        },
        renderHTML: (attributes) => {
          if (!attributes.height) return {};
          return { height: String(attributes.height) };
        },
      },
    };
  },
});

export default ImageWithSize;
