<template>
  <page width="60%" :fixed="false" v-loading="loading">
    <title-block> 查看权限分类 </title-block>
    <detail ref="form" type="view" :data.sync="vm"></detail>
    <fixed-block>
      <el-button @click="cancel">关闭</el-button>
    </fixed-block>
  </page>
</template>

<script>
import { getDetail } from "@/api/system/permissionCategory";
import detail from "./detail";

export default {
  name: "System_PermissionCategory_View",

  components: {
    detail,
  },
  props: {
    id: {},
  },

  data() {
    return {
      loading: false,
      vm: {},
    };
  },

  mounted() {
    this.loading = true;
    getDetail(this.id)
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