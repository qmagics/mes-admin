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
        <el-form-item label="分类名称" prop="FullName">
          <el-input v-model="vm.FullName" clearable></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="分类简称" prop="ShortName">
          <el-input v-model="vm.ShortName" clearable></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="分类编码" prop="Code">
          <el-input v-model="vm.Code" clearable></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="上级分类" prop="ParentId">
          <el-cascader
            v-model="vm.ParentId"
            placeholder="请选择上级分类"
            :options="parentSelections"
            :props="{
              label: 'FullName',
              value: 'CustomerId',
              children: 'children',
              emitPath: false,
              checkStrictly: true,
              expandTrigger: 'hover',
            }"
            filterable
          ></el-cascader>
        </el-form-item>
      </el-col>
    </el-row>
  </el-form>
</template>

<script>
import form from "@/mixins/form";
import { getCustomerCategorySelect } from "@/api/biz/customer";
import { getTreeByArr } from "@/utils/structure";

export default {
  props: {
    type: String,
    data: {},
  },

  mixins: [form],

  data() {
    return {
      parentSelections: [],

      vm: this.data,

      rules: {
        ParentId: { required: true, message: "请选择父级分类" },
        Code: { required: true, message: "请输入客户编码" },
        FullName: { required: true, message: "请输入客户名称" },
        ShortName: { required: true, message: "请输入客户简称" },
        ParentId: { required: true, message: "请选择所属分类" },
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
    async "vm.CustomerId"(val) {
      this.refreshSelection(val);
    },
  },

  methods: {
    //刷新上级分类选项
    async refreshSelection(CustomerId) {
      const { data, bl } = await getCustomerCategorySelect({
        CustomerId,
      });
      if (bl) {
        this.parentSelections = getTreeByArr(
          data.rows,
          null,
          "CustomerId",
          "ParentId"
        );
      }
    },
  },

  mounted() {
    if (this.type === "add") {
      this.refreshSelection();
    }
  },
};
</script>

<style>
</style>