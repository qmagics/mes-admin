<template>
  <el-form
    ref="form"
    :validate-on-rule-change="false"
    :model="vm"
    label-width="100px"
    :disabled="disabled"
    :rules="disabled ? null : rules"
  >
    <el-row :gutter="120">
      <el-col :span="12">
        <el-form-item label="分类名称" prop="Name">
          <el-input v-model="vm.Name" clearable></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="分类类型" prop="Category">
          <el-select
            v-model.number="vm.Category"
            clearable
            @change="refreshParentSelections($event)"
          >
            <el-option
              v-for="(label, value) in PERMISSION_TYPE"
              :value="Number(value)"
              :label="label"
              :key="value"
            ></el-option>
          </el-select>
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
      <el-col :span="12" v-if="vm.Category && vm.Category != 1">
        <el-form-item label="上级分类" prop="ParentId">
          <el-cascader
            v-model="vm.ParentId"
            placeholder="选择父级栏目"
            :options="parentSelections"
            :props="{
              label: 'Name',
              value: 'ActionPermissonId',
              children: 'Children',
              emitPath: false,
              checkStrictly: true,
              expandTrigger: 'hover',
            }"
            filterable
          ></el-cascader>
        </el-form-item>
      </el-col>
      <el-col :span="24">
        <el-form-item label="分类描述" prop="Description">
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
import { PERMISSION_TYPE } from "@/views/system/vars";
import { getParentSelections } from "@/api/system/permissionCategory";

export default {
  props: {
    type: String,
    data: {},
  },

  mixins: [form],

  data() {
    return {
      PERMISSION_TYPE,

      vm: this.data,

      parentSelections: [],
    };
  },

  computed: {
    disabled() {
      return this.type === "view";
    },
    rules() {
      return {
        Name: { required: true, message: "请输入权限名称" },
        Category: { required: true, message: "请选择权限分类" },
        ParentId: {
          required: this.vm.Category > 1 ? true : false,
          message: "请选择上级分类",
        },
        SortCode: { required: true, message: "请输入排序码" },
      };
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

  methods: {
    refreshParentSelections(Category) {
      getParentSelections(Category).then((res) => {
        if (res.bl) {
          this.parentSelections = res.data.rows;
        }
      });
    },
  },

  created() {
    this.refreshParentSelections();
  },
};
</script>

<style>
</style>