<script>
export default {
  name: "FixedCol",

  props: {
    span: {
      type: Number,
      default: 24,
    },
  },

  render() {
    const { span } = this;
    return (
      <el-col span={span} class="fixed-col">
        <div class="fixed-col__content">{this.$slots.default}</div>
      </el-col>
    );
  },
};
</script>

<style lang="scss">
.fixed-col {
  height: 100%;

  .fixed-col__content {
    background: #fff;
    height: 100%;
    overflow: hidden;
  }
}
</style>