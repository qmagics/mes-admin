<template>
  <el-form
    ref="form"
    :model="vm"
    label-width="100px"
    :disabled="disabled"
    :rules="disabled ? null : rules"
  >
    <el-row :gutter="120">
      <el-col :span="12">
        <el-form-item label="客户名称" prop="FullName">
          <el-input v-model="vm.FullName" clearable></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="客户简称" prop="ShortName">
          <el-input v-model="vm.ShortName" clearable></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="客户编码" prop="Code">
          <el-input v-model="vm.Code" clearable></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="所属分类" prop="ParentId">
          <el-cascader
            v-model="vm.ParentId"
            placeholder="请选择上级分类"
            :options="parentSelections"
            :props="{
              label: 'FullName',
              value: 'CustomerId',
              children: 'children',
              emitPath: false,
              checkStrictly: true,
              expandTrigger: 'hover',
            }"
            filterable
          ></el-cascader>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="联系人" prop="Contact">
          <el-input v-model="vm.Contact" clearable></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="联系电话" prop="ContactPhone">
          <el-input v-model="vm.ContactPhone" clearable></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="24">
        <el-form-item label="附件" prop="AttachmentList">
          <!-- <div
            id="select-files"
            style="width: 100%; height: 600px; background: #f3f3f3"
          /> -->
          <FileTable :fileList.sync="fileList"></FileTable>
        </el-form-item>
      </el-col>
    </el-row>
  </el-form>
</template>

<script>
import form from "@/mixins/form";
import { getCustomerCategorySelect } from "@/api/biz/customer";
import { getTreeByArr } from "@/utils/structure";
import FileTable from "@/plugins/yw-global/components/FileTable.vue";

// import Uppy from "@uppy/core";
// import XHRUpload from "@uppy/xhr-upload";
// import Dashboard from "@uppy/dashboard";
// import "@uppy/core/dist/style.css";
// import "@uppy/dashboard/dist/style.css";

export default {
  props: {
    type: String,
    data: {},
  },

  components: {
    FileTable,
  },

  mixins: [form],

  data() {
    return {
      fileList: [
        {
          AttachmentId: "1111",
          FileName: "图片1",
          FilePath: "/file/1111.png",
          FileThumb: "/file/1111-thumb.png",
          SourceFileName: "图片1原原始名称",
        },
        {
          AttachmentId: "2222",
          FileName: "图片2",
          FilePath: "/file/2222.png",
          FileThumb: "/file/2222-thumb.png",
          SourceFileName: "图片2原原始名称",
        },
        {
          AttachmentId: "3333",
          FileName: "文本1",
          FilePath: "/file/3333.txt",
          FileThumb: "/file/3333-thumb.txt",
          SourceFileName: "文本1原始名称",
        },
      ],
      parentSelections: [],

      vm: this.data,
      rules: {
        Code: { required: true, message: "请输入客户编码" },
        FullName: { required: true, message: "请输入客户名称" },
        ShortName: { required: true, message: "请输入客户简称" },
        ParentId: { required: true, message: "请选择所属分类" },
        Contact: { required: true, message: "请输入联系人" },
        ContactPhone: { required: true, message: "请输入联系电话" },
      },
    };
  },

  computed: {
    disabled() {
      return this.type === "view";
    },
  },

  watch: {
    data: {
      deep: true,
      handler(val) {
        this.vm = val;
      },
    },
    vm: {
      deep: true,
      handler(val) {
        this.$emit("update:data", val);
      },
    },
  },

  methods: {
    //刷新上级分类选项
    async refreshSelection(CustomerId) {
      const { data, bl } = await getCustomerCategorySelect({
        CustomerId,
      });
      if (bl) {
        this.parentSelections = getTreeByArr(
          data.rows,
          null,
          "CustomerId",
          "ParentId"
        );
      }
    },
  },

  mounted() {
    this.refreshSelection();

    // const uppy = new Uppy()
    //   .use(Dashboard, {
    //     inline: true,
    //     width: "100%",
    //     height: "600px",
    //     target: "#select-files",
    //     trigger: "#select-files",
    //   })
    //   .use(XHRUpload, { endpoint: "https://api2.transloadit.com" });

    // uppy.on("complete", (result) => {
    //   console.log(
    //     "Upload complete! We’ve uploaded these files:",
    //     result.successful
    //   );
    // });

    // let img = new Image();

    // img.src =
    //   "https://camo.githubusercontent.com/eb2b756523719966c39b1a61527c4de73cbf2b6f7acf67c743ec32c5760445b6/68747470733a2f2f757070792e696f2f696d616765732f6c6f676f732f757070792d6c6f676f2d323031392e737667";

    // uppy.addFile({
    //   name: "my-file.jpg", // file name
    //   type: "image/jpeg", // file type
    //   data: create, // file blob
    //   meta: {
    //     // optional, store the directory path of a file so Uppy can tell identical files in different directories apart
    //   },
    //   // source: "Local", // optional, determines the source of the file, for example, Instagram
    //   // isRemote: false, // optional, set to true if actual file is not in the browser, but on some remote server, for example, when using companion in combination with Instagram
    // });
  },
};
</script>

<style>
</style>