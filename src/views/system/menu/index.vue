<template>
  <page width="50%">
    <el-form :model="vm" label-width="100px">
      <el-form-item label="value1" prop="value1">
        <ModalSelect  v-bind="modelSelectProps" v-model="vm.value1"></ModalSelect>
      </el-form-item>
    </el-form>
  </page>
</template>

<script>
import ModalSelect from "@/components/Page/ModalSelect";

export default {
  name: "System_Menu",

  components: {
    ModalSelect,
  },

  data() {
    return {
      vm: {
        value1: "",
      },

      modelSelectProps:{
        
      }
    };
  },
};
</script>

<style lang="scss">
</style>