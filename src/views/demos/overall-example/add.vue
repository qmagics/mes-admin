<template>
  <page>
    <el-card>
      <!-- <detail type="add" :data.sync="model"></detail> -->
      <el-form :model="model" label-width="100px">
        <el-row>
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
    </el-card>
    <el-button @click="save">保存</el-button>
  </page>
</template>

<script>
import detail from "./components/detail";

export default {
  name: "Demo_OverallExample_Add",
  components: {
    detail,
  },

  data() {
    return {
      model: {
        name: "",
        age: "",
      },
    };
  },

  methods: {
    save() {
      this.$message("保存成功");

      setTimeout((_) => {
        this.$close();
        this.$open("Demo_OverallExample");
      }, 500);
    },

    refresh() {
      // this.model = {
      //   name: "",
      //   age: "",
      // };
    },
  },

  created() {
    console.log("created");
    this.refresh();
  },

  activated() {
    console.log("activated");
    this.refresh();
  },
};
</script>

<style>
</style>