<template>
  <page>
    <split-panel split="vertical" :default-percent="10">
      <template #paneL>
        <TreeMenu
          :data="menu.data"
          v-loading="menu.loading"
          :treeProps="menu.options"
        ></TreeMenu>
      </template>
      <template #paneR>
        <yw-table v-bind="table" ref="table">
          <template #actions>
            <el-button
              v-permission="'system:permission:add'"
              type="primary"
              icon="el-icon-plus"
              @click="create"
              >新增</el-button
            >
            <el-button
              v-permission="'system:permission:edit'"
              type="primary"
              icon="el-icon-edit"
              @click="edit()"
              >编辑</el-button
            >
            <el-button type="primary" @click="test">测试</el-button>
          </template>
        </yw-table>
      </template>
    </split-panel>
  </page>
</template>

<script>
import TreeMenu from "@/components/TreeMenu";

export default {
  name: "Demo_OverallExample",
  components: {
    TreeMenu,
  },
  data() {
    const _this = this;
    return {
      menu: {
        data: [],
        loading: false,
        options: {
          label: "label",
          children: "children",
        },
      },
      table: {
        data: [
          { id: "aaa", name: "AAA" },
          { id: "bbb", name: "BBB" },
          { id: "ccc", name: "CCC" },
        ],
        columns: [
          {
            label: "NAME",
            prop: "name",
          },
          {
            label: "操作",
            prop: "id",
            width: 100,
            render(h, { value, row, column }) {
              return _this.$hasPermission("system:permission:edit") ? (
                <el-button
                  size="mini"
                  icon="el-icon-edit"
                  onClick={() => {
                    _this.edit([row]);
                  }}
                ></el-button>
              ) : (
                ""
              );
            },
          },
        ],
        query: {
          key: "",
        },
        options: {
          api:'/dev-api/api/overall-example/list',
          selectable: true,
        },
      },
    };
  },

  methods: {
    getMenuData() {
      this.menu.loading = true;

      setTimeout(() => {
        this.menu.data = [
          {
            label: "基础设置",
            value: "1",
            children: [
              {
                label: "地区管理",
                value: "1-1",
              },
              {
                label: "单页设置",
                value: "1-2",
              },
              {
                label: "平台用户管理",
                value: "1-3",
              },
            ],
          },
          {
            label: "人员数据",
            value: "2",
            children: [
              {
                label: "管理人员统计",
                value: "2-1",
                children: [
                  {
                    label: "同比分析",
                    value: "2-1-1",
                  },
                  {
                    label: "环比分析",
                    value: "2-1-2",
                  },
                  {
                    label: "综合统计",
                    value: "2-1-3",
                  },
                ],
              },
              {
                label: "接船率",
                value: "2-2",
              },
              {
                label: "出勤率",
                value: "2-3",
              },
            ],
          },
          {
            label: "荣誉墙",
            value: "3",
          },
          {
            label: "新闻公告",
            value: "4",
          },
          {
            label: "分享链接",
            value: "5",
          },
        ];
        this.menu.loading = false;
      }, 999);
    },

    create() {
      this.$open({ name: "Demo_OverallExample_Add" });
    },

    edit(_rows) {
      let rows = _rows || this.$refs.table.getSelected();

      console.log(rows);

      if (!rows || !rows.length) {
        return this.$message("请先选择一行数据");
      }

      //单条编辑
      if (rows.length === 1) {
        this.$open({
          name: "Demo_OverallExample_Edit",
          params: { id: rows[0].id },
        });
      }
      //批量编辑
      else {
        this.$open({
          name: "Demo_OverallExample_BatchEdit",
          params: { ids: rows.map((i) => i.id) },
        });
      }
    },

    test() {
      this.$modal({
        title: "测试弹窗",
        // width:'600px',
        // height:'100%',
        component: () => import("@/views/system/permission/view"),
        btns: [
          {
            name: "按钮1",
            type: "primary",
            icon: "el-icon-check",
            // method: "btn1Handler",
          },
          {
            name: "按钮2",
            method: "btn2Handler",
          },
        ],
        actions: {
          confirm() {
            alert("confirm is emited");
          },
          cancel() {
            alert("cancel is emited");
          },
        },
      });
    },

    refresh() {

    },
  },

  //路由再次激活
  // activated() {
  //   console.log("activated");
  // },

  // updated() {
  //   console.log("updated");
  // },

  // deactivated() {
  //   console.log("deactivated");
  // },

  // created() {
  //   console.log("created");
  //   this.getMenuData();
  // },

  // mounted() {
  //   console.log("mounted");
  // },
};
</script>

<style>
</style>