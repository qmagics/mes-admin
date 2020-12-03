<template>
  <page :bg="false">
    <yw-table v-bind="table" ref="table" :query.sync="table.query">
      <template #actions>
        <el-button
          v-permission="'system:menu:add'"
          type="primary"
          @click="create"
          icon="el-icon-plus"
          >新增</el-button
        >
        <el-button
          v-permission="'system:menu:edit'"
          type="primary"
          @click="edit"
          icon="el-icon-edit"
          >编辑</el-button
        >
        <el-button
          v-permission="'system:menu:delete'"
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
import { getMenuTree, delMenu } from "@/api/system/menu";
import { getTreeByArr } from "@/utils/structure";
import { PERMISSION_TYPE } from "@/views/system/vars";

export default {
  name: "System_Menu_List",

  data() {
    const _this = this;

    this.rowKey = "MenuId";

    return {
      //表格元数据
      meta_data: [],

      //表格默认展开级别
      expendLevels: [0],

      //表格配置项
      table: {
        data: [],
        columns: [
          {
            label: "菜单名称",
            prop: "Name",
            width: 300,
            render: [
              "link",
              {
                routeName: "System_Menu_View",
                idField: _this.rowKey,
              },
            ],
          },
          {
            label: "菜单链接",
            prop: "Url",
            width: 200,
          },
          {
            label: "排序码",
            prop: "SortCode",
            width: 100,
          },
          {
            label: "是否有效",
            prop: "EnabledMark",
            width: 100,
          },
          {
            label: "描述",
            prop: "Description",
          },
        ],
        query: {},
        options: {
          pagination: false,
          tree: true,
          showIndex: false,
          rowKey: _this.rowKey,
          expandRowKeys: [],
          pageSize: 99999,
          request: (params) => getMenuTree(params),
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
      this.$open({ name: "System_Menu_Add" });
    },

    //编辑
    edit() {
      const rows = this.$refs.table.getSelected();

      if (rows.length > 0) {
        this.$open({
          name: "System_Menu_Edit",
          params: { id: rows[0][this.rowKey] },
        });
      }
    },

    //删除
    del() {
      const rows = this.$refs.table.getSelected();
      if (rows.length > 0) {
        this.$confirm(`是否确认删除？`).then(() => {
          delMenu(rows[0][this.rowKey]).then(() => {
            this.refresh();
          });

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