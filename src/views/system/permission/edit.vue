<template>
  <page :loading="loading" width="60%" :fixed="false">
    <title-block> 编辑权限 </title-block>
    <detail ref="form" type="edit" :data.sync="vm"></detail>
    <fixed-block>
      <el-button @click="save" type="primary" :loading="saving">确认</el-button>
      <el-button @click="cancel">取消</el-button>
    </fixed-block>
  </page>
</template>

<script>
import { getPermissionDetail, updatePermission } from "@/api/system/permission";
import detail from "./detail";

export default {
  name: "System_Permission_Edit",

  components: {
    detail,
  },
  props: {
    id: {},
  },

  data() {
    return {
      vm: {},
      loading: false,
      saving: false,
    };
  },

  mounted() {
    this.loading = true;

    getPermissionDetail(this.id)
      .then((res) => {
        this.vm = res.data.rows[0];
      })
      .finally(() => {
        this.loading = false;
      });
  },

  methods: {
    save() {
      this.$refs.form.validate().then((pass) => {
        this.saving = true;
        updatePermission(this.vm)
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

<style>
</style>