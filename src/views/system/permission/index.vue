<template>
  <page :fixed="false">
    <split-panel style="height:500px;" split="vertical" :default-percent="40">
      <template #paneL>
        <split-panel split="horizontal">
          <yw-table slot="paneL" v-bind="table" ref="table1"> </yw-table>
          <yw-table slot="paneR" v-bind="table" ref="table2"> </yw-table>
        </split-panel>
      </template>
      <template #paneR>
        <split-panel split="horizontal">
          <yw-table slot="paneL" v-bind="table" ref="table3"> </yw-table>
          <yw-table slot="paneR" v-bind="table" ref="table4"> </yw-table>
        </split-panel>
      </template>
    </split-panel>

    <p>AAA</p>
    <p>AAA</p>
    <p>AAA</p>
    <p>AAA</p>


    <split-panel style="height:500px;" split="vertical" :default-percent="40">
      <template #paneL>
        <split-panel split="horizontal">
          <yw-table slot="paneL" v-bind="table" ref="table1"> </yw-table>
          <yw-table slot="paneR" v-bind="table" ref="table2"> </yw-table>
        </split-panel>
      </template>
      <template #paneR>
        <split-panel split="horizontal">
          <yw-table slot="paneL" v-bind="table" ref="table3"> </yw-table>
          <yw-table slot="paneR" v-bind="table" ref="table4"> </yw-table>
        </split-panel>
      </template>
    </split-panel>
  </page>
</template>

<script>
export default {
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