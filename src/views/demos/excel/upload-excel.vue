<template>
  <div class="app-container">
    <el-row>
      <el-col :span="24">
        <h2>快快快</h2>
        <upload-excel-component
          :on-success="handleSuccess1"
          :before-upload="beforeUpload"
        />
      </el-col>

      <el-col :span="24">
        <h2>另一个</h2>
        <upload-excel-component
          :on-success="handleSuccess2"
          :before-upload="beforeUpload"
        />
      </el-col>
    </el-row>

    <el-row style="margin-top: 40px; text-align: center">
      <el-col>
        <el-button @click="calc" type="primary">计算</el-button>
      </el-col>
    </el-row>

    <div>
      结果1
      <pre>{{ result1 }}</pre>
    </div>

    <div>
      结果2
      <pre>{{ result2 }}</pre>
    </div>

    <!-- <el-table
      :data="tableData"
      border
      highlight-current-row
      style="width: 100%; margin-top: 20px"
    >
      <el-table-column
        v-for="item of tableHeader"
        :key="item"
        :prop="item"
        :label="item"
      />
    </el-table> -->
  </div>
</template>

<script>
import UploadExcelComponent from "@/components/UploadExcel/index.vue";

export default {
  name: "UploadExcel",
  components: { UploadExcelComponent },
  data() {
    return {
      tableData: [],
      tableHeader: [],

      DF: [],
      JF: [],
      JJJE: [],
      JJJE_FU: [],
      JJJE_ZHEN: [],

      result1: [],
      result2: [],
    };
  },
  methods: {
    beforeUpload(file) {
      const isLt1M = file.size / 1024 / 1024 < 1;

      if (isLt1M) {
        return true;
      }

      this.$message({
        message: "Please do not upload files larger than 1m in size.",
        type: "warning",
      });
      return false;
    },

    handleSuccess1({ results, header }) {
      // this.tableData = results;
      // this.tableHeader = header;

      //excel1

      const DF = results.map((i) => i["贷方"]).filter((i) => i != 0);
      DF.sort((a, b) => a - b);

      const JF = results.map((i) => i["借方"]).filter((i) => i != 0);
      JF.sort((a, b) => a - b);

      console.log(DF, JF);
      this.DF = DF;
      this.JF = JF;
    },

    handleSuccess2({ results, header }) {
      //excel2

      const JJJE = results
        .map((i) => i["交易金额[ Trade Amount ]"])
        .filter((i) => i != 0);
      JJJE.sort((a, b) => a - b);

      console.log(JJJE);
      this.JJJE = JJJE;

      this.JJJE_FU = JJJE.filter((i) => i < 0).map((i) => Math.abs(i));
      this.JJJE_ZHEN = JJJE.filter((i) => i > 0).map((i) => Math.abs(i));
    },

    calc() {
      let result1 = [];
      let result2 = [];

      console.log(this.JJJE_FU);
      console.log(this.DF);

      //1
      for (let index = this.JJJE_FU.length; index < 0; index--) {
        let i = this.JJJE_FU[index];

        if (this.DF.indexOf(i) >= 0) {
          this.JJJE_FU.splice(index, 1);
          this.DF.splice(this.DF.indexOf(i), 1);
        }
      }

      //2
      this.JJJE_ZHEN.forEach((i, index) => {
        if (this.JF.indexOf(i) >= 0) {
          this.JJJE_ZHEN.splice(index, 1);
          this.JF.splice(this.JF.indexOf(i), 1);
        }
      });

      this.result1 = [...this.JJJE_FU, ...this.DF];
      this.result2 = [...this.JJJE_ZHEN, ...this.JF];
    },
  },
};
</script>
