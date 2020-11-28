<template>
  <page>
    <p v-for="i in 20">View</p>
    <el-button @click="$emit('confirm')">Action Confirm</el-button>
    <el-button @click="$emit('cancel')">Action Cancel</el-button>
  </page>
</template>

<script>
export default {
  name: "Demo_OverallExample_View",
  methods: {
    btn1Handler() {
      alert("btn1 clicked");
    },
    btn2Handler() {
      alert("btn2 clicked");
    },
  },
};
</script>

<style>
</style>