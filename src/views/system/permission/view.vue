<template>
  <page :loading="loading" width="60%" :fixed="false">
    <title-block> 查看权限 </title-block>
    <detail ref="form" type="view" :data.sync="vm"></detail>
    <fixed-block>
      <el-button @click="cancel">关闭</el-button>
    </fixed-block>
  </page>
</template>

<script>
import { getPermissionDetail } from "@/api/system/permission";
import detail from "./detail";

export default {
  name: "System_Permission_View",

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
    };
  },

  mounted() {
    this.loading = true;

    getPermissionDetail(this.id)
      .then((res) => {
        if (res.bl) {
          this.vm = res.data.rows[0];
        }
      })
      .finally(() => {
        this.loading = false;
      });
  },

  methods: {
    cancel() {
      this.$close();
    },
  },
};
</script>