<template>
  <page>
    <split-pane split="horizontal">
      <template slot="paneL">
        <yw-table v-bind="table" ref="table1">
          <div slot="superQuery">AAA</div>
        </yw-table>
      </template>
      <template slot="paneR">
        <yw-table v-bind="table" ref="table2">
          <div slot="superQuery">AAA</div>
        </yw-table>
      </template>
    </split-pane>
  </page>
</template>

<script>
import splitPane from 'vue-splitpane'

export default {
  components:{
    splitPane
  },
  data() {
    return {
      table: {
        data: [
          { name: "A" },
          { name: "B" },
          { name: "A" },
          { name: "B" },
          { name: "A" },
          { name: "B" },
          { name: "A" },
          { name: "B" },
          { name: "A" },
          { name: "B" },
          { name: "A" },
          { name: "B" },
          { name: "A" },
          { name: "B" },
          { name: "A" },
          { name: "B" },
          { name: "A" },
          { name: "B" },
          { name: "A" },
          { name: "B" },
          { name: "A" },
          { name: "B" },
          { name: "A" },
          { name: "B" },
          { name: "A" },
          { name: "B" },
          { name: "A" },
          { name: "B" },
          { name: "A" },
          { name: "B" },
          { name: "A" },
          { name: "B" },
          { name: "A" },
          { name: "B" },
          { name: "A" },
          { name: "B" },
          { name: "A" },
          { name: "B" },
          { name: "A" },
          { name: "B" },
          { name: "A" },
          { name: "B" },
          { name: "A" },
          { name: "B" },
          { name: "A" },
          { name: "B" },
          { name: "A" },
          { name: "B" },
        ],
        columns: [
          {
            label: "NAME",
            prop: "name",
          },
        ],
        query: {
          key: "",
        },
        options: {
          height: "100%",
          // pagination: false,
        },
      },
    };
  },
};
</script>

<style>
</style>