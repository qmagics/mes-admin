<template>
  <page width="50%">
    <title-block> ModalInput 组件 </title-block>
    <el-form :model="vm" label-width="100px">
      <el-form-item label="订单编号" prop="value1">
        <ModalInput
          :options="modelProps"
          :label.sync="vm.value1Name"
          v-model="vm.value1"
        ></ModalInput>
      </el-form-item>
    </el-form>
  </page>
</template>

<script>
import ModalInput from "@/components/ModalInput";

export default {
  name: "Demo_ModalInput",

  components: {
    ModalInput,
  },

  data() {
    return {
      vm: {
        value1: "1493e7d3-67e6-4a25-b353-0440838012ca",
        value1Name: "生产驾驶舱",
      },

      modelProps: {
        height: "700px",
        title: "请选择订单",
        api: "/api/Menu",
        columns: [
          {
            label: "名称",
            prop: "Name",
          },
          {
            label: "链接",
            prop: "Url",
          },
        ],
        valueField: "MenuId",
        labelField: "Name",
        rowKey: "MenuId",
        // keywordProps: {//静态数据筛选时使用
        //   clientFilterFields: ["Name", "Count"],
        // },
      },
    };
  },
};
</script>

<style lang="scss">
</style>