<template>
  <div class="file-viewer">
    <yw-table
      class="file-viewer__table"
      :data.sync="tableData"
      :columns="tableColumns"
      :options="tableOptions"
    ></yw-table>
  </div>
</template>

<script>
export default {
  name: "FileTable",

  props: {
    fileList: {},
    height: {
      default: "500px",
    },
    disabled: Boolean,
  },

  data() {
    const _this = this;
    return {
      tableData: this.fileList,
      tableOptions: {
        toolbar: false,
        pagination: false,
        selectable: false,
        height: _this.height,
        padding: 0,
      },
    };
  },
  computed: {
    tableColumns() {
      const _this = this;

      const columns = [
        {
          label: "缩略图",
          prop: "FileThumb",
          render: ["thumbnail", ["80px", "60px"]],
        },
        {
          label: "文件名称",
          prop: "FileName",
          // render(h, { row }) {
          //   return <el-input v-model={row.FileName}></el-input>;
          // },
        },
        {
          label: "文件路径",
          prop: "FilePath",
        },
        {
          label: "文件原名称",
          prop: "SourceFileName",
        },
      ];

      if (!this.disabled) {
        columns.push({
          label: "操作",
          prop: "",
          width: 100,
          align: "center",
          render(h, { row }) {
            return (
              <el-button
                type="text"
                icon="el-icon-delete"
                onclick={() => {
                  _this.deleteFile(row);
                }}
              ></el-button>
            );
          },
        });
      }

      return columns;
    },
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

  methods: {
    deleteFile(file) {
      this.$confirm(this.$t("file.confirmDeleteFile")).then(() => {
        const index = this.tableData.indexOf(file);
        this.tableData.splice(index, 1);
      });
    },
  },
};
</script>

<style lang="scss">
.file-viewer {
  height: 100%;
  .file-viewer__table {
  }
  .el-icon-delete {
    font-size: 18px;
  }
}
</style>