<template>
  <page width="50%">
    <el-form :model="vm" label-width="100px">
      <el-form-item label="订单编号" prop="value1">
        <ModalInput :options="modelProps" :label.sync="vm.value1Name" v-model="vm.value1"></ModalInput>
      </el-form-item>
    </el-form>
  </page>
</template>

<script>
import ModalInput from "@/components/Page/ModalInput";

export default {
  name: "System_Menu",

  components: {
    ModalInput,
  },

  data() {
    return {
      vm: {
        value1: "ac1eeadf-23ca-4500-8607-33b1daef0c1a",
        value1Name:"栏目配置"
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
        // keywordProps: {
        //   clientFilterFields: ["Name", "Count"],
        // },
      },
    };
  },
};
</script>

<style lang="scss">
</style>