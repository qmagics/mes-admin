<script>
import { gutter } from "@/styles/variables.scss";

export default {
  name: "FixedRow",

  props: {
    gutter: {
      type: Number,
      default: parseFloat(gutter),
    },
    type: {
      type: String,
      default: "",
    },
    justify: {
      type: String,
      default: "start",
    },
    align: {
      type: String,
      default: "top",
    },
    tag: {
      type: String,
      default: "div",
    },
  },

  render() {
    const { gutter, type, justify, align, tag } = this;
    return (
      <el-row
        gutter={gutter}
        type={type}
        justify={justify}
        align={align}
        tag={tag}
        class="fixed-row"
      >
        {this.$slots.default}
      </el-row>
    );
  },
};
</script>

<style lang="scss">
@import "~@/styles/variables.scss";

.fixed-row {
  height: 100%;
  //   margin-bottom: $gutter;
  & + .fixed-row {
    margin-top: $gutter;
  }
}
</style>