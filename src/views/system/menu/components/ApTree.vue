<template>
  <div class="ap-tree">
    <el-tabs type="border-card">
      <el-tab-pane
        v-for="lv1 in treeData"
        :key="lv1.ActionPermissonId"
        :label="lv1.ActionPermissonName"
      >
        <el-tabs tab-position="left">
          <el-tab-pane
            v-for="lv2 in lv1.MATree"
            :key="lv2.ActionPermissonId"
            :label="lv2.ActionPermissonName"
          >
            <div class="ap-tree__card-container">
              <el-scrollbar
                class="ap-tree__scrollbar"
                wrap-class="ap-tree__scrollbar-wrap"
              >
                <el-card
                  shadow="hover"
                  class="ap-tree__card"
                  v-for="(lv3, lv3_index) in lv2.MATree"
                  :key="lv3.ActionPermissonId"
                  :label="lv3.ActionPermissonName"
                >
                  <div slot="header">
                    <el-checkbox
                      @change="level3Change(lv3, lv3_index)"
                      v-model="lv3.IsSelect"
                    >
                      <b>{{ lv3.ActionPermissonName }}</b>
                    </el-checkbox>
                  </div>
                  <el-checkbox
                    v-for="(lv4, lv4_index) in lv3.MATree"
                    :key="lv4.ActionPermissonId"
                    :label="lv4.ActionPermissonName"
                    v-model="lv4.IsSelect"
                    @change="level4Change(lv4, lv4_index, lv3)"
                  >
                    {{ lv4.ActionPermissonName }}
                  </el-checkbox>
                </el-card>
              </el-scrollbar>
            </div>
          </el-tab-pane>
        </el-tabs>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
export default {
  name: "ApTree",

  props: {
    value: {},
  },

  data() {
    return {
      treeData: this.value,
    };
  },

  watch: {
    value: {
      deep: true,
      handler(val) {
        this.treeData = val;
      },
    },
    treeData: {
      deep: true,
      handler(val) {
        this.$emit("input", val);
      },
    },
  },

  methods: {
    //第三级checkbox变更
    level3Change(item, index) {
      const bl = item.IsSelect;
      let siblings = item.MATree || [];
      for (let i = 0; i < siblings.length; i++) {
        siblings[i].IsSelect = bl;
      }
    },

    //第四级checkbox变更
    level4Change(item, index, parentNode) {
      if (item.IsSelect) {
        if (!parentNode.IsSelect) {
          parentNode.IsSelect = true;
        }
      } else {
        let siblings = parentNode.MATree || [];
        for (let i = 0; i < siblings.length; i++) {
          let _item = siblings[i];
          if (_item.IsSelect == true) {
            return;
          }
        }
        parentNode.IsSelect = false;
      }
    },
  },
};
</script>

<style lang="scss">
.ap-tree {
  .ap-tree__card {
    margin-bottom: 20px;

    .el-card__header {
      padding: 5px 20px;
      background: #f5f7fa;
    }

    .el-card__body {
      padding: 15px 20px;
    }
  }

  .ap-tree__card-container {
    height: 500px;
  }

  .ap-tree__scrollbar {
    height: 100%;
  }
  .ap-tree__scrollbar-wrap {
    overflow-x: hidden;
  }
}
</style>