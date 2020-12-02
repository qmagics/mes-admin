<template>
  <div class="modal-input">
    <!-- 单选 -->
    <el-input v-if="!options.multiple" v-model="selected" placeholder="请选择">
      <i
        @click="choose()"
        slot="suffix"
        class="modal-input__icon el-input__icon el-icon-s-order"
      ></i>
    </el-input>

    <!-- 多选 -->
    <div v-else>
      <pre>{{ selected }}</pre>
      <i
        @click="choose()"
        slot="suffix"
        class="modal-input__icon el-input__icon el-icon-s-order"
      ></i>
    </div>
  </div>
</template>

<script>
export default {
  name: "ModalInput",

  props: {
    value: {},
    options: {},
  },

  data() {
    return {
      selected: this.value,
    };
  },

  watch: {
    value: {
      deep: true,
      handler(val) {
        this.selected = val;
      },
    },
    selected: {
      deep: true,
      handler(val) {
        this.$emit("input", val);
      },
    },
  },

  methods: {
    choose() {
      const { multiple } = this.options;
      this.$modalInput({
        ...this.options,
        selected: multiple ? this.selected : this.selected,
      }).then(({ value, rows }) => {
        console.log("新值:", value);
        console.log("新值对应的表格行:", rows);
        this.selected = value;
      });
    },
  },
};
</script>

<style lang="scss">
@import "~@/styles/variables.scss";

.modal-input {
  .modal-input__icon {
    color: $colorPrimary;
    font-size: 20px;
    text-shadow: 2px 2px 4px rgba($colorPrimary, 0.5);
    cursor: pointer;

    &:hover {
      color: $colorPrimaryActive;
    }
  }
}
</style>