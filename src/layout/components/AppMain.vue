<template>
  <section class="app-main">
    <!-- <transition name="fade-transform" mode="out-in"> -->
    <keep-alive :include="cachedViews">
      <router-view :key="key" />
    </keep-alive>
    <!-- </transition> -->
    <!-- <router-keep-alive :include="cachedViews">
      <router-view :key="key" />
    </router-keep-alive> -->
  </section>
</template>

<script>
// import RouterKeepAlive from "@/components/RouterKeepAlive";

export default {
  name: "AppMain",
  components: {
    // RouterKeepAlive,
  },
  computed: {
    cachedViews() {
      // if (process.env.NODE_ENV === "production") {
      //   return this.$store.state.tagsView.cachedViews;
      // } else {
      //   return [];
      // }
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
  padding-top: calc(#{$navbarHeight} + #{$topBarHeight} + #{gutter});
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
  .fixed-header {
    padding-right: 15px;
  }
}
</style>
