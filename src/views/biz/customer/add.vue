<template>
  <page width="60%" :fixed="false">
    <!-- 页面头部标题 -->
    <title-block> 新增客户档案 </title-block>

    <!-- 表单详情区域 -->
    <detail ref="form" type="add" :data.sync="vm"></detail>

    <!-- 动态悬浮区块 -->
    <fixed-block>
      <el-button @click="save" type="primary" :loading="saving">确认</el-button>
      <el-button @click="cancel">取消</el-button>
    </fixed-block>
  </page>
</template>

<script>
import { createCustomer } from "@/api/biz/customer";
import detail from "./detail";

export default {
  //视图组件名称
  name: "Biz_Customer_Add",

  //局部组件
  components: {
    detail,
  },

  //组件参数
  props: {
    //路由中的动态参数 :id
    id: {},
  },

  //vueData
  data() {
    return {
      //业务表的viewModel
      vm: {
        Nature: "2",
      },

      //保存状态
      saving: false,
    };
  },

  //vueMethods
  methods: {
    //新增保存
    async save() {
      //表单校验
      await this.$refs.form.validate();

      this.saving = true;

      //提交数据
      try {
        const { bl, msg } = await createCustomer(this.vm);

        //业务成功
        if (bl) {
          this.$message(msg);

          await this.$sleep(500);

          //关闭当前页面
          this.$close();

          //转到列表页并刷新
          this.$open("Biz_Customer_List", true);
        }
      } finally {
        this.saving = false;
      }
    },

    //取消
    cancel() {
      this.$close();
    },
  },
};
</script>

<style lang="scss" scoped>
</style>