<script>
export default {
  name: "Page",

  props: {
    fixed: {
      type: Boolean,
      default: true,
    },
  },

  render() {
    return (
      <div class={["page", this.fixed ? "is--fixed" : ""]}>
        {this.$slots.default}
      </div>
    );
  },
};
</script>

<style lang="scss">
.page {
  &.is--fixed {
    height: calc(100vh - 84px);
  }
}
</style>