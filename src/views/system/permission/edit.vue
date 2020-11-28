<template>
  <page :loading="loading">
    <detail v-if="model" type="edit" :data="model"> </detail>
    <el-button @click="save">保存</el-button>
  </page>
</template>

<script>
import detail from "./detail";

export default {
  name: "System_Permission_Edit",

  props: {
    id: {},
  },

  components: {
    detail,
  },

  data() {
    return {
      model: null,
      loading: false,
    };
  },

  mounted() {
    this.loading = true;
    setTimeout(() => {
      this.model = {
        name: "老王",
        age: 48,
      };
      this.loading = false;
    }, 1000);
  },

  methods: {
    save() {
      this.$message("更新成功");

      setTimeout((_) => {
        this.$close();
      }, 500);
    },
  },
};
</script>

<style>
</style>