<template>
  <page :bg="false">
    <split-panel split="vertical" :default-percent="12">
      <template #paneL>
        <fixed-panel scrollable>
          <div slot="header">
            <el-row>
              <el-col :span="12">客户档案分类</el-col>
              <el-col :span="12" style="text-align: right">
                <el-button
                  class="fixed-panel__header-btn"
                  @click="clearCurrentMenu"
                >
                  清空
                </el-button>
                <el-button
                  class="fixed-panel__header-btn"
                  icon="el-icon-s-tools"
                  v-permission="'biz:customerCategory:list'"
                  @click="$open('Biz_CustomerCategory_List')"
                ></el-button>
              </el-col>
            </el-row>
          </div>
          <div style="padding: 10px">
            <TreeMenu
              ref="treeMenu"
              :data="menu.data"
              :nodeKey="rowKey"
              v-loading="menu.loading"
              :treeProps="menu.options"
              @node-click="currentMenuChange"
            ></TreeMenu>
          </div>
        </fixed-panel>
      </template>
      <template #paneR>
        <fixed-panel>
          <yw-table v-bind="table" ref="table" :query.sync="table.query">
            <template #actions>
              <el-button
                v-permission="'biz:customer:add'"
                type="primary"
                @click="create"
                icon="el-icon-plus"
                >新增</el-button
              >
              <el-button
                v-permission="'biz:customer:edit'"
                type="primary"
                @click="edit"
                icon="el-icon-edit"
                >编辑</el-button
              >
              <el-button
                v-permission="'biz:customer:delete'"
                type="primary"
                @click="del"
                icon="el-icon-delete"
                >删除</el-button
              >
            </template>
          </yw-table>
        </fixed-panel>
      </template>
    </split-panel>
  </page>
</template>

<script>
import { mapGetters } from "vuex";
import { getTreeByArr } from "@/utils/structure";
import TreeMenu from "@/components/TreeMenu";
import {
  getCustomerList,
  getCustomerCategoryTree,
  deleteCustomer,
} from "@/api/biz/customer";

import getColumns from "./columns";

export default {
  //视图组件名称,需要跟route.name中保持一致
  name: "Biz_Customer_List",

  //局部组件
  components: {
    TreeMenu,
  },

  //vueData
  data() {
    const _this = this;

    //主键名称
    this.rowKey = "CustomerId";

    return {
      //左侧菜单配置项
      menu: {
        //菜单数据源
        data: [],

        //菜单加载状态标识符
        loading: false,

        //其它配置项
        options: {
          //作为树节点文本显示的字段
          label: "FullName",

          //作为树节点子项显示的字段
          children: "children",
        },
      },

      //表格配置项
      table: {
        //表格数据绑定对象
        data: [],

        //表格列
        columns: getColumns(_this),

        //表格查询参数
        query: {
          //父级Id
          ParentId: "",
        },

        //表格其它选项
        options: {
          //行主键
          rowKey: _this.rowKey,

          //请求数据方法
          request: (params) => getCustomerList(params),
        },
      },
    };
  },

  //vueMethods
  methods: {
    /**
     * 页面刷新方法
     * 路由跳转时会根据route.params中的标识决定是否执行此方法
     */
    refresh() {
      this.$refs.table.refresh();
    },

    //获取左侧菜单数据源
    async getMenuData() {
      this.menu.loading = true;

      try {
        const { data } = await getCustomerCategoryTree();

        const treeData = getTreeByArr(data.rows, null, this.rowKey, "ParentId");

        this.menu.data = treeData || [];
      } finally {
        this.menu.loading = false;
      }
    },

    //新建
    create() {
      this.$open({ name: "Biz_Customer_Add" });
    },

    //编辑
    edit() {
      const rows = this.$refs.table.getSelected();

      if (rows.length > 0) {
        this.$open({
          name: "Biz_Customer_Edit",
          params: { id: rows[0][this.rowKey] },
        });
      }
    },

    //删除
    del() {
      const rows = this.$refs.table.getSelected();

      if (rows.length > 0) {
        this.$confirm(`是否确认删除？`).then(async () => {
          const Id = rows[0][this.rowKey];
          await deleteCustomer(Id);

          this.refresh();
        });
      }
    },

    //菜单选中值变更事件
    currentMenuChange(data) {
      this.table.query.ParentId = data[this.rowKey];
      this.refresh();
    },

    //清除菜单选中项
    clearCurrentMenu() {
      this.$refs.treeMenu.setCurrentKey(null);
      this.table.query.ParentId = "";
      this.refresh();
    },
  },

  //created钩子
  created() {
    this.getMenuData();
  },
};
</script>

<style lang="scss" scoped>
</style>