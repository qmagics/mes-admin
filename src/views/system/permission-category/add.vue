<template>
  <page width="60%" :fixed="false">
    <title-block> 新增权限分类 </title-block>
    <detail ref="form" type="add" :data.sync="vm"></detail>
    <fixed-block>
      <el-button @click="save" type="primary" :loading="saving">确认</el-button>
      <el-button @click="cancel">取消</el-button>
    </fixed-block>
  </page>
</template>

<script>
import { create } from "@/api/system/permissionCategory";
import detail from "./detail";

export default {
  name: "System_PermissionCategory_Add",

  components: {
    detail,
  },
  props: {
    id: {},
  },

  data() {
    return {
      vm: {},
      saving: false,
    };
  },

  mounted() {},

  methods: {
    save() {
      this.$refs.form.validate().then((pass) => {
        this.saving = true;
        create(this.vm)
          .then((res) => {
            if (res.bl) {
              this.$message(res.msg);
              setTimeout(() => {
                this.$close();
              }, 500);
            }
          })
          .finally(() => {
            this.saving = false;
          });
      });
    },
    cancel() {
      this.$close();
    },
  },
};
</script>