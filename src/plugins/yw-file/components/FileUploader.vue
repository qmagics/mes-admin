<template>
  <fixed-panel class="file-uploader">
    <div class="file-uploader__toolbar" v-if="!uploadDisabled">
      <div class="file-uploader__handler">
        <el-button
          id="uppy_dashboard_trigger"
          type="primary"
          plain
          :disabled="uploadDisabled"
          icon="el-icon-upload"
          @click="importFile"
          >上传附件</el-button
        >
      </div>
      <div class="file-uploader__tips">
        <i class="el-icon-info color-warning"></i>&nbsp;
        <span>{{ cOptions.tips }}</span>
      </div>
    </div>
    <div class="file-uploader__list">
      <FileTable
        :fileList.sync="fileList"
        :disabled="uploadDisabled"
      ></FileTable>
    </div>
  </fixed-panel>
</template>

<script>
const DEFAULT_OPTIONS = {
  tips: "支持上传 jpg，png，doc，docx，xls，xlsx，pdf，zip，rar 格式的文件",
  allowed: [
    "image/*",
    "video/*",
    ".pdf",
    ".xlsx",
    ".xls",
    ".doc",
    ".docx",
    ".zip",
    ".rar",
    ".7z",
  ],
  min: 1,
  max: 20,
  size: 5 * 1000 * 1000 /* 5M */,
};

export default {
  name: "FileUploader",

  inject: {
    elForm: {
      default: "",
    },
    elFormItem: {
      default: "",
    },
  },

  props: {
    value: {},
    disabled: Boolean,
    options: {},
  },

  data() {
    return {
      fileList: this.value,
      uppy: null,
    };
  },

  watch: {
    value: {
      deep: true,
      handler(val) {
        this.fileList = val;
      },
    },
    fileList: {
      deep: true,
      handler(val) {
        this.$emit("input", val);
      },
    },
  },

  computed: {
    uploadDisabled() {
      return this.disabled || (this.elForm || {}).disabled;
    },
    cOptions() {
      return { ...DEFAULT_OPTIONS, ...this.options };
    },
  },

  methods: {
    importFile() {
      this.$importFile(this.cOptions).then((addingFileList) => {
        this.fileList = [...this.fileList, ...addingFileList];
      });
    },
  },

  mounted() {},
};
</script>

<style lang="scss">
.file-uploader {
  .file-uploader__toolbar {
    display: flex;
    align-items: center;
    // justify-content: space-between;
    .file-uploader__tips {
      margin-left: 20px;
      color: #999;
    }
  }

  .file-uploader__list {
    margin-top: 10px;
  }
}
</style>