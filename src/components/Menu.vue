<template>
  <div class="menu">
    <template v-for="(item, index) in items">
      <toolbar-separator
        v-if="item.name === 'separator' && item.visible !== false"
        :key="index"
      ></toolbar-separator>
      <toolbar-button
        v-else-if="item.visible !== false"
        :key="index"
        @click="handleClick"
        :active="item.active ? item.active(view.state) : false"
      >
        <tooltip :tooltip="item.tooltip" :placement="top">
          <span>{{ item.iconText }}</span>
        </tooltip>
      </toolbar-button>
    </template>
  </div>
</template>

<script>
import ToolbarButton from "@/components/ToolbarButton";
import ToolbarSeparator from "@/components/ToolbarSeparator";
import Tooltip from "@/components/Tooltip";

export default {
  components: { ToolbarButton, ToolbarSeparator, Tooltip },
  props: ["view", "items"],
};
</script>

<style lang="scss" scoped>
.menu {
  display: flex;
}
</style>
