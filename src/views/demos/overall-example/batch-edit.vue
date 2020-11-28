<template>
  <div>
    批量编辑

    <pre>
        {{ ids }}
      </pre
    >

    <!-- <el-input v-model="value" /> -->
  </div>
</template>

<script>
export default {
  name: "Demo_OverallExample_BatchEdit",

  props: {
    ids: {},
  },

  data() {
    console.log(1);
    return {
      list: this.ids,
    };
  },

  beforeRouteUpdate(to, from, next) {
    console.log("beforeRouteUpdate", this.$route.params.ids);
    // react to route changes...
    // don't forget to call next()
  },

  // mounted() {
  //   this.list = this.$route.params.ids;
  // },
};
</script>

<style>
</style>