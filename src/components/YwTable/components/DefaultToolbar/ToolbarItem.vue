<script>
const renderMap = {
  //默认查询输入框
  query(h) {
    const { cOptions, searchModel, refreshTable, $slots } = this.$fxTable;

    if ($slots.query) return <div class="toolbar-item">{$slots.query}</div>;

    return (
      <div class="toolbar-item">
        <el-input
          style="width:200px;"
          v-model={searchModel[cOptions.keywordProps.prop]}
          clearable
          placeholder={cOptions.keywordProps.placeholder}
          on-keyup
          vOn:input={refreshTable}
          vOn:keyup_native_enter={refreshTable}
        />
        <el-button
          style="margin-left:5px;"
          type="primary"
          icon="el-icon-search"
          vOn:click={this.$fxTable.refreshTable}
        >
          查询
        </el-button>
      </div>
    );
  },

  //高级搜索按钮
  superSearchBtn() {
    if (!this.$fxTable.$slots.superQuery) return null;
    return (
      <el-button
        onclick={this.$fxTable.toggleSuperSearchbar}
        class="toolbar-item"
        icon="el-icon-document-copy"
      >
        更多
      </el-button>
    );
  },

  // //搜索按钮
  // searchBtn() {
  //   // return (
  //   //   <el-button
  //   //     class="toolbar-item"
  //   //     type="primary"
  //   //     icon="el-icon-search"
  //   //     vOn:click={this.$fxTable.refreshTable}
  //   //   >
  //   //     搜索
  //   //   </el-button>
  //   // );
  // },

  //搜索栏显示切换按钮
  searchbarToggle(h) {
    const { toggleSearchbarVisible } = this.$fxTable;
    return (
      <el-button class="toolbar-item" vOn:click={toggleSearchbarVisible}>
        <svg-icon iconClass="cog"></svg-icon>
      </el-button>
    );
  },

  //表格列切换控件
  columnToggle(h) {
    const { vColumns } = this.$fxTable;
    return <ColumnToggle class="toolbar-item" columns={vColumns} />;
  },

  //全屏按钮
  fullScreen(h) {
    const { fullScreen, toggleFullScreen } = this.$fxTable;

    return (
      <el-button
        class="toolbar-item"
        type="text"
        vOn:click={toggleFullScreen}
        icon={fullScreen ? "el-icon-copy-document" : "el-icon-full-screen"}
      ></el-button>
    );
  },

  //表格操作栏
  builtInActions(h) {
    const { cActions, runAction } = this.$fxTable;

    return cActions.map((action) => {
      const { code } = action;
      return (
        <ActionRenderer
          class="toolbar-item"
          key={code}
          action={action}
          handler={runAction}
        ></ActionRenderer>
      );
    });
  },

  //自定义操作
  actions(h) {
    return <div class="toolbar-item">{this.$fxTable.$slots.actions}</div>;
  },

  //分隔符
  spliter(h) {
    return <i class="toolbar-item toolbar-item-spliter"></i>;
  },
};

import ColumnToggle from "../ColumnToggle";
import ActionRenderer from "../ActionRenderer";

export default {
  components: {
    ColumnToggle,
    ActionRenderer,
  },
  props: {
    type: {},
  },

  inject: ["$fxTable"],

  render(h) {
    let { type } = this;
    type = type === "|" ? "spliter" : type;

    return renderMap[type] && renderMap[type].call(this, h);
  },
};
</script>