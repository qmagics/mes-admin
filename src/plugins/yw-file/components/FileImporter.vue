<template>
  <div class="file-importer">
    <div class="uppyDashboard" ref="uppyDashboard"></div>
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

export default {
  name: "FileImporter",

  data() {
    return {
      uppy: null,
      successList: [],
      failList: [],
    };
  },

  props: {
    allowed: Array,
    min: {
      type: Number,
      default: 1,
    },
    max: {
      type: Number,
      default: 20,
    },
    size: {
      type: Number,
      default: 5 * 1000 * 1000 /* 5M */,
    },
  },

  watch: {
    allowed: {
      deep: true,
      handler(val) {
        this.uppy.setOptions({
          restrictions: {
            allowed: val,
          },
        });
      },
    },
  },

  methods: {
    confirm(cb) {
      cb(this.successList);
    },

    // cancel(cb) {
    //   this.$confirm("还有文件未上传，是否确认关闭？").then(() => {
    //     cb();
    //   });
    // },

    initUppy() {
      const { allowed, min, max, size } = this;
      this.$nextTick(() => {
        this.uppy = new Uppy({
          autoProceed: false,
          restrictions: {
            maxFileSize: size,
            maxNumberOfFiles: max,
            minNumberOfFiles: min,
            allowedFileTypes: allowed,
          },
        })
          .use(Dashboard, {
            inline: true,
            width: "100%",
            height: "100%",
            // trigger: "#uppy_dashboard_trigger",
            target: this.$refs.uppyDashboard,
            hideCancelButton: true,
            doneButtonHandler: null,
            locale: {
              strings: this.$t("file.uppyDashboard"),
            },
          })
          .use(ImageEditor, { target: Dashboard })
          .use(XHRUpload, {
            endpoint: "https://api2.transloadit.com",
          })
          .on("upload-success", (file, res) => {
            // console.log("file", file);
            // console.log("res", res);

            const { type, size, name } = file;

            //这里可能需要换成正式接口res的返回结果
            const fileObj = {
              FileName: name,
              FilePath: `/upload/file/${name}`,
              FileThumb: `/upload/file/${name}-thumb.jpg`,
              FileSize: size,
              SourceFileName: name,
            };

            this.successList.push(fileObj);
          });
      });
    },
  },

  beforeDestroy() {
    this.uppy.close();
  },

  mounted() {
    this.initUppy();
  },
};
</script>

<style lang="scss">
.file-importer {
  height: 100%;
  .uppyDashboard {
    height: 100%;
    .uppy-Dashboard {
      height: 100%;
    }
  }
}
</style>