<template>
  <page ref="page" :loading="loading" width="60%" :fixed="false">
    <!-- 页面头部标题 -->
    <title-block> 查看客户档案分类 </title-block>

    <!-- 表单详情区域 -->
    <detail ref="form" type="view" :data.sync="vm"></detail>

    <!-- 动态悬浮区块 -->
    <fixed-block>
      <el-button @click="cancel">关闭</el-button>
    </fixed-block>
  </page>
</template>

<script>
import { getCustomerDetail } from "@/api/biz/customer";
import detail from "./detail";

export default {
  //视图组件名称
  name: "Biz_CustomerCategory_View",

  //局部组件
  components: {
    detail,
  },

  //组件参数
  props: {
    //路由中的动态参数 :id
    id: {},
  },

  data() {
    return {
      //业务表的viewModel
      vm: {},

      //页面加载状态
      loading: false,
    };
  },

  //mounted钩子
  async mounted() {
    this.loading = true;

    //获取viewModel数据
    try {
      const { bl, data, msg } = await getCustomerDetail(this.id);

      if (bl) {
        this.vm = data.rows[0];
        
        //更新页面路由页签的名称 {0}为baseName
        this.$refs.page.setTagName(`{0} - ${this.vm.FullName}`);
      }
    } finally {
      this.loading = false;
    }
  },

  //vueMethods
  methods: {
    //关闭
    cancel() {
      this.$close();
    },
  },
};
</script>