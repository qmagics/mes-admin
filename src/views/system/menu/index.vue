<template>
  <page width="50%">
    <el-form :model="vm" label-width="100px">
      <el-form-item label="订单编号" prop="value1">
        <ModalInput :options="modelProps" v-model="vm.value1"></ModalInput>
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
        value1: [],
      },

      modelProps: {
        height: "50%",
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
        multiple: true,
        // pagination: false,
        // columns: [
        //   {
        //     label: "名称",
        //     prop: "Name",
        //   },
        //   {
        //     label: "数量",
        //     prop: "Count",
        //   },
        // ],
        // source: [
        //   {
        //     Name: "AAA",
        //     Id: "aaa",
        //     Count: 1,
        //   },
        //   {
        //     Name: "BBB",
        //     Id: "bbb",
        //     Count: 1,
        //   },
        //   {
        //     Name: "CCC",
        //     Id: "ccc",
        //     Count: 1,
        //   },
        // ],
        // height: "600px",
        // valueField: "Id",
        // labelField: "Name",
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