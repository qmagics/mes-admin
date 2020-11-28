<template>
  <div>
    <el-form :model="postForm" label-width="100px">
      <el-row>
        <el-col :span="12">
          <el-form-item label="Name" prop="name">
            <el-input v-model="postForm.name"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="Age" prop="age">
            <el-input-number v-model="postForm.age"></el-input-number>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script>
export default {
  props: {
    type: String,
    data: {},
  },

  data() {
    return {
      postForm: this.data,
    };
  },
};
</script>

<style>
</style>