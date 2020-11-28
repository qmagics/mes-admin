<template>
  <page :loading="loading">
    params:
    <pre>{{ $route.params }}</pre>
    <!-- <detail v-if="model" type="edit" :data="model"> </detail> -->
    <el-form v-if="model" :model="model" label-width="100px">
      <el-row>
        <el-col :span="12">
          <el-form-item label="Id" prop="id">
            <el-input v-model="model.id"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="Name" prop="name">
            <el-input v-model="model.name"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="Age" prop="age">
            <el-input-number v-model="model.age"></el-input-number>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <el-button @click="save">保存</el-button>
  </page>
</template>

<script>
// import detail from "./components/detail";

export default {
  name: "Demo_OverallExample_Edit",

  // props: {
  //   id: {},
  // },

  // components: {
  //   detail,
  // },

  data() {
    return {
      model: null,
      loading: false,
    };
  },

  mounted() {
    // console.log("mounted");
    this.loading = true;
    setTimeout(() => {
      this.model = {
        id: this.$route.params.id,
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
  // },

  beforeRouteUpdate(to, from, next) {
    console.log("beforeRouteUpdate", this.$route.params.id);

    next();
    // react to route changes...
    // don't forget to call next()
  },
};
</script>

<style>
</style>