<template>
  <yw-table
    class="file-table"
    :data.sync="tableData"
    :columns="tableColumns"
    :options="tableOptions"
  ></yw-table>
</template>

<script>
export default {
  props: {
    fileList: {},
    height: {
      default: "500px",
    },
  },

  data() {
    const _this = this;
    return {
      tableData: this.fileList,
      tableColumns: [
        {
          label: "缩略图",
          prop: "FileThumb",
        },
        {
          label: "文件名称",
          prop: "FileName",
          render(h, { row }) {
            return <el-input v-model={row.FileName}></el-input>;
          },
        },
        {
          label: "文件路径",
          prop: "FilePath",
        },
        {
          label: "文件原名称",
          prop: "SourceFileName",
        },
        {
          label: "操作",
          prop: "",
          width: 100,
          align: "center",
          render(h, { row }) {
            return <el-button type="text" icon="el-icon-delete"></el-button>;
          },
        },
      ],
      tableOptions: {
        toolbar: false,
        pagination: false,
        selectable: false,
        height: _this.height,
        padding: 0,
      },
    };
  },

  watch: {
    fileList: {
      deep: true,
      handler(val) {
        this.tableData = val;
      },
    },
    tableData: {
      deep: true,
      handler(val) {
        this.$emit("update:fileList", val);
      },
    },
  },
};
</script>

<style lang="scss">
.file-table {
  .el-icon-delete {
    font-size: 18px;
  }
}
</style>