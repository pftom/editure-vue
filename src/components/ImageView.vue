<template>
  <span>
    <div>
      <img
        :src="src"
        :title="node.attrs.title"
        :alt="node.attrs.alt"
        :width="width"
        :height="height"
        :class="{
          'image-focused': selected,
        }"
        @click="selectImage"
      />
    </div>
  </span>
</template>

<script>
import { ResizeObserver } from "@juggle/resize-observer";
import { resolveImg, RESIZE_DIRECTION } from "../utils/image";
import { NodeSelection } from "prosemirror-state";

export default {
  props: ["node", "updateAttrs", "view", "getPos", "selected"],
  data() {
    return {
      maxSize: {
        width: 1000,
        height: 1000,
      },
      minSize: {
        width: 24,
        height: 24,
      },
      resizeDirections: [
        RESIZE_DIRECTION.TOP_LEFT,
        RESIZE_DIRECTION.TOP_RIGHT,
        RESIZE_DIRECTION.BOTTOM_LEFT,
        RESIZE_DIRECTION.BOTTOM_RIGHT,
      ],
      resizing: false,
      resizeState: {
        x: 0,
        y: 0,
        w: 0,
        h: 0,
        dir: "",
      },
    };
  },
  computed: {
    src() {
      return this.node.attrs.src;
    },
    width() {
      return this.node.attrs.width;
    },
    height() {
      return this.node.attrs.height;
    },
    resizeObj() {
      return new ResizeObserver(() => {
        this.getMaxSize();
      });
    },
  },
  async created() {
    const result = await resolveImg(this.src);

    if (!result.complete) {
      result.width = this.minSize.width;
      result.height = this.minSize.height;
    }

    this.originalSize = {
      width: result.width,
      height: result.height,
    };
  },
  mounted() {
    this.resizeObj.observe(this.view.dom);
  },
  beforeDestroy() {
    this.resizeObj.disconnect();
  },
  methods: {
    onChange() {
      this.updateAttrs({
        done: !this.node.attrs.done,
      });
    },
    getMaxSize() {
      const { width } = getComputedStyle(this.view.dom);
      this.maxSize.width = parseInt(width, 10);
    },
    selectImage() {
      // https://github.com/ueberdosis/tiptap/issues/361
      const { state } = this.view;
      let { tr } = state;

      const selection = NodeSelection.create(state.doc, this.getPos());
      tr = tr.setSelection(selection);

      this.view.dispatch(tr);
    },
  },
};
</script>

<style lang="scss">
.image-focused {
  outline: 2px solid #8cf;
}
</style>
