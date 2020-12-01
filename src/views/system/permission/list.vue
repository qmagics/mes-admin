<template>
  <page :bg="false">
    <split-panel split="vertical" :default-percent="12">
      <template #paneL>
        <fixed-panel scrollable>
          <div slot="header">
            <el-row>
              <el-col :span="12">权限分类</el-col>
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
                  v-permission="'system:permissionCategory:list'"
                  @click="$open('System_PermissionCategory_List')"
                ></el-button>
              </el-col>
            </el-row>
          </div>
          <div style="padding: 10px">
            <TreeMenu
              ref="treeMenu"
              :data="menu.data"
              nodeKey="ActionPermissonId"
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
                v-permission="'system:permission:add'"
                type="primary"
                @click="create"
                >新增</el-button
              >
              <el-button
                v-permission="'system:permission:edit'"
                type="primary"
                @click="edit"
                >编辑</el-button
              >
              <el-button
                v-permission="'system:permission:delete'"
                type="primary"
                @click="del"
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
import TreeMenu from "@/components/TreeMenu";
import {
  getPermissionList,
  getPermissionCategoryTree,
  deletePermission,
} from "@/api/system/permission";
import { getTreeByArr } from "@/utils/structure";
import { mapGetters } from "vuex";

export default {
  name: "System_Permission_List",
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
          label: "Name",
          children: "children",
        },
      },
      table: {
        data: [],
        columns: [
          {
            label: "权限名称",
            prop: "Name",

            // 0 不使用任何格式化处理配置，则默认显示row.prop属性对应的值

            // 1 使用formatter函数 只能输出纯文本，相比render函数性能开销更低
            // formatter(value, row) {
            //   return `${value}-${row.Action}`;
            // },

            // 1 使用内置渲染器, 不带参数
            // render: "link",

            // 2 使用内置渲染器, Array形式 传参
            render: [
              "link",
              {
                routeName: "System_Permission_View",
                idField: "ActionPermissonId",
                textField: "Name",
              },
            ],

            // 3 使用内置渲染器, Object形式 传参
            // render: {
            //     name: "link",
            //     args: {
            //         name: "System_Permission_View",
            //         params: "ActionPermissonId"
            //     }
            // }

            // 4 使用自定义渲染函数 context:{ value, row, column }
            // render(h, context) {
            //   return (
            //     <a
            //       target="_blank"
            //       href={`https://www.baidu.com/s?wd=${context.row.ActionPermissonId}`}
            //     >
            //       {context.value}
            //     </a>
            //   );
            // },
          },
          {
            label: "接口地址",
            prop: "Url",
          },
          {
            label: "控制器",
            prop: "Controller",
          },
          {
            label: "Action",
            prop: "Action",
          },
          {
            label: "排序码",
            prop: "SortCode",
          },
          {
            label: "创建时间",
            prop: "CreateTime",
            render: ["time"],
            renderArgs: "yyyy",
          },
        ],
        query: {
          ParentId: "",
        },
        options: {
          request: (params) => getPermissionList(params),
        },
      },
    };
  },

  methods: {
    refresh() {
      this.$refs.table.refresh();
    },

    async getMenuData() {
      this.menu.loading = true;

      try {
        const { data } = await getPermissionCategoryTree();

        const treeData = getTreeByArr(
          data.rows,
          null,
          "ActionPermissonId",
          "ParentId"
        );

        this.menu.data = treeData;
      } finally {
        this.menu.loading = false;
      }
    },

    create() {
      this.$open({ name: "System_Permission_Add" });
    },

    edit() {
      const rows = this.$refs.table.getSelected();

      if (rows.length > 0) {
        this.$open({
          name: "System_Permission_Edit",
          params: { id: rows[0].ActionPermissonId },
        });
      }
    },

    del() {
      const rows = this.$refs.table.getSelected();

      if (rows.length > 0) {
        this.$confirm(`是否确认删除？`).then(() => {
          deletePermission(rows[0].ActionPermissonId).then(() => {
            this.refresh();
          });
        });
      }
    },

    currentMenuChange(data) {
      this.table.query.ParentId = data.ActionPermissonId;
      this.refresh();
    },

    clearCurrentMenu() {
      this.$refs.treeMenu.setCurrentKey(null);
      this.table.query.ParentId = "";
      this.refresh();
    },

    // test() {
    //   this.$modal({
    //     title: "测试弹窗",
    //     // width:'600px',
    //     // height:'100%',
    //     component: () => import("@/views/system/permission/view"),
    //     btns: [
    //       {
    //         name: "按钮1",
    //         type: "primary",
    //         icon: "el-icon-check",
    //         // method: "btn1Handler",
    //       },
    //       {
    //         name: "按钮2",
    //         method: "btn2Handler",
    //       },
    //     ],
    //     actions: {
    //       confirm() {
    //         alert("confirm is emited");
    //       },
    //       cancel() {
    //         alert("cancel is emited");
    //       },
    //     },
    //   });
    // },
  },

  created() {
    this.getMenuData();
  },
};
</script>