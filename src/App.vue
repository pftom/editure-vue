<template>
  <div class="editure-content">
    <div class="editure">
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
        v-if="editor"
        :view="editor.view"
        :dictionary="dictionary"
        :isActive="linkMenuOpen"
        :onCreateLink="onCreateLink"
        :onSearchLink="onSearchLink"
        :onClickLink="onClickLink"
        :onShowToast="onShowToast"
        :onClose="handleCloseLinkMenu"
      ></link-toolbar>
      <block-menu
        :view="editor.view"
        :commands="editor.commands"
        :dictionary="dictionary"
        :isActive="blockMenuOpen"
        :search="blockMenuSearch"
        :onClose="handleCloseBlockMenu"
        :uploadImage="uploadImage"
        :onLinkToolbarOpen="handleOpenLinkMenu"
        :onImageUploadStart="onImageUploadStart"
        :onImageUploadStop="onImageUploadStop"
        :onShowToast="onShowToast"
        :embeds="embeds"
      ></block-menu>
    </div>
  </div>
</template>

<script>
import { Editor, EditorContent, EditorMenuBubble } from "tiptap";
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
import { Title, Doc, BlockMenuTrigger } from "./extensions";
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
import {
  selectColumn,
  selectRow,
  selectTable,
  findParentNode,
} from "prosemirror-utils";
import SelectionToolbar from "@/components/SelectionToolbar";
import LinkToolbar from "./components/LinkToolbar.vue";
import getDataTransferFiles from "./lib/getDataTransferFiles";
import insertFiles from "@/commands/insertFiles";
import BlockMenu from "./components/BlockMenu.vue";

export default {
  name: "App",
  props: ["onCreateLink", "onSearchLink", "onShowToast", "onClose"],
  components: {
    EditorContent,
    EditorMenuBubble,
    SelectionToolbar,
    LinkToolbar,
    BlockMenu,
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
          new Image({
            dictionary,
            uploadImage: this.uploadImage,
            onImageUploadStart: this.onImageUploadStart,
            onImageUploadStop: this.onImageUploadStop,
            onShowToast: this.onShowToast,
          }),
          new Blockquote(),
          new CodeBlock(),
          new DiffBlock(),
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
          new BlockMenuTrigger({
            dictionary,
            onOpen: this.handleOpenBlockMenu,
            onClose: this.handleCloseBlockMenu,
          }),
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
      dictionary: dictionary,
      blockMenuOpen: false,
      linkMenuOpen: false,
      blockMenuSearch: "",
      selectionMenuOpen: false,
      isEditorFocused: false,
      embeds: [],
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
      // this.showLinkMenu(this.editor.getMarkAttrs("link"));
      this.blockMenuOpen = false;
      this.linkMenuOpen = true;
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
    uploadImage(file) {
      if (!file) return;

      return new Promise((resolve) => {
        const reader = new FileReader();

        reader.onload = (readerEvent) => {
          const src = readerEvent.target.result;

          resolve(src);
        };

        reader.readAsDataURL(file);
      });
    },
    handleImagePicked(event) {
      const files = getDataTransferFiles(event);

      const { view } = this.editor;
      const { state, dispatch } = view;
      const parent = findParentNode((node) => !!node)(state.selection);

      if (parent) {
        dispatch(
          state.tr.insertText(
            "",
            parent.pos,
            parent.pos + parent.node.textContent.length + 1
          )
        );

        insertFiles(view, event, parent.pos, files, {
          uploadImage: this.uploadImage,
          onImageUploadStart: this.onImageUploadStart,
          onImageUploadStop: this.onImageUploadStop,
          onShowToast: this.onShowToast,
          dictionary: dictionary,
        });
      }

      if (this.$refs.image.$el) {
        this.$refs.image.$el.value = "";
      }

      // 后续引入类似 gitbook 那样子的菜单栏才使用这里
      // this.handleCloseBlockMenu();
    },
    onImageUploadStart(e) {},
    onImageUploadStop(e) {},
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
    handleCloseLinkMenu() {
      this.linkMenuOpen = false;
    },
    onClickLink(href) {
      window.open(href, "_blank");
    },
    handleOpenBlockMenu(search) {
      this.blockMenuOpen = true;
      this.blockMenuSearch = search;
    },
    handleCloseBlockMenu() {
      if (!this.blockMenuOpen) return;
      this.blockMenuOpen = false;
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
