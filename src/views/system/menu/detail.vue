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
        <el-form-item label="菜单名称" prop="Name">
          <el-input v-model="vm.Name" clearable></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="菜单图标" prop="Icon">
          <el-input v-model="vm.Icon" clearable></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="24">
        <el-form-item label="菜单地址" prop="Url">
          <el-input v-model="vm.Url" clearable></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="上级菜单" prop="ParentId">
          <el-cascader
            v-model="vm.ParentId"
            placeholder="请选择上级菜单"
            :options="parentSelections"
            :props="{
              label: 'Name',
              value: 'MenuId',
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
        <el-form-item label="导航目标" prop="Target">
          <el-select
            v-model="vm.Target"
            clearable
            @change="refreshParentSelections($event)"
          >
            <el-option
              v-for="(label, value) in MENU_TARGET"
              :value="value"
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

      <el-col :span="12">
        <el-form-item label="所属子系统" prop="SystemAttribution">
          <el-select v-model.number="vm.SystemAttribution" clearable>
            <el-option
              v-for="i in SS_List"
              v-bind="i"
              :key="i.value"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="是否有效" prop="EnabledMark">
          <el-switch
            v-model="vm.EnabledMark"
            :active-value="1"
            :inactive-value="0"
          ></el-switch>
        </el-form-item>
      </el-col>
      <el-col :span="24">
        <el-form-item label="备注" prop="Description">
          <el-input
            type="textarea"
            :autosize="{ minRows: 5, maxRows: 10 }"
            placeholder="请输入备注内容"
            v-model="vm.Description"
          >
          </el-input>
        </el-form-item>
      </el-col>

      <el-col :span="24">
        <el-form-item label="权限分配">
          <ApTree v-model="vm.APTree"></ApTree>
        </el-form-item>
      </el-col>
    </el-row>
  </el-form>
</template>

<script>
import form from "@/mixins/form";
import { MENU_TARGET } from "@/views/system/vars";
import { getMenuSelect } from "@/api/system/menu";
import { getDic } from "@/api/system/dic";
import { getTreeByArr } from "@/utils/structure";
import ApTree from "./components/ApTree";

export default {
  components: {
    ApTree,
  },

  props: {
    type: String,
    data: {},
  },

  mixins: [form],

  data() {
    return {
      MENU_TARGET,

      vm: this.data,

      parentSelections: [],

      //子系统列表
      SS_List: [],
    };
  },

  computed: {
    disabled() {
      return this.type === "view";
    },
    rules() {
      return {
        Name: { required: true, message: "请输入菜单名称" },
        // Target: { required: true, message: "请输入导航目标" },
        // Url: { required: true, message: "请输入菜单地址" },
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
    //刷新上级菜单选项
    refreshParentSelections(Category) {
      getMenuSelect(Category).then((res) => {
        if (res.bl) {
          // this.parentSelections = res.data.rows;
          this.parentSelections = getTreeByArr(
            res.data.rows,
            null,
            "MenuId",
            "ParentId",
            "children"
          );
        }
      });
    },
  },

  created() {
    this.refreshParentSelections();

    //获取所属子系统选项
    getDic("OrgNature").then((res) => {
      if (res.bl) {
        this.SS_List = res.data.rows
          .filter((i) => {
            return i.Value >= 0;
          })
          .map((i) => ({
            label: i.Title,
            value: Number(i.Value),
          }));
      }
    });
  },
};
</script>