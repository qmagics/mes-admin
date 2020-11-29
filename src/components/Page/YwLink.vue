<script>
export default {
  name: "YwLink",
  props: {
    location: [String, Object],
  },

  render() {
    return (
      <a
        class="yw-link"
        onclick={() => {
          this.$open(location);
        }}
      >
        {this.$slots.default}
      </a>
    );
  },
};
</script>

<style lang="scss">
.yw-link {
  color: red;
}
</style>