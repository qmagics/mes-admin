import FxTable from './FxTable.vue';

FxTable.install = (Vue, opt) => {
    Vue.component('YwTable', FxTable);

    const { presetActions, defaultOptions, presetColumnRenderers, presetRowStates, axios } = opt || {};

    //覆盖表格默认的配置项，可以提供自定义的初始展现形式
    Vue.__FxTable_defaultOptions = defaultOptions;

    //注册全局默认的action，可以简化配置项，对于多数页面都有的简单通用的操作，诸如增、删、改、查、导入、导出、打印、复制...，可以通过此配置来简化逻辑和缩减代码量
    Vue.__FxTable_presetActions = presetActions;

    //注册全局默认的tableColumn渲染器，对于大多数通用的单元格显示格式，诸如链接、图片、输入框、进度条..., 可以通过此配置来简化逻辑和缩减代码量
    Vue.__FxTable_presetColumnRenderers = presetColumnRenderers;

    //注册全局默认行状态
    Vue.__FxTable_presetRowStates = presetRowStates;

    //自定义axios实例
    Vue.__FxTable_axios = axios;
}

export default FxTable;

export { default as FxTableColumn } from './components/FxTableColumn.vue';