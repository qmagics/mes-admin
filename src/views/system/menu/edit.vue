<template>
  <page ref="page" width="60%" :fixed="false" v-loading="loading">
    <title-block> 编辑菜单 </title-block>
    <detail ref="form" type="edit" :data.sync="vm"></detail>
    <fixed-block>
      <el-button @click="save" type="primary" :loading="saving">确认</el-button>
      <el-button @click="cancel">关闭</el-button>
    </fixed-block>
  </page>
</template>

<script>
import { getMenuDetail, updateMenu } from "@/api/system/menu";
import detail from "./detail";

export default {
  name: "System_Menu_Edit",

  components: {
    detail,
  },
  props: {
    id: {},
  },

  data() {
    return {
      loading: false,
      saving: false,
      vm: {},
    };
  },

  mounted() {
    this.loading = true;

    getMenuDetail(this.id)
      .then((res) => {
        if (res.bl) {
          this.vm = res.data.rows[0];

          this.$refs.page.setTagName(`{0} - ${this.vm.Name}`);
        }
      })
      .finally(() => {
        this.loading = false;
      });
  },

  methods: {
    save() {
      this.$refs.form.validate().then((pass) => {
        this.saving = true;
        updateMenu(this.vm)
          .then((res) => {
            if (res.bl) {
              this.$message(res.msg);
              setTimeout(() => {
                this.$close();
                this.$open("System_Menu_List", true);
              }, 500);
            }
          })
          .finally(() => {
            this.saving = false;
          });
      });
    },
    cancel() {
      this.$close();
    },
  },
};
</script>