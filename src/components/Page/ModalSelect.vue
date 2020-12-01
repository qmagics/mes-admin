<template>
  <div class="modal-select">
    <el-input></el-input>
  </div>
</template>

<script>
export default {
  name: "ModalSelect",

  props: {
    value: {},

    api: String,

    multiple: Boolean,
  },

  data() {
    return {
        
    };
  },
};
</script>

<style lang="scss">
.modal-select {
}
</style>