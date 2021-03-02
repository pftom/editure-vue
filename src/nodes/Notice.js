import { Node } from "tiptap";
import { wrappingInputRule, toggleWrap } from "tiptap-commands";

function getStyle(className) {
  if (className.includes("default")) {
    return "default";
  }

  if (className.includes("primary")) {
    return "primary";
  }

  if (className.includes("success")) {
    return "success";
  }

  if (className.includes("info")) {
    return "info";
  }

  if (className.includes("warning")) {
    return "warning";
  }

  if (className.includes("danger")) {
    return "danger";
  }
}

export default class Notice extends Node {
  get styleOptions() {
    return Object.entries({
      default: this.options.dictionary.default,
      primary: this.options.dictionary.primary,
      success: this.options.dictionary.success,
      info: this.options.dictionary.info,
      warning: this.options.dictionary.warning,
      danger: this.options.dictionary.danger,
    });
  }

  get name() {
    return "notice";
  }

  get schema() {
    return {
      attrs: {
        style: {
          default: "default,",
        },
      },
      content: "block+",
      group: "block",
      defining: true,
      draggable: true,
      parseDOM: [
        {
          tag: "div.notice-block",
          preserveWhitespace: "full",
          contentElement: "div:last-child",
          getAttrs: (dom) => ({
            style: getStyle(dom.className),
          }),
        },
      ],
      toDOM: (node) => {
        const select = document.createElement("select");
        select.addEventListener("change", this.handleStyleChange);

        this.styleOptions.forEach(([key, label]) => {
          const option = document.createElement("option");
          option.value = key;
          option.innerText = label;
          option.selected = node.attrs.style === key;
          select.appendChild(option);
        });

        return [
          "div",
          { class: `notice-block ${node.attrs.style}` },
          ["div", { contentEditable: false }, select],
          ["div", 0],
        ];
      },
    };
  }

  commands({ type }) {
    return (attrs) => toggleWrap(type, attrs);
  }

  handleStyleChange = (event) => {
    const { view } = this.editor;
    const { tr } = view.state;
    const element = event.target;
    const { top, left } = element.getBoundingClientRect();
    const result = view.posAtCoords({ top, left });

    if (result) {
      const transaction = tr.setNodeMarkup(result.inside, undefined, {
        style: element.value,
      });
      view.dispatch(transaction);
    }
  };

  inputRules({ type }) {
    return [wrappingInputRule(/^\s*:::\s$/, type)];
  }
}
