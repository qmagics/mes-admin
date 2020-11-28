<template>
  <div class="fixed-block">
    <i ref="anchor"></i>
    <div class="fixed-block__inner" :class="needFixed ? 'is--need-fixed' : ''">
      <slot></slot>
    </div>
  </div>
</template>

<script>
function isElementInViewport(el) {
  var rect = el.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <=
      (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}

export default {
  name: "FixedBlock",

  data() {
    return {
      needFixed: false,
    };
  },

  methods: {
    handleScroll() {
      const $anchor = this.$refs.anchor;
      if (isElementInViewport($anchor)) {
        this.needFixed = false;
      } else {
        this.needFixed = true;
      }
    },
  },

  activated() {
    this.handleScroll();
  },

  mounted() {
    window.addEventListener("scroll", this.handleScroll);
    this.handleScroll();
  },
  destroyed() {
    window.removeEventListener("scroll", this.handleScroll);
  },
};
</script>

<style lang="scss">
@import "~@/styles/variables.scss";

.fixed-block {
  text-align: center;
  .fixed-block__inner {
    padding: 20px 0;
    text-align: inherit;
    transition: all 0.2s ease-in-out;
    &.is--need-fixed {
      position: fixed;
      bottom: 0;
      left: $sideBarWidth;
      right: 0;
      background: rgba($bgColorPrimary, 0.2);
      z-index: 9;
    }
  }
}

.hideSidebar {
  .fixed-block__inner {
    &.is--need-fixed {
      left: $sideBarMinWidth;
    }
  }
}
</style>