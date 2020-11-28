<template>
  <div class="tree-menu" :class="classes">
    <el-tree
      :data="data"
      :lazy="lazy"
      :load="load"
      :showCheckbox="showCheckbox"
      :props="cTreeProps"
      @node-click="handleNodeClick"
      @check-change="handleCheckChange"
    ></el-tree>
  </div>
</template>

<script>
const defaultProps = {
  children: "children",
  label: "label",
};

export default {
  name: "TreeMenu",

  props: {
    data: {
      type: Array,
      required: true,
    },
    treeProps: {
      type: Object,
      default() {
        return defaultProps;
      },
    },
    lazy: Boolean,
    load: Function,
    showCheckbox: Boolean,
    arrowRight: Boolean,
  },

  computed: {
    cTreeProps() {
      return Object.assign({}, defaultProps, this.treeProps);
    },
    classes() {
      if (this.arrowRight) {
        return "is--arrow-right";
      }
    },
  },

  methods: {
    handleNodeClick(data) {
      this.$emit("node-click", data);
    },
    handleCheckChange(data, checked, indeterminate) {
      this.$emit("node-click", data, checked, indeterminate);
    },
  },
};
</script>

<style lang="scss">
.tree-menu {
  &.is--arrow-right {
    //箭头移到右边
    .el-tree-node__expand-icon {
      position: absolute;
      right: 2%;
      transform: rotate(180deg);
      &.expanded {
        transform: rotate(90deg);
      }
    }
    .el-tree-node__label {
      padding-left: 15px;
    }
  }
}
</style>