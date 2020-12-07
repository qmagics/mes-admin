<template>
  <div class="file-uploader">
    <div class="file-uploader__toolbar" v-if="!uploadDisabled">
      <div class="file-uploader__handler">
        <el-button
          id="uppy_dashboard_trigger"
          type="primary"
          plain
          :disabled="uploadDisabled"
          icon="el-icon-upload"
          @click="openDashboard"
          >上传附件</el-button
        >
      </div>
      <div class="file-uploader__tips">
        <i class="el-icon-info color-warning"></i>
        支持jpg，png，word，excel，pdf格式
      </div>
    </div>
    <div class="file-uploader__dashboard">
      <div ref="uppyDashboard"></div>
      <!-- <Dashboard :uppy="uppy"></Dashboard> -->
    </div>
    <div class="file-uploader__list">
      <FileViewer :fileList.sync="value"></FileViewer>
    </div>
  </div>
</template>

<script>
import Uppy from "@uppy/core";
import XHRUpload from "@uppy/xhr-upload";
import Dashboard from "@uppy/dashboard";
import ImageEditor from "@uppy/image-editor";
import "@uppy/core/dist/style.css";
import "@uppy/dashboard/dist/style.css";
import "@uppy/image-editor/dist/style.css";

//默认配置项
const DEFAULT_OPTIONS = {
  height: "700px",
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
      uppy: null,
    };
  },

  computed: {
    uploadDisabled() {
      return this.disabled || (this.elForm || {}).disabled;
    },
  },

  methods: {
    openDashboard() {
      this.uppy.getPlugin("Dashboard").openModal();
    },
  },

  mounted() {
    this.$nextTick(() => {
      this.uppy = new Uppy()
        .use(Dashboard, {
          // inline: true,
          // trigger: "#uppy_dashboard_trigger",
          target: this.$refs.uppyDashboard,
          locale: {
            strings: this.$t("uppy.dashboard"),
          },
        })
        .use(ImageEditor, { target: Dashboard })
        .use(XHRUpload, {
          endpoint: "/api/BizCustomer",
        });
    });
  },
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