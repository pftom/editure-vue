<template>
  <div class="editure-content">
    <div class="editure">
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

          <button class="menubar__button" @click="commands.diff_block">
            diff-block
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
                withHeaderRow: true,
              })
            "
          >
            table
          </button>
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
          v-if="linkMenuIsActive"
          :class="{ 'is-active': !isActive.image() && menu.isActive }"
          :style="`left: ${menu.left}px; bottom: ${menu.bottom}px;`"
        >
          <form
            class="menububble__form"
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
              @click.prevent="setLinkUrl(commands.link, linkUrl)"
              type="button"
            >
              <i class="el-icon-s-claim"></i>
            </button>
            <button
              class="menububble__button"
              @click="setLinkUrl(commands.link, null)"
              type="button"
            >
              <i class="el-icon-delete"></i>
            </button>
            <button
              class="menububble__button"
              @click="handleOpenLink"
              type="button"
            >
              <i class="el-icon-top-right"></i>
            </button>
          </form>

          <!-- <template v-else>
            <button
              class="menububble__button"
              @click="showLinkMenu(getMarkAttrs('link'))"
              :class="{ 'is-active': isActive.link() }"
            >
              <i class="el-icon-link"></i>
            </button>
          </template> -->
        </div>
      </editor-menu-bubble>
      <editor-content class="editor__content" :editor="editor" />
      <selection-toolbar
        v-if="editor"
        :view="editor.view"
        :commands="editor.commands"
        :isActive="linkMenuIsActive"
        :dictionary="dictionary"
        :onOpen="handleOpenSelectionMenu"
        :onClose="handleCloseSelectionMenu"
        :onSearchLink="onSearchLink"
        :onClickLink="onClickLink"
        :onCreateLink="onCreateLink"
      ></selection-toolbar>
      <link-toolbar
        :view="view"
        :dictionary="dictionary"
        :isActive="linkMenuOpen"
        :onCreateLink="onCreateLink"
        :onSearchLink="onSearchLink"
        :onClickLink="onClickLink"
        :onShowToast="onShowToast"
        :onClose="onClose"
      ></link-toolbar>
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
} from "tiptap-extensions";
import { Title, Doc } from "./extensions";
import {
  TodoItem,
  Image,
  Notice,
  CodeBlock,
  DiffBlock,
  Table,
  TableHeaderCell,
  TableRow,
  TableCell,
} from "./nodes";
import { Link } from "./marks";

import { dictionary } from "./utils";
import { selectColumn, selectRow, selectTable } from "prosemirror-utils";
import SelectionToolbar from "@/components/SelectionToolbar";
import LinkToolbar from "@/components/LinkToolbar";
import LinkToolbar from "./components/LinkToolbar.vue";

export default {
  name: "App",
  props: ["onCreateLink", "onSearchLink", "onClickLink", "onShowToast"],
  components: {
    EditorContent,
    EditorMenuBar,
    EditorMenuBubble,
    SelectionToolbar,
    LinkToolbar,
    LinkToolbar,
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
          new DiffBlock(),
          new Notice({
            dictionary: this.dictionary,
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
            onKeyboardShortcut: this.onKeyboardShortcut,
            onClick: this.handleClickLink,
            onClickHashtag: this.onClickHashtag,
            onHoverLink: this.onHoverLink,
          }),
          new HardBreak(),
          new Table({
            resizable: true,
          }),
          new TableCell({
            onSelectTable: this.handleSelectTable,
            onSelectRow: this.handleSelectRow,
          }),
          new TableHeaderCell({
            onSelectColumn: this.handleSelectColumn,
          }),
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
      selectionMenuOpen: false,
      dictionary: dictionary,
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
    handleOpenLink() {
      const { href = "", target = "" } = this.editor.getMarkAttrs("link");
      window.open(href, target);
    },
    handleClickLink() {
      this.handleOpenLinkMenu();
    },
    onKeyboardShortcut() {
      this.editor.commands.link({
        href: "",
      });
      this.handleOpenLinkMenu();
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
    handleSelectRow(index, state) {
      this.editor.view.dispatch(selectRow(index)(state.tr));
    },
    handleSelectColumn(index, state) {
      this.editor.view.dispatch(selectColumn(index)(state.tr));
    },
    handleSelectTable(state) {
      this.editor.view.dispatch(selectTable(state.tr));
    },
    handleOpenSelectionMenu() {
      this.selectionMenuOpen = true;
    },
    handleCloseSelectionMenu() {
      this.selectionMenuOpen = false;
    },
    onClickHashtag() {},
    onHoverLink() {},
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

p {
  margin: 0;
  padding: 0;
}

.editure-content {
  width: 1000px;
  margin: auto;
  padding-top: 40px;
}

.editure {
  border: 2px solid #ddd;
  padding: 40px;
  outline: none;
}

.editure .ProseMirror {
  outline: none;
}

[data-slate-node="element"]:not(li) {
  margin-top: 1em;
}

.editure p.is-editor-empty:first-child::before {
  content: attr(data-empty-text);
  float: left;
  color: #aaa;
  pointer-events: none;
  height: 0;
  font-style: italic;
}

.editure *.is-empty:nth-child(1)::before,
.editure *.is-empty:nth-child(2)::before {
  content: attr(data-empty-text);
  float: left;
  color: #aaa;
  pointer-events: none;
  height: 0;
  font-style: italic;
}

.editure-content .ProseMirror {
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

.image-upload {
  position: absolute;
  z-index: -1;
  left: 0;
  top: 0;
  width: 0;
  height: 0;
  opacity: 0;
}

@import "./assets/styles/main";
@import "./assets/styles/table.scss";
@import "./assets/styles/code.scss";
@import "./assets/styles/note.scss";
</style>
