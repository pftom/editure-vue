<template>
  <span :class="imageViewClass">
    <div
      :class="{
        'image-view__body--focused': selected,
        'image-view__body--resizing': resizing,
      }"
      class="image-view__body"
    >
      <img
        :src="src"
        :title="node.attrs.title"
        :alt="node.attrs.alt"
        :width="width"
        :height="height"
        class="image-view__body__image"
        @click="selectImage"
      />

      <div
        v-if="view.editable"
        v-show="selected || resizing"
        class="image-resizer"
      >
        <span
          v-for="direction in resizeDirections"
          :key="direction"
          :class="`image-resizer__handler--${direction}`"
          class="image-resizer__handler"
          @mousedown.stop.prevent="onMouseDown($event, direction)"
        />
      </div>

      <el-popover
        :value="selected"
        ref="popover1"
        placement="top"
        width="200"
        trigger="manual"
      >
        <el-row>
          <el-tooltip effect="dark" content="更换图片" placement="top">
            <el-button
              size="mini"
              icon="el-icon-edit-outline"
              @click="clickImageButton"
            ></el-button>
          </el-tooltip>
          <el-tooltip effect="dark" content="删除" placement="top">
            <el-button
              size="mini"
              icon="el-icon-delete"
              @click="removeImage"
            ></el-button>
          </el-tooltip>
        </el-row>
        <div slot="reference" class="image-view__body__placeholder" />
      </el-popover>
    </div>
    <input
      type="file"
      ref="image"
      @change="handleImageUpload"
      class="image-upload"
    />
  </span>
</template>

<script>
import { ResizeObserver } from "@juggle/resize-observer";
import { resolveImg, RESIZE_DIRECTION } from "../utils/image";
import { NodeSelection } from "prosemirror-state";
import { deleteSelection } from "prosemirror-commands";
import { Popover } from "element-ui";
import { clamp } from "../utils/shared";

export default {
  props: ["node", "updateAttrs", "view", "getPos", "selected", "editor"],
  components: {
    [Popover.name]: Popover,
  },
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
      aspectRatio: null,
      resizerState: {
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
    imageViewClass() {
      return ["image-view"];
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
    onMouseDown(e, dir) {
      this.resizerState.x = e.clientX;
      this.resizerState.y = e.clientY;

      const originalWidth = this.originalSize.width;
      const originalHeight = this.originalSize.height;
      this.aspectRatio = originalWidth / originalHeight;

      let { width, height } = this.node.attrs;
      const maxWidth = this.maxSize.width;

      if (width && !height) {
        width = width > maxWidth ? maxWidth : width;
        height = Math.round(width / this.aspectRatio);
      } else if (height && !width) {
        width = Math.round(height * this.aspectRatio);
        width = width > maxWidth ? maxWidth : width;
      } else if (!width && !height) {
        width = originalWidth > maxWidth ? maxWidth : originalWidth;
        height = Math.round(width / this.aspectRatio);
      } else {
        width = width > maxWidth ? maxWidth : width;
      }

      this.resizerState.w = width;
      this.resizerState.h = height;
      this.resizerState.dir = dir;

      this.resizing = true;

      this.onEvents();
    },
    onMouseMove(e) {
      e.preventDefault();
      e.stopPropagation();
      if (!this.resizing) return;

      console.log("hello");

      const { x, w, dir } = this.resizerState;

      const dx = (e.clientX - x) * (/l/.test(dir) ? -1 : 1);

      const width = clamp(w + dx, this.minSize.width, this.maxSize.width);
      const height = Math.max(
        Math.round(width / this.aspectRatio),
        this.minSize.width
      );

      this.updateAttrs({
        width,
        height,
      });
    },
    onMouseUp(e) {
      e.preventDefault();
      e.stopPropagation();
      if (!this.resizing) return;

      this.resizing = false;

      this.resizerState = {
        x: 0,
        y: 0,
        w: 0,
        h: 0,
        dir: "",
      };

      this.offEvents();
      this.selectImage();
    },

    onEvents() {
      document.addEventListener("mousemove", this.onMouseMove, true);
      document.addEventListener("mouseup", this.onMouseUp, true);
    },
    offEvents() {
      document.removeEventListener("mousemove", this.onMouseMove, true);
      document.removeEventListener("mouseup", this.onMouseUp, true);
    },
    removeImage() {
      const { state, dispatch } = this.view;

      deleteSelection(state, dispatch);
      this.view.focus();
    },
    clickImageButton(e) {
      e.preventDefault();

      this.$refs.image.click();
    },
    handleImageUpload(e) {
      const { state, dispatch } = this.view;

      deleteSelection(state, dispatch);

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
};
</script>

<style lang="scss">
.image-focused {
  outline: 2px solid #8cf;
}
</style>
