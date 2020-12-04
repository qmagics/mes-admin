<template>
  <page :bg="false">
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
  </page>
</template>

<script>
import { getCustomerCategoryTree, deleteCustomer } from "@/api/biz/customer";
import { getTreeByArr } from "@/utils/structure";
import getColumns from "./columns";

export default {
  name: "Biz_CustomerCategory_List",

  data() {
    const _this = this;

    this.rowKey = "CustomerId";

    return {
      //表格元数据
      meta_data: [],

      //表格默认展开级别
      expendLevels: [0],

      //表格配置项
      table: {
        data: [],
        columns: getColumns(_this),
        query: {},
        options: {
          pagination: false,
          tree: true,
          showIndex: false,
          rowKey: _this.rowKey,
          expandRowKeys: [],
          pageSize: 99999,
          request: (params) => getCustomerCategoryTree(params),
          resHandler(data) {
            //元数据
            _this.meta_data = data;

            //默认展开第一级
            _this.expendLevel(_this.expendLevels);

            //处理数据
            const treeData = getTreeByArr(
              data.rows,
              null,
              _this.rowKey,
              "ParentId"
            );
            return treeData;
          },
        },
      },
    };
  },

  methods: {
    refresh() {
      this.$refs.table.refresh();
    },

    //新建
    create() {
      this.$open({ name: "Biz_CustomerCategory_Add" });
    },

    //编辑
    edit() {
      const rows = this.$refs.table.getSelected();

      if (rows.length > 0) {
        this.$open({
          name: "Biz_CustomerCategory_Edit",
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

    //展开表格行
    expendLevel(level) {
      const expendKeys = [];
      this.meta_data.rows.forEach((i) => {
        if (level.indexOf(i.Level) >= 0) {
          expendKeys.push(i[this.rowKey]);
        }
      });
      this.table.options.expandRowKeys = expendKeys;
    },
  },
};
</script>