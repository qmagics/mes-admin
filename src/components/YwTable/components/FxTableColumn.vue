<template>
  <el-table-column
    :prop="column.children && column.children.length ? '' : column.prop"
    :label="column.label"
    :type="column.type"
    :sortable="column.sortable ? 'custom' : false"
    :resizable="column.resizable"
    :show-overflow-tooltip="column.showOverflowTooltip === false ? false : true"
    :align="column.align"
    :header-align="column.headerAlign"
    :width="column.width"
    :min-width="column.minWidth"
    :fixed="column.fixed"
    :formatter="column.formatter"
    :key="Math.random()"
  >
    <template v-slot="{ row }">
      <!-- 插槽渲染 -->
      <slot
        v-if="$scopedSlots.default"
        v-bind="{ row, column, value: row[column.prop] }"
      ></slot>

      <!-- 配置项渲染 -->
      <template v-else>
        <!-- component -->
        <component
          v-if="column.component"
          :is="column.component"
          v-bind="column.componentProps"
          v-model="row[column.prop]"
          :row="row"
          :column="column"
          :currentRow="currentRow"
        ></component>
        <!-- render -->
        <renderComp
          v-else-if="column.render"
          :p-render="render"
          :render="column.render"
          :renderArgs="column.renderArgs"
          :context="{ value: row[column.prop], row, column }"
        ></renderComp>
        <!-- formatter -->
        <span
          v-else-if="column.formatter"
          v-html="column.formatter(row[column.prop], row)"
        ></span>
        <!-- normal -->
        <span v-else>{{ row[column.prop] }}</span>
      </template>

      <template v-if="column.children && column.children.length">
        <FxTableColumn
          v-for="(i, index) in column.children"
          :column="i"
          :key="i.prop + index"
        ></FxTableColumn>
      </template>
    </template>
  </el-table-column>
</template>

<script>
import Vue from "vue";
import { isArray, isNotEmpty } from "../utils";

function getRenderFn(obj) {
  if (typeof obj === "string") {
    return Vue.__FxTable_presetColumnRenderers[obj];
  }
  return obj;
}

const renderComp = {
  props: {
    render: [Function, String, Array, Object],
    renderArgs: {},
    pRender: Function,
    context: {},
  },
  render(h) {
    let renderFn = null,
      renderArgs = this.renderArgs;

    //render:string
    if (typeof this.render === "string") {
      renderFn = getRenderFn(this.render);
    }
    //render:function
    else if (typeof this.render === "function") {
      renderFn = this.render;
    }
    //render:array
    else if (isArray(this.render)) {
      renderFn = getRenderFn(this.render[0]);

      renderArgs = isNotEmpty(this.render[1]) ? this.render[1] : renderArgs;
    }
    //render:object
    else if (typeof this.render === "object" && this.render.name) {
      renderFn = getRenderFn(this.render.name);
      renderArgs = this.render.args;
    }

    return this.pRender && this.pRender(h, renderFn, this.context, renderArgs);
  },
};

export default {
  name: "FxTableColumn",

  props: {
    column: {},
    render: Function,
    currentRow: {},
  },

  components: {
    renderComp,
  },
};
</script>