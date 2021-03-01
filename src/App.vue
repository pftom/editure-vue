<template>
  <div class="editor-content">
    <editor-menu-bar :editor="editor" v-slot="{ commands, isActive }">
      <div class="menubar">
        <button class="menubar__button" @click="commands.undo">
          undo
        </button>

        <button class="menubar__button" @click="commands.redo">
          redo
        </button>
        <button
          class="menubar__button"
          :class="{ 'is-active': isActive.bold() }"
          @click="commands.bold"
        >
          bold
        </button>

        <button
          class="menubar__button"
          :class="{ 'is-active': isActive.italic() }"
          @click="commands.italic"
        >
          italic
        </button>

        <button
          class="menubar__button"
          :class="{ 'is-active': isActive.strike() }"
          @click="commands.strike"
        >
          strike
        </button>

        <button
          class="menubar__button"
          :class="{ 'is-active': isActive.underline() }"
          @click="commands.underline"
        >
          underline
        </button>

        <button
          class="menubar__button"
          :class="{ 'is-active': isActive.code() }"
          @click="commands.code"
        >
          code
        </button>

        <button
          class="menubar__button"
          :class="{ 'is-active': isActive.paragraph() }"
          @click="commands.paragraph"
        >
          paragraph
        </button>

        <button
          class="menubar__button"
          :class="{ 'is-active': isActive.heading({ level: 1 }) }"
          @click="commands.heading({ level: 1 })"
        >
          H1
        </button>

        <button
          class="menubar__button"
          :class="{ 'is-active': isActive.heading({ level: 2 }) }"
          @click="commands.heading({ level: 2 })"
        >
          H2
        </button>

        <button
          class="menubar__button"
          :class="{ 'is-active': isActive.heading({ level: 3 }) }"
          @click="commands.heading({ level: 3 })"
        >
          H3
        </button>

        <button
          class="menubar__button"
          :class="{ 'is-active': isActive.bullet_list() }"
          @click="commands.bullet_list"
        >
          ul
        </button>

        <button
          class="menubar__button"
          :class="{ 'is-active': isActive.ordered_list() }"
          @click="commands.ordered_list"
        >
          ol
        </button>

        <button
          class="menubar__button"
          :class="{ 'is-active': isActive.todo_list() }"
          @click="commands.todo_list"
        >
          checklist
        </button>

        <button
          class="menubar__button"
          :class="{ 'is-active': isActive.blockquote() }"
          @click="commands.blockquote"
        >
          quote
        </button>

        <button
          class="menubar__button"
          :class="{ 'is-active': isActive.code_block() }"
          @click="commands.code_block"
        >
          code-block
        </button>

        <button class="menubar__button">
          <input
            type="file"
            ref="image"
            @change="handleImageUpload"
            class="image-upload"
          />
          <span @click="clickImageButton">image</span>
        </button>

        <button class="menubar__button" @click="commands.horizontal_rule">
          hr
        </button>
      </div>
    </editor-menu-bar>
    <div class="editor">
      <editor-content class="editor_content" :editor="editor" />
    </div>
  </div>
</template>

<script>
import { Editor, EditorContent, EditorMenuBar } from "tiptap";
import {
  Bold,
  Italic,
  Link,
  Underline,
  Strike,
  HardBreak,
  Code,
  Heading,
  History,
  Blockquote,
  CodeBlockHighlight,
  ListItem,
  OrderedList,
  BulletList,
  TodoList,
  HorizontalRule,
  Placeholder,
  TrailingNode,
} from "tiptap-extensions";
import { Title, Doc } from "./extensions";
import { TodoItem, Image } from "./nodes";
import javascript from "highlight.js/lib/languages/javascript";
import css from "highlight.js/lib/languages/css";
import xml from "highlight.js/lib/languages/xml";

export default {
  name: "App",
  components: {
    EditorContent,
    EditorMenuBar,
  },
  data() {
    return {
      editor: new Editor({
        autoFocus: true,
        extensions: [
          new History(),
          new Heading({
            levels: [1, 2, 3, 4],
          }),
          new Image(),
          new Blockquote(),
          new CodeBlockHighlight({
            languages: {
              javascript,
              css,
              xml,
            },
          }),
          new ListItem(),
          new OrderedList(),
          new BulletList(),
          new TodoItem({
            nested: true,
          }),
          new TodoList(),
          new HorizontalRule(),
          new TrailingNode(),
          new Bold(),
          new Italic(),
          new Underline(),
          new Strike(),
          new Link(),
          new HardBreak(),
          new Code(),
          new Doc(),
          new Title(),
          new Placeholder({
            showOnlyCurrent: false,
            emptyNodeText: (node) => {
              if (node.type.name === "title") {
                return "请输入标题";
              }
            },
          }),
        ],
      }),
      linkUrl: null,
      linkMenuIsActive: false,
    };
  },
  methods: {
    showLinkMenu(attrs) {
      this.linkUrl = attrs.href;
      this.linkMenuIsActive = true;
      this.$nextTick(() => {
        this.$refs.linkInput.focus();
      });
    },
    hideLinkMenu() {
      this.linkUrl = null;
      this.linkMenuIsActive = false;
    },
    setLinkUrl(command, url) {
      command({ href: url });
      this.hideLinkMenu();
    },
    clickImageButton(e) {
      e.preventDefault();

      this.$refs.image.click();
    },
    handleImageUpload(e) {
      const files = e.target.files;
      const images = Array.from(files).filter((file) =>
        /image/i.test(file.type)
      );

      if (images.length === 0) {
        return;
      }

      e.preventDefault();

      images.forEach((image) => {
        const reader = new FileReader();

        reader.onload = (readerEvent) => {
          const src = readerEvent.target.result;

          this.editor.commands.image({ src });
          console.log("commands");
        };

        reader.readAsDataURL(image);
      });
    },
  },
  beforeDestroy() {
    this.editor.destroy();
  },
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.editor-content {
  width: 666px;
  margin: auto;
  padding-top: 40px;
}

.editor {
  border: 2px solid #ddd;
  padding: 10px;
  outline: none;
}

.editor .ProseMirror {
  outline: none;
}

input {
  box-sizing: border-box;
  font-size: 0.85em;
  width: 100%;
  border: 2px solid #ddd;
  background: #fafafa;
}
input:focus {
  outline: 0;
  border-color: blue;
}
body {
  margin: 0;
  line-height: 24px;
}
h1 {
  font-size: 28px;
  line-height: 36px;
}
h2 {
  font-size: 24px;
  line-height: 32px;
}
h3 {
  font-size: 20px;
  line-height: 28px;
}
h4 {
  font-size: 16px;
  line-height: 24px;
}
p {
  line-height: 24px;
  margin: 0;
}
pre {
  color: white;
  background-color: rgb(30, 30, 30);
  white-space: pre-wrap;
  margin: 0 !important;
}
code {
  font-family: monospace;
  background-color: #eee;
  padding: 3px;
}
:not(pre) > code {
  font-family: monospace;
  background-color: #eee;
  padding: 3px;
}
img {
  max-width: 100%;
  max-height: 20em;
  margin: 1em 0;
}
blockquote {
  border-left: 2px solid #ddd;
  margin: 0.5em 0;
  padding-left: 10px;
  color: #aaa;
}
blockquote[dir="rtl"] {
  border-left: none;
  margin: 0.5em 0;
  padding-left: 0;
  padding-right: 10px;
  border-right: 2px solid #ddd;
}
table {
  border-collapse: collapse;
}
td {
  padding: 10px;
  border: 2px solid #ddd;
}
a {
  cursor: pointer;
  word-wrap: break-word;
  text-decoration: none;
  color: #096dd9;
}
[data-slate-node="element"]:not(li) {
  margin-top: 1em;
}

.editor p.is-editor-empty:first-child::before {
  content: attr(data-empty-text);
  float: left;
  color: #aaa;
  pointer-events: none;
  height: 0;
  font-style: italic;
}

.editor *.is-empty:nth-child(1)::before,
.editor *.is-empty:nth-child(2)::before {
  content: attr(data-empty-text);
  float: left;
  color: #aaa;
  pointer-events: none;
  height: 0;
  font-style: italic;
}

.editor_content .ProseMirror {
  padding: 10px;
}

ul[data-type="todo_list"] {
  padding-left: 0;
}
li[data-type="todo_item"] {
  display: flex;
  flex-direction: row;
}

.todo-checkbox {
  border: 2px solid #000;
  height: 0.9em;
  width: 0.9em;
  box-sizing: border-box;
  margin-right: 10px;
  margin-top: 0.3rem;
  user-select: none;
  -webkit-user-select: none;
  cursor: pointer;
  border-radius: 0.2em;
  background-color: transparent;
  transition: 0.4s background;
}

.todo-content {
  flex: 1;
  > p:last-of-type {
    margin-bottom: 0;
    margin: 0;
  }
  > ul[data-type="todo_list"] {
    margin: 0.5rem 0;
  }
}

li[data-done="true"] {
  > .todo-content {
    > p {
      text-decoration: line-through;
    }
  }
  > .todo-checkbox {
    background-color: #000;
  }
}
li[data-done="false"] {
  text-decoration: none;
}

button {
  margin-right: 10px;
}

.menubar {
  margin-bottom: 20px;
}

.is-active {
  font-weight: bolder;
}

/* 代码高亮 */
pre {
  &::before {
    content: attr(data-language);
    text-transform: uppercase;
    display: block;
    text-align: right;
    font-weight: bold;
    font-size: 0.6rem;
  }
  code {
    .hljs-comment,
    .hljs-quote {
      color: #999999;
    }
    .hljs-variable,
    .hljs-template-variable,
    .hljs-attribute,
    .hljs-tag,
    .hljs-name,
    .hljs-regexp,
    .hljs-link,
    .hljs-name,
    .hljs-selector-id,
    .hljs-selector-class {
      color: #f2777a;
    }
    .hljs-number,
    .hljs-meta,
    .hljs-built_in,
    .hljs-builtin-name,
    .hljs-literal,
    .hljs-type,
    .hljs-params {
      color: #f99157;
    }
    .hljs-string,
    .hljs-symbol,
    .hljs-bullet {
      color: #99cc99;
    }
    .hljs-title,
    .hljs-section {
      color: #ffcc66;
    }
    .hljs-keyword,
    .hljs-selector-tag {
      color: #6699cc;
    }
    .hljs-emphasis {
      font-style: italic;
    }
    .hljs-strong {
      font-weight: 700;
    }
  }
}

.image-upload {
  position: absolute;
  z-index: -1;
  left: 0;
  top: 0;
  width: 0;
  height: 0;
  opacity: 0;
}
</style>
