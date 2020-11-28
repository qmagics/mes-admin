<template>
  <page width="60%" :fixed="false">
    <title-block> 新增权限 </title-block>
    <detail ref="form" type="add" :data="vm"></detail>
    <fixed-block>
      <el-button @click="save" type="primary">确认</el-button>
      <el-button @click="cancel">取消</el-button>
    </fixed-block>
  </page>
</template>

<script>
import detail from "./detail";

export default {
  name: "System_Permission_Add",
  components: {
    detail,
  },

  data() {
    return {
      vm: {},
    };
  },

  methods: {
    save() {
      this.$refs.form.validate().then((pass) => {
        this.$message("保存成功");
        setTimeout((_) => {
          this.$close();
        }, 500);
      });
    },
    cancel() {
      this.$close();
    },
  },
};
</script>

<style lang="scss">
</style>