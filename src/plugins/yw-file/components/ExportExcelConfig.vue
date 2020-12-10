<template>
  <div class="export-excel-confirm">
    <el-form :model="vm" :rules="rules">
      <el-form-item label="文件名称" prop="fileName">
        <el-input
          v-model="vm.fileName"
          placeholder="请输入导出后的文件名"
        ></el-input>
      </el-form-item>
      <el-form-item
        label="附带查询条件"
        prop="exportInquired"
        v-if="showExportInquired"
      >
        <el-switch
          v-model="vm.exportInquired"
          :active-value="true"
          :inactive-value="false"
        ></el-switch>
      </el-form-item>
      <el-form-item label="导出的列" prop="columns">
        <el-table :data="vm.columns" border @row-click="onRowClick">
          <el-table-column label="导出字段" prop="label"></el-table-column>
          <el-table-column
            align="center"
            width="100px"
            label="是否导出"
            prop="export"
          >
            <template #header>
              <el-checkbox
                @change="isExportAllChange"
                v-model="isExportAll"
                :indeterminate="isIndeterminate"
              ></el-checkbox>
            </template>
            <template v-slot="{ row }">
              <el-checkbox
                @change="rowExportChange"
                @click.native.stop
                v-model="row.export"
              ></el-checkbox>
            </template>
          </el-table-column>
        </el-table>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { deepClone } from "@/utils";
export default {
  name: "ExportExcelConfig",

  props: {
    exportOptions: {},
    showExportInquired: Boolean,
  },

  data() {
    const { fileName, columns, exportInquired } = this.exportOptions;
    return {
      isExportAll: true,

      isIndeterminate: false,

      vm: {
        columns: deepClone(columns),

        fileName: fileName,

        exportInquired: exportInquired,
      },

      rules: {
        fileName: { required: true, message: "文件名不得为空" },
      },
    };
  },

  watch: {
    exportOptions: {
      deep: true,
      handler(val) {
        const { fileName, columns, exportInquired } = val;

        this.vm.fileName = fileName;
        this.vm.columns = deepClone(columns);
        this.vm.exportInquired = deepClone(exportInquired);
      },
    },
  },

  methods: {
    confirm(cb) {
      cb && cb.call(null, this.vm);
    },
    onRowClick(row) {
      row.export = !row.export;
      this.rowExportChange();
    },
    rowExportChange() {
      const arr = this.vm.columns;
      const isIndeterminate =
        arr.some((i) => i.export === true) &&
        arr.some((i) => i.export === false);

      const isExportAll = arr.every((i) => i.export === true);

      this.isIndeterminate = isIndeterminate;
      this.isExportAll = isExportAll;
    },
    isExportAllChange(val) {
      this.vm.columns.forEach((i) => (i.export = val));
      this.isIndeterminate = false;
    },
  },
};
</script>

<style lang="scss">
@import "@/styles/variables";
.export-excel-confirm {
  .el-table {
    width: 100%;

    th {
      color: $colorPrimary !important;
    }
  }
}
</style>