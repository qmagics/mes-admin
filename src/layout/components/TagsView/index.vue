<template>
  <div id="tags-view-container" class="tags-view-container">
    <scroll-pane
      ref="scrollPane"
      class="tags-view-wrapper"
      @scroll="handleScroll"
    >
      <router-link
        v-for="tag in visitedViews"
        ref="tag"
        :key="tag.path"
        :class="{
          active: isActive(tag),
          'is-affix': isAffix(tag),
        }"
        :to="{ path: tag.path, query: tag.query, fullPath: tag.fullPath }"
        tag="span"
        class="tags-view-item"
        @click.middle.native="!isAffix(tag) ? closeSelectedTag(tag) : ''"
        @contextmenu.prevent.native="openMenu(tag, $event)"
      >
        {{ tag.title }}
        <span
          v-if="!isAffix(tag)"
          class="el-icon-close"
          @click.prevent.stop="closeSelectedTag(tag)"
        />
      </router-link>
    </scroll-pane>
    <ul
      v-show="visible"
      :style="{ left: left + 'px', top: top + 'px' }"
      class="contextmenu"
    >
      <li @click="refreshSelectedTag(selectedTag)">刷新</li>
      <li v-if="!isAffix(selectedTag)" @click="closeSelectedTag(selectedTag)">
        关闭
      </li>
      <li @click="closeOthersTags">关闭其它</li>
      <li @click="closeAllTags(selectedTag)">关闭全部</li>
    </ul>
  </div>
</template>

<script>
import ScrollPane from "./ScrollPane";
import path from "path";
import {
  topBarHeight,
  navbarHeight,
  tagsViewHeight,
} from "@/styles/variables.scss";

const topHeight =
  parseFloat(topBarHeight) +
  parseFloat(navbarHeight) +
  parseFloat(tagsViewHeight);

export default {
  components: { ScrollPane },
  data() {
    return {
      visible: false,
      top: 0,
      left: 0,
      selectedTag: {},
      affixTags: [],
    };
  },

  computed: {
    visitedViews() {
      return this.$store.state.tagsView.visitedViews;
    },
    // 过滤标签页的页签列表
    // 主要是处理被聚合的路由的标签页问题
    // visitedViewsFiltered() {
    //   const result = []
    //   const juhe_subroutes = []

    //   // 被聚合的子路由,排除出页签,添加进juhe_subroutes;
    //   this.visitedViews.forEach((view, index) => {
    //     if (!view.meta || view.meta.parentJuhe !== true) {
    //       result.push(view)
    //     }
    //     // 被聚合的子路由
    //     else if (view.meta.parentJuhe === true) {
    //       juhe_subroutes.push(view)
    //     }
    //   })

    //   // 聚合路由处理
    //   juhe_subroutes.forEach((subRoute) => {
    //     const parentRoute = this.$store.getters.getParentRouteByFullPath(
    //       subRoute.meta.fullPath
    //     )

    //     // 页签列表中是否有被聚合路由的父路由
    //     let _view = result.find(
    //       (i) => i.meta && i.meta.fullPath === parentRoute.meta.fullPath
    //     )

    //     // 如果存在父路由页签，把子路由添加进父路由的subViews
    //     if (_view) {
    //       _view.subViews.push(subRoute)
    //     }
    //     // 否则，新建父路由，并插入result(页签列表)
    //     else {
    //       _view = Object.assign({}, parentRoute, {
    //         title: parentRoute.meta.title || 'no-name',
    //         subViews: [subRoute],
    //         path: parentRoute.meta.fullPath,
    //         fullPath: parentRoute.meta.fullPath
    //       })
    //       result.push(_view)
    //     }
    //   })

    //   return result
    // },
    routes() {
      return this.$store.state.permission.routes;
    },
  },

  watch: {
    $route() {
      this.addTags();
      this.moveToCurrentTag();
    },
    visible(value) {
      if (value) {
        document.body.addEventListener("click", this.closeMenu);
      } else {
        document.body.removeEventListener("click", this.closeMenu);
      }
    },
  },
  mounted() {
    this.initTags();
    this.addTags();
  },
  methods: {
    // 判断当前页签是否高亮
    isActive(route) {
      // if (!route.meta || !route.meta.juhe) {
      return route.path === this.$route.path;
      // } else {
      // return route.subViews.some((i) => this.$route.path === i.fullPath);
      // }
    },

    isAffix(tag) {
      return tag.meta && tag.meta.affix;
    },

    // 过滤出固定打开的路由对应的页签
    filterAffixTags(routes, basePath = "/") {
      let tags = [];
      routes.forEach((route) => {
        if (route.meta && route.meta.affix) {
          const tagPath = path.resolve(basePath, route.path);
          tags.push({
            fullPath: tagPath,
            path: tagPath,
            name: route.name,
            meta: { ...route.meta },
          });
        }
        if (route.children) {
          const tempTags = this.filterAffixTags(route.children, route.path);
          if (tempTags.length >= 1) {
            tags = [...tags, ...tempTags];
          }
        }
      });
      return tags;
    },
    initTags() {
      const affixTags = (this.affixTags = this.filterAffixTags(this.routes));
      for (const tag of affixTags) {
        // Must have tag name
        if (tag.name) {
          this.$store.dispatch("tagsView/addVisitedView", tag);
        }
      }
    },
    addTags() {
      const { name } = this.$route;
      if (name) {
        this.$store.dispatch("tagsView/addView", this.$route);
      }
      return false;
    },
    moveToCurrentTag() {
      const tags = this.$refs.tag;
      this.$nextTick(() => {
        for (const tag of tags) {
          if (tag.to.path === this.$route.path) {
            this.$refs.scrollPane.moveToTarget(tag);
            // when query is different then update
            if (tag.to.fullPath !== this.$route.fullPath) {
              this.$store.dispatch("tagsView/updateVisitedView", this.$route);
            }
            break;
          }
        }
      });
    },
    // 刷新选中页签
    refreshSelectedTag(view) {
      // 聚合的路由被刷新时，要把所属子路由都销毁掉
      // if (view.meta.juhe) {
      //   const plist = view.subViews.map((sub_view) =>
      //     this.$store.dispatch('tagsView/delCachedView', sub_view)
      //   )

      //   Promise.all(plist).then(() => {
      //     this.$nextTick(() => {
      //       this.$router.replace({
      //         path: '/redirect' + view.fullPath
      //       })
      //     })
      //   })
      // } else {
      this.$store.dispatch("tagsView/delCachedView", view).then(() => {
        const { fullPath } = view;
        this.$nextTick(() => {
          this.$router.replace({
            path: "/redirect" + fullPath,
          });
        });
      });
      // }
    },
    // 关闭选中页签
    closeSelectedTag(view) {
      // 聚合的路由呗关闭时，要把所属子路由都销毁掉
      // if (view.meta.juhe) {
      //   view.subViews.forEach((i) => {
      //     this.closeSelectedTag(i);
      //   });
      // } else {
      this.$store
        .dispatch("tagsView/delView", view)
        .then(({ visitedViews }) => {
          if (this.isActive(view)) {
            this.toLastView(visitedViews, view);
          }
        });
      // }
    },
    // 关闭其它页签
    closeOthersTags() {
      this.$router.push(this.selectedTag);

      let tagToKeep = this.selectedTag;

      // if (tagToKeep.meta && tagToKeep.meta.juhe && tagToKeep.subViews) {
      //   tagToKeep = tagToKeep.subViews.find(
      //     (i) => i.meta.fullPath === tagToKeep.redirect
      //   );

      //   if (!tagToKeep) return;
      // }

      this.$store.dispatch("tagsView/delOthersViews", tagToKeep).then(() => {
        this.moveToCurrentTag();
      });
    },
    closeAllTags(view) {
      this.$store.dispatch("tagsView/delAllViews").then(({ visitedViews }) => {
        if (this.affixTags.some((tag) => tag.path === view.path)) {
          return;
        }
        this.toLastView(visitedViews, view);
      });
    },
    toLastView(visitedViews, view) {
      const latestView = visitedViews.slice(-1)[0];
      if (latestView) {
        this.$router.push(latestView.fullPath);
      } else {
        // now the default is to redirect to the home page if there is no tags-view,
        // you can adjust it according to your needs.
        if (view.name === "Dashboard") {
          // to reload home page
          this.$router.replace({ path: "/redirect" + view.fullPath });
        } else {
          this.$router.push("/");
        }
      }
    },
    openMenu(tag, e) {
      const menuMinWidth = 105;
      const offsetLeft = this.$el.getBoundingClientRect().left; // container margin left
      const offsetWidth = this.$el.offsetWidth; // container width
      const maxLeft = offsetWidth - menuMinWidth; // left boundary
      const left = e.clientX - offsetLeft; // 15: margin right

      if (left > maxLeft) {
        this.left = maxLeft;
      } else {
        this.left = left;
      }

      this.top = e.clientY - topHeight + 50;
      this.visible = true;
      this.selectedTag = tag;
    },
    closeMenu() {
      this.visible = false;
    },
    handleScroll() {
      this.closeMenu();
    },
  },
};
</script>

<style lang="scss" scoped>
@import "~@/styles/variables.scss";

.tags-view-container {
  height: $tagsViewHeight;
  width: 100%;
  background: #fff;
  position: relative;
  // border-bottom: 1px solid #d8dce5;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.12), 0 0 3px 0 rgba(0, 0, 0, 0.04);
  .tags-view-wrapper {
    .tags-view-item {
      display: inline-block;
      position: relative;
      cursor: pointer;
      height: $tagsViewHeight;
      line-height: $tagsViewHeight;
      // border: 1px solid #d8dce5;
      color: $textColorLight;
      // background: yellowgreen;
      // padding: 0 8px;
      padding: 0 24px 0 0;
      font-size: 14px;
      margin-left: 30px;
      position: relative;
      // margin-top: 4px;
      transition: all 0.2s ease;
      &:first-of-type {
        margin-left: 15px;
      }
      &:last-of-type {
        margin-right: 15px;
      }
      &.is-affix {
        padding-right: 0;
      }
      &.active {
        color: $textColor !important;
        font-weight: bold;
        &:after {
          content: "";
          height: 3px;
          width: 100%;
          position: absolute;
          bottom: 0;
          left: 0;
          background: $colorPrimary;
        }
        // &::before {
        //   content: "";
        //   background: $colorPrimary;
        //   display: inline-block;
        //   width: 8px;
        //   height: 8px;
        //   border-radius: 50%;
        //   position: relative;
        //   margin-right: 2px;
        // }
      }
      &:hover {
        color: lighten($colorPrimary, 5%);
      }
    }
  }
  .contextmenu {
    margin: 0;
    background: #fff;
    z-index: 3000;
    position: absolute;
    list-style-type: none;
    padding: 5px 0;
    // border-radius: 4px;
    font-size: 12px;
    font-weight: 400;
    color: #333;
    box-shadow: 2px 2px 3px 0 rgba(0, 0, 0, 0.3);
    li {
      margin: 0;
      padding: 7px 16px;
      cursor: pointer;
      &:hover {
        background: #eee;
      }
    }
  }
}
</style>

<style lang="scss">
@import "~@/styles/variables.scss";

//reset element css of el-icon-close
.tags-view-wrapper {
  .tags-view-item {
    .el-icon-close {
      opacity: 0.5;
      width: 18px;
      height: 18px;
      line-height: 18px;
      text-align: center;
      border-radius: 50%;
      position: absolute;
      right: 0;
      top: 50%;
      font-weight: bold;
      transform: translateY(-50%);
      transition: background-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
      &:hover {
        background-color: rgba($colorPrimary, 0.15);
        color: $colorPrimary;
        opacity: 1;
      }
    }
  }
}
</style>
