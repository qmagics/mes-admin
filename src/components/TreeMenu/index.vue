<template>
  <div class="tree-menu" :class="classes">
    <el-tree
      ref="tree"
      :data="data"
      :lazy="lazy"
      :load="load"
      :nodeKey="nodeKey"
      :expand-on-click-node="expandOnClickNode"
      :showCheckbox="showCheckbox"
      :highlight-current="highlightCurrent"
      :props="cTreeProps"
      :default-expanded-keys="defaultExpandedKeys"
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

// function

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
    expandOnClickNode: Boolean,
    showCheckbox: Boolean,
    arrowRight: Boolean,
    highlightCurrent: {
      type: Boolean,
      default: true,
    },
    //默认展开的节点级别，需要数据源提供Level属性
    defaultExpendLevels: {
      type: Array,
      default() {
        return [0];
      },
    },
  },

  data() {
    return {
      defaultExpandedKeys: [],
    };
  },

  watch: {
    data: {
      deep: true,
      handler(val) {
        this.defaultExpandedKeys = this.getExpendedKeys(val);
      },
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
    getExpendedKeys(treeData) {
      let keys = [];
      const childrenField = this.treeProps.children;

      treeData.forEach((i) => {
        if (this.defaultExpendLevels.indexOf(i.Level) >= 0) {
          keys.push(i[this.nodeKey]);
        }

        const children = i[childrenField];

        if (children && children.length) {
          keys = [...keys, ...this.getExpendedKeys(children)];
        }
      });

      return keys;
    },

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