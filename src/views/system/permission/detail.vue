<template>
  <el-form
    ref="form"
    :model="vm"
    label-width="100px"
    :disabled="disabled"
    :rules="disabled ? null : rules"
  >
    <el-row :gutter="120">
      <el-col :span="12">
        <el-form-item label="权限名称" prop="Name">
          <el-input v-model="vm.Name" clearable></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="权限Action" prop="Action">
          <el-input v-model="vm.Action" clearable></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="权限控制器" prop="Controller">
          <el-input v-model="vm.Controller" clearable></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="权限地址" prop="Url">
          <el-input v-model="vm.Url" clearable></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="排序码" prop="SortCode">
          <el-input-number
            :min="1"
            size="mini"
            v-model="vm.SortCode"
          ></el-input-number>
        </el-form-item>
      </el-col>
      <el-col :span="24">
        <el-form-item label="权限描述" prop="Description">
          <el-input
            type="textarea"
            :autosize="{ minRows: 5, maxRows: 10 }"
            placeholder="请输入内容"
            v-model="vm.Description"
          >
          </el-input>
        </el-form-item>
      </el-col>
    </el-row>
  </el-form>
</template>

<script>
import form from "@/mixins/form";

export default {
  props: {
    type: String,
    data: {},
  },

  mixins: [form],

  data() {
    return {
      vm: this.data,
      rules: {
        Name: { required: true, message: "请输入权限名称" },
        Action: [{ required: true, message: "请选择权限Action" }],
        Controller: [{ required: true, message: "请输入权限控制器" }],
        Url: [{ required: true, message: "请输入权限地址" }],
        SortCode: [{ required: true, message: "请输入排序码" }],
      },
    };
  },

  computed: {
    disabled() {
      return this.type === "view";
    },
  },

  watch: {
    data: {
      deep: true,
      handler(val) {
        this.vm = val;
      },
    },
    vm: {
      deep: true,
      handler(val) {
        this.$emit("update:data", val);
      },
    },
  },
};
</script>

<style>
</style>