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
                  size="mini"
                  style="
                    border: none;
                    padding-left: 8px;
                    padding-right: 8px;
                    margin: 0;
                    font-size: 14px;
                  "
                  icon="el-icon-s-tools"
                ></el-button>
              </el-col>
            </el-row>
          </div>
          <div style="padding: 10px">
            <TreeMenu
              :data="menu.data"
              v-loading="menu.loading"
              :treeProps="menu.options"
            ></TreeMenu>
          </div>
        </fixed-panel>
      </template>
      <template #paneR>
        <fixed-panel>
          <div slot="header">
            <el-row>
              <el-col :span="12">权限分类</el-col>
              <el-col :span="12" style="text-align: right">
                <el-button
                  size="mini"
                  style="
                    border: none;
                    padding-left: 8px;
                    padding-right: 8px;
                    margin: 0;
                    font-size: 14px;
                  "
                  icon="el-icon-s-tools"
                ></el-button>
              </el-col>
            </el-row>
          </div>
          <yw-table v-bind="table" ref="table" :columns="columns">
            <template #actions>
              <el-button
                v-permission="'system:permission:add'"
                type="primary"
                icon="el-icon-plus"
                @click="create"
                >新增</el-button
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
  getPermissionCategory,
} from "@/api/system/permission";
import { getTreeByArr } from "@/utils/structure";
import { mapGetters } from "vuex";

export default {
  name: "System_Permission_List",
  components: {
    TreeMenu,
  },
  computed: {
    $pageConfig() {
      return this.$store.getters.getConfigByName(this.$options.name);
    },
    columns() {
      return this.$pageConfig.columns;
    },
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
        columns: [],
        query: {},
        options: {
          selectable: true,
          request: (params) => getPermissionList(params),
        },
      },
    };
  },

  methods: {
    async getMenuData() {
      this.menu.loading = true;

      try {
        const { data } = await getPermissionCategory();

        const treeData = getTreeByArr(
          data.rows,
          null,
          "ActionPermissonId",
          "ParentId"
        );

        console.log(treeData);
        this.menu.data = treeData;
      } finally {
        this.menu.loading = false;
      }
    },

    create() {
      this.$open({ name: "System_Permission_Add" });
    },

    edit(row) {
      const rows = this.$refs.table.getSelected();
      console.log(rows);
      // this.$open({ name: "System_Permission_Edit", params: { id: row.id } });
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