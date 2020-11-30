<template>
  <div class="tree-menu" :class="classes">
    <el-tree
      ref="tree"
      :data="data"
      :lazy="lazy"
      :load="load"
      :nodeKey="nodeKey"
      :showCheckbox="showCheckbox"
      :highlight-current="highlightCurrent"
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
    nodeKey: {},
    lazy: Boolean,
    load: Function,
    showCheckbox: Boolean,
    arrowRight: Boolean,
    highlightCurrent: {
      type: Boolean,
      default: true,
    },
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
      this.$emit("check-change", data, checked, indeterminate);
    },

    clear() {
      this.$refs.tree.setCurrentKey(null);
    },

    setCurrentKey(key) {
      this.$refs.tree.setCurrentKey(key);
    },

    setCurrentNode(node) {
      this.$refs.tree.setCurrentNode(node);
    },
  },
};
</script>

<style lang="scss">
@import "~@/styles/variables.scss";

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
  .el-tree {
    &.el-tree--highlight-current {
      .el-tree-node {
        .el-tree-node__content {
          height: 32px;
        }
        &.is-current > .el-tree-node__content {
          background-image: linear-gradient(
            to bottom,
            $colorSecondary,
            $colorSecondaryActive
          );
          color: #fff;
          font-weight: 700;

          .el-tree-node__expand-icon {
            color: #fff;
            &.is-leaf {
              color: transparent;
            }
          }
        }
      }
    }
  }
}
</style>