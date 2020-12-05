<template>
  <div class="table-select">
    <split-panel split="vertical" :default-percent="20">
      <template #paneL>
        <fixed-panel scrollable>
          <div slot="header">
            <el-row>
              <el-col :span="12">已选择</el-col>
              <el-col :span="12" style="text-align: right">
                <el-button class="fixed-panel__header-btn" @click="clear">
                  清空
                </el-button>
              </el-col>
            </el-row>
          </div>
          <div style="padding: 10px">
            <!-- 单选展示选项 -->
            <template v-if="!multiple">
              <el-tag
                v-if="vSelectedValue"
                class="table-select__tag"
                closable
                @close="del_single()"
              >
                <span v-if="vSelectedRow">{{ vSelectedRow[labelField] }}</span>
                <span v-else>{{ vLabel }}</span>
              </el-tag>
            </template>
            <!-- 多选展示选项 -->
            <template v-else> </template>
          </div>
        </fixed-panel>
      </template>
      <template #paneR>
        <fixed-panel>
          <yw-table
            ref="table"
            :data.sync="data"
            :columns="tableColumns"
            :options="tableOptions"
            :query.sync="query"
            @selected-change="onSelectedChange"
          >
          </yw-table>
        </fixed-panel>
      </template>
    </split-panel>
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
    selected: [String, Array],
    label: {},
    tableHeight: {},
  },

  data() {
    return {
      query: {},

      data: this.source,

      vSelectedValue: this.selected,

      vSelectedRow: null,

      vLabel: this.label,
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
        defaultSelectedKeys: isArray(this.vSelectedValue)
          ? this.vSelectedValue
          : [this.vSelectedValue],
        keywordProps: this.keywordProps,
      };
    },
  },

  watch: {
    data(val) {
      this.$nextTick(() => {
        this.$refs.table.setSelectedByKey(this.vSelectedValue, true);
      });
    },

    selected: {
      deep: true,
      handler(val) {
        this.vSelectedValue = val;
      },
    },
  },

  methods: {
    onSelectedChange(selectedRows) {
      if (!this.multiple) {
        if (selectedRows && selectedRows[0]) {
          const row = selectedRows[0];
          if (row) {
            this.vSelectedRow = row;
            this.vSelectedValue = row[this.valueField];
            this.vLabel = row[this.labelField];
          }
        } else {
          this.vSelectedRow = null;
          this.vSelectedValue = "";
          this.vLabel = "";
        }
      } else {
        // this.vSelectedValue = selectedRows.map((i) => i[this.valueField]);
      }
    },

    //单选标签删除
    del_single() {
      this.vSelectedValue = "";
      this.$refs.table.setCurrentRow();
    },

    //清空
    clear() {
      if (!this.multiple) {
        this.del_single();
      } else {
        this.vSelectedValue = [];
        this.$refs.table.clearSelection();
      }
    },

    confirm(cb) {
      const newVal = this.vSelectedValue;

      if (!this.multiple) {
        cb({
          value: newVal,
          label: this.vLabel,
        });
        // newVal = newRows[0][this.valueField];
      } else {
        // newVal = newRows.map((i) => i[this.valueField]);
      }

      // const newRows = this.$refs.table.getSelected();

      // let newVal = null;

      // if (!this.multiple) {
      //   newVal = newRows[0][this.valueField];
      // } else {
      //   newVal = newRows.map((i) => i[this.valueField]);
      // }

      // cb({
      //   value: newVal,
      //   rows: newRows,
      // });
    },

    cancel(cb) {
      cb();
    },
  },
};
</script>

<style lang="scss">
@import "~@/styles/variables.scss";

.table-select {
  height: 100%;
  padding: $gutter;
  background: $bgColorLight;

  .table-select__tag {
    display: block;
    border: none;
    line-height: 30px;
    height: 30px;
    position: relative;
    color: #666;
    font-size: 14px;

    .el-icon-close {
      position: absolute;
      right: 8px;
      top: 50%;
      width: 18px;
      height: 18px;
      line-height: 18px;
      transform: translateY(-50%);
      // font-weight: bold;
      font-size: 14px;
      color: #666;
      transition: all 0.1s ease;
      &:hover {
        background: rgba($colorPrimary, 0.7);
        color: #fff;
      }
    }
  }
}
</style>