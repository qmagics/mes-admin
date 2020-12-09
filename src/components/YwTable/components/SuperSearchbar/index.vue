<template>
  <div class="superSearchbar">
    <el-drawer
      class="superSearchbar__drawer"
      :title="drawer.title"
      :visible.sync="drawer.visible"
      :direction="drawer.direction"
      :modal="true"
      append-to-body
      :size="drawer.size"
    >
      <div class="superSearchbar__body">
        <el-scrollbar
          style="height: 100%"
          wrap-class="superSearchbar-scrollbar-wrap"
        >
          <div class="superSearchbar__body__inner">
            <slot />
          </div>
        </el-scrollbar>
      </div>
      <div class="superSearchbar__footer">
        <el-button icon="el-icon-search" type="primary" @click="onSearchConfirm"
          >查询</el-button
        >
      </div>
    </el-drawer>
  </div>
</template>

<script>
import { isBoolean } from "../../utils";
export default {
  inject: ["$fxTable"],

  data() {
    return {
      drawer: {
        title: "更多查询条件",
        visible: false,
        direction: "ltr",
        size: "400px",
      },
    };
  },

  methods: {
    toggle(visible) {
      if (!isBoolean(visible)) {
        this.drawer.visible = !this.drawer.visible;
      } else {
        this.drawer.visible = visible;
      }
    },

    open() {
      this.drawer.visible = true;
    },

    close() {
      this.drawer.visible = false;
    },

    onSearchConfirm() {
      this.close();
      this.$fxTable.refresh();
    },
  },
};
</script>

<style lang="scss">
@import "@/styles/variables";
@import "@/styles/mixin";

.superSearchbar {
}

.superSearchbar__drawer {
  .el-drawer__header {
    background-image: linear-gradient(
      to bottom,
      $colorPrimary,
      $colorPrimaryActive
    );
    color: #fff;
    margin-bottom: 0;
    padding: 0 15px;
    height: 40px;
    line-height: 40px;
    outline: none !important;
    position: relative;
    @include skewBg($bgColorPrimary, 60%);
    font-weight: bold;
    font-size: 17px;
    letter-spacing: 1px;

    * {
      outline: none !important;
    }

    .el-drawer__close-btn {
      z-index: 2;
    }
  }
  .el-drawer__body {
    background: $bgColorLighter;
    // padding-bottom: 50px;
  }
}

.superSearchbar__body {
  width: 100%;
  position: absolute;
  bottom: 50px;
  top: 40px;
  left: 0;
  // overflow: auto;

  .superSearchbar__body__inner {
    padding: 15px 30px;
  }
}

.superSearchbar-scrollbar-wrap {
  overflow-x: hidden;
}

.superSearchbar__footer {
  height: 50px;
  width: 100%;
  background: #fff;
  border-top: 1px solid #ddd;
  position: absolute;
  bottom: 0;
  left: 0;
  padding: 0 20px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
}
</style>