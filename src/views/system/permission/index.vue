<template>
  <page>
    <yw-table v-bind="table" ref="table">
      <div slot="superQuery">
        AAA
      </div>
    </yw-table>
  </page>
</template>

<script>
export default {
  data() {
    return {
      table: {
        data: [{ name: "A" }, { name: "B" }],
        columns: [
          {
            label: "NAME",
            prop: "name",
          },
        ],
        query: {
          key: "",
        },

        options:{
        }
      },
    };
  },
};
</script>

<style>
</style>