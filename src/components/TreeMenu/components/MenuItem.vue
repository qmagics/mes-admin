<template>
  <div v-if="!item.hidden">
    <el-menu-item
      v-if="!item[childrenField] || !item[childrenField].length"
      :index="item[valueField]"
    >
      <item :icon="item[iconField]" :title="item[labelField]" />
    </el-menu-item>

    <el-submenu v-else :index="item[valueField]" popper-append-to-body>
      <template slot="title">
        <item
          v-if="item[labelField]"
          :icon="item[iconField]"
          :title="item[labelField]"
        />
      </template>
      <MenuItem
        v-for="child in item[childrenField]"
        :key="child.path"
        :item="child"
      />
    </el-submenu>
  </div>
</template>

<script>
import Item from "./Item";

export default {
  name: "MenuItem",

  components: {
    Item,
  },

  inject: ["options"],

  props: {
    item: {
      type: Object,
      required: true,
    },
  },

  computed: {
    labelField() {
      return this.options.label;
    },
    valueField() {
      return this.options.value;
    },
    childrenField() {
      return this.options.children;
    },
    iconField() {
      return this.options.icon;
    },
  },
};
</script>

<style>
</style>