import { deepClone } from "@/utils";

export default {
    install: (Vue, opt) => {

        /**
         * 开启弹窗输入框
         * @param {*} options 选项
         * title        窗口的标题 {string}             - 默认值: ''
         * width        窗口宽度 {string|number}        - 默认值: null
         * height       窗口高度 {string|number}        - 默认值: null
         * source       选项数据源 {array}              - 默认值: null
         * 提供 api或request 属性时，忽略source
         * columns      选项表格数据列 {array}           - 默认值: []
         * pagination   表格是否分页 {array}              - 默认值: false
         * multiple     是否可多选 {boolean}            - 默认值: false
         * api          表格数据源获取接口 {string}      -默认值: ''
         * request      表格获取数据请求方法 {function}   -默认值: null
         * 提供 request 方法时, 忽略api
         * valueField   选中项作为值的字段 {string}     -默认值：'value'
         * labelField   选中项作为名称的字段 {string}    -默认值：'label'
         */
        Vue.prototype.$modalInput = (options) => {
            const { title, width, height, source, columns, rowKey, pagination, keywordProps, multiple, api, request, valueField,
                labelField, selected } = options;

            return new Promise((resolve, reject) => {

                const m = Vue.prototype.$modal({
                    width,
                    height,
                    title: title || '请选择',
                    component: () => import('./components/TableSelect'),
                    data: {
                        source,
                        columns: columns || [],
                        multiple,
                        api,
                        rowKey,
                        request,
                        valueField,
                        labelField,
                        keywordProps,
                        pagination,
                        selected: selected ? deepClone(selected) : null,
                        tableHeight: height ? '100%' : 500
                    },
                    btns: [
                        {
                            name: '确认',
                            type: 'primary',
                            method: 'confirm',
                            callback(newVal, newRows) {
                                m.close();
                                resolve(newVal, newRows);
                            }
                        },
                        {
                            name: '取消',
                            method: 'cancel',
                            callback(msg) {
                                m.close();
                                if (msg) {
                                    reject(msg);
                                }
                            }
                        }
                    ]
                });

            })
        }

    }
}


//   this.$modal({
    //     title: "测试弹窗",
    //     // width:'600px',
    //     // height:'100%',
    //     component: () => import("@/views/system/permission/view"),
    //     btns: [
    //       {
    //         name: "按钮1",
    //         type: "primary",
    //         icon: "el-icon-check",
    //         // method: "btn1Handler",
    //       },
    //       {
    //         name: "按钮2",
    //         method: "btn2Handler",
    //       },
    //     ],
    //     actions: {
    //       confirm() {
    //         alert("confirm is emited");
    //       },
    //       cancel() {
    //         alert("cancel is emited");
    //       },
    //     },
    //   });