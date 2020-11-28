<template>
  <router-view></router-view>
</template>

<script>
export default {
  name: "BlankRouter",

  computed: {
    // cachedViews() {
    //   return this.$store.state.cachedViews;
    // },
    // key() {
    //   return this.$route.path;
    // },
  },

  // mounted() {
  //   console.log("hhh");
  // },
};
</script>