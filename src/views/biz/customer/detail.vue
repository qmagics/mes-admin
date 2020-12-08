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
        <el-form-item label="客户名称" prop="FullName">
          <el-input v-model="vm.FullName" clearable></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="客户简称" prop="ShortName">
          <el-input v-model="vm.ShortName" clearable></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="客户编码" prop="Code">
          <el-input v-model="vm.Code" clearable></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="所属分类" prop="ParentId">
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
      <el-col :span="12">
        <el-form-item label="联系人" prop="Contact">
          <el-input v-model="vm.Contact" clearable></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="联系电话" prop="ContactPhone">
          <el-input v-model="vm.ContactPhone" clearable></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="开户银行" prop="DepositBank">
          <el-input v-model="vm.DepositBank" clearable></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="客户级别" prop="CustomerLevel">
          <el-input v-model="vm.CustomerLevel" clearable></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="邮编" prop="Postcode">
          <el-input v-model="vm.Postcode" clearable></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="是否停用" prop="DisabledMark">
          <el-switch v-model="vm.DisabledMark"></el-switch>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="业务对照码" prop="BizCode">
          <el-input v-model="vm.BizCode" clearable></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="业务对照名称" prop="BizName">
          <el-input v-model="vm.BizName" clearable></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="24">
        <el-form-item label="地址" prop="Address">
          <el-input
            rows="5"
            type="textarea"
            v-model="vm.Address"
            clearable
          ></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="24">
        <el-form-item label="备注" prop="Remarks">
          <el-input
            rows="5"
            type="textarea"
            v-model="vm.Remarks"
            clearable
          ></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="24">
        <el-form-item label="附件" prop="AttachmentList">
          <FileUploader v-model="vm.AttachmentList"></FileUploader>
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
        Code: { required: true, message: "请输入客户编码" },
        FullName: { required: true, message: "请输入客户名称" },
        ShortName: { required: true, message: "请输入客户简称" },
        ParentId: { required: true, message: "请选择所属分类" },
        Contact: { required: true, message: "请输入联系人" },
        ContactPhone: { required: true, message: "请输入联系电话" },
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

    //点击上传按钮
    toUpload() {
      uppy.getPlugin("Dashboard").openModal();
    },
  },

  mounted() {
    this.refreshSelection();
  },
};
</script>

<style>
</style>