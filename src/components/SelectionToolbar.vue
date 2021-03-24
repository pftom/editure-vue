<template>
  <floating-toolbar :view="view" :active="visible">
    <Menu :items="items" :view="view" :commands="commands"></Menu>
  </floating-toolbar>
</template>

<script>
import {
  getColumnIndex,
  getMarkRange,
  getRowIndex,
  isMarkActive,
  isNodeActive,
} from "../queries";
import getTableMenuItems from "../menus/table";
import getTableColMenuItems from "../menus/tableCol";
import getTableRowMenuItems from "../menus/tableRow";
import getFormattingMenuItems from "../menus/formatting";
import { dictionary } from "../utils";

// 组件
import FloatingToolbar from "./FloatingToolbar";
import Menu from "./Menu";

import some from "lodash.some";

function isVisible(props) {
  const { view } = props;
  const { selection } = view.state;

  if (!selection) return false;
  if (selection.empty) return false;
  if (selection.node && selection.node.type.name === "image") {
    return true;
  }
  if (selection.node) return false;

  const slice = selection.content();
  const fragment = slice.content;
  const nodes = fragment.content;

  return some(nodes, (n) => n.content.size);
}

export default {
  props: ["view", "commands"],
  data() {
    return {
      isActive: false,
    };
  },
  components: {
    FloatingToolbar,
    Menu,
  },
  computed: {
    items() {
      const { state } = this.view;
      const isCodeSelection = isNodeActive(state.schema.nodes.code_block)(
        state
      );

      // toolbar
      if (isCodeSelection) {
        return null;
      }

      const colIndex = getColumnIndex(state.selection);
      const rowIndex = getRowIndex(state.selection);

      const isTableSelection = colIndex !== undefined && rowIndex !== undefined;

      let items = [];
      // TODO: formatting/link/image 相关的选中弹窗
      if (isTableSelection) {
        items = getTableMenuItems(dictionary);
      } else if (colIndex !== undefined) {
        items = getTableColMenuItems(state, colIndex, dictionary);
      } else if (rowIndex !== undefined) {
        items = getTableRowMenuItems(state, rowIndex, dictionary);
      } else {
        items = getFormattingMenuItems(state, dictionary);
      }

      return items;
    },
    linkMenuVisible() {
      const link = isMarkActive(state.schema.marks.link)(state);
      const range = getMarkRange(selection.$from, state.schema.marks.link);

      return link && range;
    },
    visible() {
      return isVisible({ view: this.view });
    },
  },
  updated() {
    const visible = isVisible({
      view: this.view,
    });

    if (this.isActive && !visible) {
      this.isActive = false;

      this.$emit("onClose");
    }

    if (!this.isActive && visible) {
      this.isActive = true;

      this.$emit("onOpen");
    }
  },
};
</script>
