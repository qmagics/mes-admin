<script>
export default {
  name: "YwLink",
  props: {
    target: [String, Object],
  },

  render() {
    return (
      <a
        class="yw-link"
        onclick={() => {
          this.$open(this.target);
        }}
      >
        <span class="yw-link__inner">{this.$slots.default}</span>
      </a>
    );
  },
};
</script>

<style lang="scss">
@import "~@/styles/variables.scss";

.yw-link {
  color: $colorPrimary;
  cursor: pointer;
  display: inline-flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  vertical-align: middle;
  position: relative;
  text-decoration: none;
  outline: none;
  cursor: pointer;
  padding: 0;
  font-size: 14px;
  font-weight: 500;

  &:after {
    content: "";
    position: absolute;
    left: 0;
    right: 0;
    height: 0;
    bottom: 0;
    border-bottom: 1px solid lighten($colorPrimary,10%);
  }

  &:hover {
    color: $colorPrimaryActive;
  }
}
</style>