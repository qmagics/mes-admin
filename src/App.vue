<template>
  <div id="app" class="app">
    <router-view />
    <FxModal />
    <!-- 
    <div class="debug">
      <el-row>
        <el-col :span="8"> cachedViews: </el-col>
        <el-col :span="16">
          <pre>{{ cachedViews }}</pre>
        </el-col>
        <el-col :span="8"> visitedViews: </el-col>
        <el-col :span="16">
          <pre>{{ visitedViews.map((i) => i.name) }}</pre>
        </el-col>
      </el-row>
    </div> -->
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "App",

  // computed: {
  //   ...mapGetters(["cachedViews", "visitedViews"]),
  // },
};
</script>

// <style lang="scss">
// .debug {
//   position: fixed;
//   right: 10px;
//   bottom: 10px;
//   z-index: 99999;
//   width: 300px;
//   height: 200px;
//   overflow: auto;
//   padding: 10px;
//   border-radius: 6px;
//   color: rgb(193, 212, 154);
//   background: rgb(26, 99, 56);
// }
//
</style>
