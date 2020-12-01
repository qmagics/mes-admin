<template>
  <div class="fx-table--superSearchbar">
    <el-drawer
      :title="drawer.title"
      :visible.sync="drawer.visible"
      :direction="drawer.direction"
      :modal="false"
      append-to-body
      :size="drawer.size"
    >
      <slot name="drawer" />
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
        size: "30%",
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
  },
};
</script>

<style>
</style>