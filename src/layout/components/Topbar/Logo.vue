<template>
  <div class="topbar-logo-container">
    <transition name="topbarLogoFade">
      <router-link key="expand" class="topbar-logo-link" to="/">
        <img v-if="logo" :src="logo" class="topbar-logo" />
        <h1 class="topbar-title">{{ title }}</h1>
      </router-link>
    </transition>
  </div>
</template>

<script>
import logo from "@/assets/platform/logo_240x240.png";
import { title } from "@/settings";

export default {
  name: "TopbarLogo",
  data() {
    return {
      title,
      logo,
    };
  },
};
</script>

<style lang="scss" scoped>
@import "~@/styles/variables.scss";

.topbarLogoFade-enter-active {
  transition: opacity 1.5s;
}

.topbarLogoFade-enter,
.topbarLogoFade-leave-to {
  opacity: 0;
}

.topbar-logo-container {
  position: relative;
  width: 100%;
  height: $topBarHeight;
  line-height: $topBarHeight;
  // background: #2b2f3a;
  text-align: center;
  overflow: hidden;

  & .topbar-logo-link {
    height: 100%;
    width: 100%;

    & .topbar-logo {
      width: 28px;
      height: 28px;
      vertical-align: middle;
      margin-right: 12px;
    }

    & .topbar-title {
      display: inline-block;
      margin: 0;
      color: #fff;
      font-weight: 600;
      line-height: $topBarHeight;
      font-size: 22px;
      letter-spacing: 2px;
      font-family: Avenir, Helvetica Neue, Arial, Helvetica, sans-serif;
      vertical-align: middle;
    }
  }
}
</style>
