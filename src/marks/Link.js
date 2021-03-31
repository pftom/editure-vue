import { Mark, Plugin, TextSelection } from "tiptap";
import { updateMark, removeMark, pasteRule } from "tiptap-commands";
import { getMarkRange } from "tiptap-utils";

export default class Link extends Mark {
  get name() {
    return "link";
  }

  get defaultOptions() {
    return {
      openOnClick: true,
      target: null,
    };
  }

  get schema() {
    return {
      attrs: {
        href: {
          default: null,
        },
        target: {
          default: null,
        },
      },
      inclusive: false,
      parseDOM: [
        {
          tag: "a[href]",
          getAttrs: (dom) => ({
            href: dom.getAttribute("href"),
            target: dom.getAttribute("target"),
          }),
        },
      ],
      toDOM: (node) => {
        return [
          "a",
          {
            ...node.attrs,
            rel: "noopener noreferrer nofollow",
            target: node.attrs.target || this.options.target,
          },
          0,
        ];
      },
    };
  }

  commands({ type }) {
    return (attrs) => {
      if (typeof attrs?.href === "string") {
        return updateMark(type, attrs);
      }

      return removeMark(type);
    };
  }

  keys() {
    return {
      "Mod-k": () => {
        this.options.onKeyboardShortcut();
        return;
      },
    };
  }

  pasteRules({ type }) {
    return [
      pasteRule(
        /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z]{2,}\b([-a-zA-Z0-9@:%_+.~#?&//=,()!]*)/gi,
        type,
        (url) => ({ href: url })
      ),
    ];
  }

  get plugins() {
    if (!this.options.openOnClick) {
      return [];
    }

    return [
      new Plugin({
        props: {
          handleClick: (view, pos) => {
            const { schema, doc, tr } = view.state;

            const range = getMarkRange(doc.resolve(pos), schema.marks.link);

            if (!range) return false;

            const $start = doc.resolve(range.from);
            const $end = doc.resolve(range.to);

            const transaction = tr.setSelection(
              new TextSelection($start, $end)
            );

            view.dispatch(transaction);

            this.options.onClick();
            return true;
          },
        },
      }),
    ];
  }
}
