<template>
  <div class="editor-content">
    <div class="editor">
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

          <button class="menubar__button" @click="handleToggleLink">
            link
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

          <button
            class="menubar__button"
            :class="{ 'is-active': isActive.notice() }"
            @click="commands.notice"
          >
            notice
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

          <button
            class="menubar__button"
            @click="
              commands.createTable({
                rowsCount: 3,
                colsCount: 3,
                withHeaderRow: false,
              })
            "
          >
            table
          </button>

          <span v-if="isActive.table()">
            <button class="menubar__button" @click="commands.deleteTable">
              delete_table
            </button>
            <button class="menubar__button" @click="commands.addColumnBefore">
              add_col_before
            </button>
            <button class="menubar__button" @click="commands.addColumnAfter">
              add_col_after
            </button>
            <button class="menubar__button" @click="commands.deleteColumn">
              delete_col
            </button>
            <button class="menubar__button" @click="commands.addRowBefore">
              add_row_before
            </button>
            <button class="menubar__button" @click="commands.addRowAfter">
              add_row_after
            </button>
            <button class="menubar__button" @click="commands.deleteRow">
              delete_row
            </button>
            <button class="menubar__button" @click="commands.toggleCellMerge">
              combine_cells
            </button>
          </span>
        </div>
      </editor-menu-bar>
      <editor-menu-bubble
        class="menububble"
        :editor="editor"
        @hide="hideLinkMenu"
        v-slot="{ commands, isActive, getMarkAttrs, menu }"
      >
        <div
          class="menububble"
          :class="{ 'is-active': !isActive.image() && menu.isActive }"
          :style="`left: ${menu.left}px; bottom: ${menu.bottom}px;`"
        >
          <form
            class="menububble__form"
            v-if="linkMenuIsActive"
            @submit.prevent="setLinkUrl(commands.link, linkUrl)"
          >
            <input
              class="menububble__input"
              type="text"
              v-model="linkUrl"
              placeholder="https://"
              ref="linkInput"
              @keydown.esc="hideLinkMenu"
            />
            <button
              class="menububble__button"
              @click="setLinkUrl(commands.link, null)"
              type="button"
            >
              remove
            </button>
          </form>

          <template v-else>
            <button
              class="menububble__button"
              @click="showLinkMenu(getMarkAttrs('link'))"
              :class="{ 'is-active': isActive.link() }"
            >
              <span>{{ isActive.link() ? "Update Link" : "Add Link" }}</span>
            </button>
          </template>
        </div>
      </editor-menu-bubble>
      <editor-content class="editor__content" :editor="editor" />
    </div>
  </div>
</template>

<script>
import { Editor, EditorContent, EditorMenuBar, EditorMenuBubble } from "tiptap";
import {
  Bold,
  Italic,
  Underline,
  Strike,
  HardBreak,
  Code,
  Heading,
  History,
  Blockquote,
  ListItem,
  OrderedList,
  BulletList,
  TodoList,
  HorizontalRule,
  Placeholder,
  TrailingNode,
  Table,
  TableHeader,
  TableCell,
  TableRow,
} from "tiptap-extensions";
import { Title, Doc } from "./extensions";
import { TodoItem, Image, Notice, CodeBlock } from "./nodes";
import { Link } from "./marks";

import { dictionary } from "./utils";

export default {
  name: "App",
  components: {
    EditorContent,
    EditorMenuBar,
    EditorMenuBubble,
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
          new CodeBlock(),
          new Notice({
            dictionary,
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
          new Link({
            onKeyboardShortcut: this.handleOpenLinkMenu,
          }),
          new HardBreak(),
          new Table({
            resizable: true,
          }),
          new TableHeader(),
          new TableCell(),
          new TableRow(),
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
    handleToggleLink() {
      if (this.editor.isActive.link()) {
        this.editor.commands.link({});
      } else if (!this.editor.isActive.image()) {
        this.handleOpenLinkMenu();
      }
    },
    handleOpenLinkMenu() {
      this.showLinkMenu(this.editor.getMarkAttrs("link"));
    },
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

.notice-block {
  background: rgb(247, 247, 247);
  border-radius: 4px;
  padding: 8px 16px;
  margin: 8px 0;
}

.notice-block .icon {
  width: 24px;
  height: 24px;
  align-self: flex-start;
  margin-right: 4px;
  position: relative;
  top: 1px;
}

.notice-block.primary {
  background: rgb(245, 240, 250);
}

.notice-block.success {
  background: rgb(239, 248, 240);
}

.notice-block.info {
  background: rgb(238, 247, 250);
}

.notice-block.warning {
  background: rgb(253, 248, 234);
}

.notice-block.danger {
  background: rgb(252, 241, 242);
}

@import "./assets/styles/main";
</style>
