<template>
  <page :bg="false">
    <yw-table v-bind="table" ref="table" :query.sync="table.query">
      <template #actions>
        <el-button
          v-permission="'system:permissionCategory:add'"
          type="primary"
          @click="create"
          icon="el-icon-plus"
          >新增</el-button
        >
        <el-button
          v-permission="'system:permissionCategory:edit'"
          type="primary"
          @click="edit"
          icon="el-icon-edit"
          >编辑</el-button
        >
        <el-button
          v-permission="'system:permissionCategory:delete'"
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
import { getTreeList, del } from "@/api/system/permissionCategory";
import { getTreeByArr } from "@/utils/structure";
import { PERMISSION_TYPE } from "@/views/system/vars";

export default {
  name: "System_PermissionCategory_List",
  data() {
    const _this = this;
    return {
      //表格元数据
      meta_data: [],

      //表格默认展开级别
      expendLevels: [0],

      table: {
        data: [],
        columns: [
          {
            label: "权限分类名称",
            prop: "Name",
            width: 300,
            render: [
              "link",
              {
                routeName: "System_PermissionCategory_View",
                idField: "ActionPermissonId",
              },
            ],
          },
          {
            label: "分类类型",
            prop: "Category",
            width: 200,
            formatter: (value) => PERMISSION_TYPE[value],
          },
          {
            label: "描述",
            prop: "Description",
          },
          {
            label: "排序码",
            prop: "SortCode",
            width: 100,
          },
        ],
        query: {},
        options: {
          pagination: false,
          tree: true,
          showIndex: false,
          rowKey: "ActionPermissonId",
          expandRowKeys: [],
          pageSize: 99999,
          request: (params) => getTreeList(params),
          resHandler(data) {
            //元数据
            _this.meta_data = data;

            //默认展开第一级
            _this.expendLevel(_this.expendLevels);

            //处理数据
            const treeData = getTreeByArr(
              data.rows,
              null,
              "ActionPermissonId",
              "ParentId"
            );
            return treeData;
          },
        },
      },
    };
  },

  methods: {
    create() {
      this.$open({ name: "System_PermissionCategory_Add" });
    },

    edit() {
      const rows = this.$refs.table.getSelected();

      if (rows.length > 0) {
        this.$open({
          name: "System_PermissionCategory_Edit",
          params: { id: rows[0].ActionPermissonId },
        });
      }
    },

    del() {
      const rows = this.$refs.table.getSelected();
      if (rows.length > 0) {
        this.$confirm(`是否确认删除？`).then(() => {
          del(rows[0].ActionPermissonId).then(() => {
            this.$refs.table.refresh();
          });
        });
      }
    },

    //展开表格行
    expendLevel(level) {
      const expendKeys = [];
      this.meta_data.rows.forEach((i) => {
        if (level.indexOf(i.Level) >= 0) {
          expendKeys.push(i.ActionPermissonId);
        }
      });
      this.table.options.expandRowKeys = expendKeys;
    },
  },
};
</script>