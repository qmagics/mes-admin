<template>
  <section class="app-main">
    <!-- <transition name="fade-transform" mode="out-in"> -->
    <keep-alive :include="cachedViews">
      <router-view :key="key" />
    </keep-alive>
    <!-- </transition> -->
  </section>
</template>

<script>

export default {
  name: "AppMain",
  computed: {
    cachedViews() {
      return this.$store.state.tagsView.cachedViews;
    },
    key() {
      return this.$route.path;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "~@/styles/variables.scss";

.app-main {
  /* 50= navbar  50  */
  min-height: calc(100vh - #{$navbarHeight} - #{$topBarHeight});
  width: 100%;
  position: relative;
  overflow: hidden;
  padding: $gutter;
}

.fixed-header + .app-main {
  padding-top: calc(#{$navbarHeight} + #{$topBarHeight} + #{$gutter});
}

.hasTagsView {
  .app-main {
    /* 84 = navbar + tags-view = 50 + 34 */
    min-height: calc(100vh - #{$navboxHeight} - #{$topBarHeight});
  }

  .fixed-header + .app-main {
    padding-top: calc(#{$navboxHeight} + #{$topBarHeight} + #{$gutter});
  }
}
</style>

<style lang="scss">
// fix css style bug in open el-dialog
.el-popup-parent--hidden {
  // .fixed-header {
  //   padding-right: 15px;
  // }
}
</style>
