<template>
  <div class="table-select">
    <yw-table
      ref="table"
      :data.sync="data"
      :columns="tableColumns"
      :options="tableOptions"
      :query.sync="query"
    >
    </yw-table>
  </div>
</template>

<script>
import { isArray } from "@/utils/validate";
export default {
  props: {
    source: Array,
    columns: Array,
    multiple: Boolean,
    pagination: {
      type: Boolean,
      default: true,
    },
    rowKey: String,
    api: String,
    request: Function,
    valueField: {
      type: String,
      default: "value",
    },
    labelField: {
      type: String,
      default: "label",
    },
    keywordProps: {},
    selected: {},
    tableHeight: {},
  },

  data() {
    return {
      query: {},
      data: this.source,
    };
  },

  computed: {
    tableColumns() {
      return this.columns;
    },
    tableOptions() {
      return {
        api: this.api,
        height: this.tableHeight,
        selectable: true,
        singleSelect: this.multiple ? false : true,
        rowKey: this.rowKey,
        pagination: this.pagination,
        defaultSelectedKeys: isArray(this.selected)
          ? this.selected
          : [this.selected],
        keywordProps: this.keywordProps,
      };
    },
  },

  watch: {
    data(val) {
      this.$nextTick(() => {
        this.$refs.table.setSelectedByKey(this.selected, true);
      });
    },
  },

  methods: {
    confirm(cb) {
      const newRows = this.$refs.table.getSelected();

      let newVal = null;

      if (!this.multiple) {
        newVal = newRows[0][this.valueField];
      } else {
        newVal = newRows.map((i) => i[this.valueField]);
      }

      cb({
        value: newVal,
        rows: newRows,
      });
    },

    cancel(cb) {
      cb();
    },
  },
};
</script>

<style lang="scss">
.table-select {
  height: 100%;
}
</style>