<template>
  <div class="fixed-panel" :style="style">
    <div
      class="fixed-panel__header"
      :class="headerClass"
      :style="headerStyle"
      v-if="$slots.header"
    >
      <slot name="header"></slot>
    </div>
    <div class="fixed-panel__body" :class="bodyClass" :style="bodyStyle">
      <el-scrollbar
        class="fixed-panel__scrollbar"
        v-if="scrollable"
        wrap-class="fixed-panel__scrollbar-wrapper"
      >
        <slot></slot>
      </el-scrollbar>
      <slot v-else></slot>
    </div>
  </div>
</template>

<script>
import { radius } from "@/styles/variables.scss";

export default {
  name: "FixedPanel",

  props: {
    radius: {
      type: String,
      default: radius,
    },
    headerHeight: {
      type: String,
      default: "34px",
    },
    headerClass: {},
    bodyClass: {},
    scrollable: {
      type: Boolean,
      default: false,
    },
  },

  computed: {
    style() {
      return {
        borderRadius: this.radius,
      };
    },
    headerStyle() {
      return {
        height: this.headerHeight,
        lineHeight: this.headerHeight,
      };
    },
    bodyStyle() {
      if (this.$slots.header) {
        return {
          height: `calc(100% - ${this.headerHeight})`,
        };
      }
    },
  },
};
</script>

<style lang="scss">
.fixed-panel {
  height: 100%;
  width: 100%;
  overflow: hidden;
  background: #fff;
  position: relative;

  .fixed-panel__header {
    border-bottom: 1px solid rgb(226, 234, 237);
    font-size: 14px;
    padding: 0 10px;
  }

  .fixed-panel__body {
    height: 100%;
    .fixed-panel__scrollbar {
      height: 100%;
    }

    .fixed-panel__scrollbar-wrapper {
      overflow-x: hidden;
    }
  }
}
</style>