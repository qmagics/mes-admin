<template>
  <div class="topbar">
    <div class="topbar__logo">
      <Logo />
    </div>
    <div class="topbar__toolbox">
      <RemindIcon />
      <UserInfo class="topbar__user-info" />
      <svg-icon class="pointer" @click="logout" iconClass="power"></svg-icon>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Logo from "./Logo";
import RemindIcon from "./RemindIcon";
import UserInfo from "./UserInfo";

export default {
  components: {
    Logo,
    RemindIcon,
    UserInfo,
  },

  computed: {
    ...mapGetters(["device"]),
  },

  methods: {
    async logout() {
      await this.$store.dispatch("user/logout");
      this.$router.push(`/login?redirect=${this.$route.fullPath}`);
    },
  },
};
</script>

<style lang="scss">
@import "~@/styles/variables.scss";

.topbar {
  height: $topBarHeight;
  background-image: linear-gradient(
    to bottom,
    lighten($bgColorPrimary, 10%) 0%,
    $bgColorPrimary 60%
  );
  padding: 0 20px 0 30px;
  overflow: hidden;
  display: flex;
  justify-content: space-between;
  align-items: center;

  &:after {
    content: "";
    position: absolute;
    right: 0;
    top: 0;
    height: 100%;
    width: 30%;
    margin-right: -5%;
    min-width: 500px;
    background-image: linear-gradient(
      to bottom,
      $colorPrimary,
      $colorPrimaryActive
    );
    transform: skew(-50deg, 0);
  }

  .topbar__logo {
    position: relative;
  }

  .topbar__toolbox {
    position: relative;
    z-index: 1;
    color: #fff;
    display: flex;
    align-items: center;

    .svg-icon {
      font-size: 20px;
    }

    .topbar__user-info {
      margin: 0 50px;
    }
  }
}

.mobile .topbar:after {
  display: none;
}
</style>