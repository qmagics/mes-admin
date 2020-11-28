<template>
  <div id="app2" class="app">
    <router-view />
    <FxModal />
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "App",

  computed: {
    ...mapGetters(["cachedViews", "visitedViews"]),
  },
};
</script>

<style lang="scss">
#app2 {
  width: 900px;
  height: 500px;
  overflow: hidden;
  position: absolute;
  border: 2px solid yellowgreen;
  background: #fff;
  left: 10px;
  bottom: 10px;
  z-index: 9999;
}
</style>

