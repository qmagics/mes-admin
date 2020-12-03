<template>
  <div class="page" v-loading="loading" :class="classes" :style="style">
    <!-- <div class="page__header"></div> -->
    <div class="page__body">
      <slot></slot>
    </div>
    <!-- <div class="page__footer"></div> -->
  </div>
</template>

<script>
export default {
  name: "Page",

  props: {
    fixed: {
      type: Boolean,
      default: true,
    },
    loading: Boolean,
    bg: {
      type: [String, Boolean],
      default: true,
    },
    width: {
      default: "100%",
    },
    minWidth: {
      default: "600px",
    },
  },

  data() {
    return {
      tagView: {
        tempRoute: null,
        baseTagName: "",
      },
    };
  },

  computed: {
    classes() {
      let classes = [];
      const { bg, fixed } = this;

      if (bg === true) {
        classes.push("has-bg is--bg-white");
      }

      if (fixed) {
        classes.push("is--fixed");
      }

      return classes;
    },
    style() {
      const { width, minWidth } = this;

      return {
        width,
        minWidth,
      };
    },
  },

  methods: {
    /**
     * 设置路由页签的名称
     * @param {string} val 新页签
     * 占位符 {0} 原名称
     */
    setTagName(val) {
      
      const { tempRoute, baseTagName } = this.tagView;

      tempRoute.title = val.replace(/\{0\}/g, baseTagName);
      
      this.$store.dispatch("tagsView/updateVisitedView", tempRoute);
    },
  },

  created() {
    this.tagView.tempRoute = { ...this.$route };
    this.tagView.baseTagName = this.$route.meta ? this.$route.meta.title : "";
  },
};
</script>

<style lang="scss">
@import "~@/styles/variables.scss";

.page {
  margin: 0 auto;
  overflow-x: hidden;
  &.is--fixed {
    height: calc(100vh - #{$navbarHeight} - #{$topBarHeight} - #{$gutter});
  }
  &.is--bg-white {
    background: #fff;
  }
  &.has-bg {
    padding: 40px 60px;
    border-radius: $radius;
    box-shadow: 0 0 5px 2px rgba(196, 210, 216, 1);
  }

  .page__body {
    height: 100%;
  }
}

.hasTagsView {
  .page {
    &.is--fixed {
      height: calc(
        100vh - #{$navboxHeight} - #{$topBarHeight} - #{$gutter * 2}
      );
    }
  }
}

.fx-modal__body .page {
  height: 100%;
  padding: $gutter;
  &.has-bg {
    border-radius: 0;
    box-shadow: none;
  }
}
</style>