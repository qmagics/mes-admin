<template>
  <page width="60%" :fixed="false">
    <title-block> 新增菜单 </title-block>
    <detail ref="form" type="add" :data.sync="vm"></detail>
    <fixed-block>
      <el-button @click="save" type="primary" :loading="saving">确认</el-button>
      <el-button @click="cancel">取消</el-button>
    </fixed-block>
  </page>
</template>

<script>
import { createMenu, getMenuPermissonTree } from "@/api/system/menu";
import detail from "./detail";

export default {
  name: "System_Menu_Add",

  components: {
    detail,
  },
  props: {
    id: {},
  },

  data() {
    return {
      vm: {
        APTree: [],
        SortCode: 1,
        EnabledMark: 1,
        SystemAttribution: 0,
      },
      saving: false,
    };
  },

  mounted() {
    getMenuPermissonTree().then((res) => {
      if (res.bl) {
        this.vm.APTree = res.data.rows;
      }
    });
  },

  methods: {
    async save() {
      await this.$refs.form.validate();

      this.saving = true;

      try {
        const { bl, msg } = await createMenu(this.vm);

        if (bl) {
          this.$message(msg);

          await this.$sleep(500);

          this.$close();
          this.$open("System_Menu_List", true);
        }
      } finally {
        this.saving = false;
      }
    },
    cancel() {
      this.$close();
    },
  },
};
</script>