<template>
  <el-breadcrumb class="app-breadcrumb" separator="/">
    <transition-group name="breadcrumb">
      <el-breadcrumb-item v-for="(item, index) in levelList" :key="item.path">
        <span
          v-if="item.redirect === 'noRedirect' || index == levelList.length - 1"
          class="no-redirect"
          >{{ item.meta.title }}</span
        >
        <a v-else @click.prevent="handleLink(item)">{{ item.meta.title }}</a>
      </el-breadcrumb-item>
    </transition-group>
  </el-breadcrumb>
</template>

<script>
import pathToRegexp from "path-to-regexp";

export default {
  data() {
    return {
      levelList: null,
    };
  },
  watch: {
    $route(route) {
      // if you go to the redirect page, do not update the breadcrumbs
      if (route.path.startsWith("/redirect/")) {
        return;
      }
      this.getBreadcrumb();
    },
  },
  created() {
    this.getBreadcrumb();
  },
  methods: {
    getBreadcrumb() {
      // 仅显示有meta.title的路由
      let matched = this.$route.matched.filter(
        (item) => item.meta && item.meta.title
      );
      const first = matched[0];

      //在面包屑导航中锁定默认根路径
      // if (!this.isDashboard(first)) {
      //   matched = [{ path: '/dashboard', meta: { title: 'Dashboard' }}].concat(matched)
      // }

      this.levelList = matched.filter(
        (item) => item.meta && item.meta.title && item.meta.breadcrumb !== false
      );
    },
    isDashboard(route) {
      const name = route && route.name;
      if (!name) {
        return false;
      }
      return (
        name.trim().toLocaleLowerCase() === "Dashboard".toLocaleLowerCase()
      );
    },
    pathCompile(path) {
      // To solve this problem https://github.com/PanJiaChen/vue-element-admin/issues/561
      const { params } = this.$route;
      var toPath = pathToRegexp.compile(path);
      return toPath(params);
    },
    handleLink(item) {
      const { redirect, path } = item;
      if (redirect) {
        this.$router.push(redirect);
        return;
      }
      this.$router.push(this.pathCompile(path));
    },
  },
};
</script>

<style lang="scss">
@import "~@/styles/variables.scss";
.app-breadcrumb.el-breadcrumb {
  display: inline-block;
  font-size: 15px;
  line-height: $navbarHeight;
  margin-left: 25px;
  padding-left: 20px;
  position: relative;

  &:before {
    content: "";
    width: 5px;
    height: 16px;
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    background-color: $colorPrimary;
  }

  .el-breadcrumb__item {
    a,span{
      transition: all .1s ease;
    }
    .el-breadcrumb__inner a {
      color: $textColor;
    }
    &:first-child {
      .el-breadcrumb__inner,
      .el-breadcrumb__inner a {
        // font-size: 17px;
        font-weight: bold !important;
      }
      span {
        color: $textColor !important;
      }
    }
  }

  .no-redirect {
    color: $textColor;
    cursor: text;
  }

  .el-breadcrumb__separator {
    color: $textColor;
  }
}
</style>
