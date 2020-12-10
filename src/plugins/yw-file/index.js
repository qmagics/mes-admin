import FileTable from './components/FileTable';
import FileImporter from './components/FileImporter';
import FileUploader from './components/FileUploader';
import { deepClone } from '@/utils';
import axiosRequest from '@/utils/request';

export default {
    install: (Vue, opt) => {

        const __proto = Vue.prototype;

        /**
         * 导入文件方法（纯上传功能，不附带v-model文件列表显示）
         * @param {*} options 
         */
        __proto.$importFile = (options) => {

            const { height = "700px" } = options || {};

            return new Promise((resolve, reject) => {
                const m = __proto.$modal({
                    title: "文件上传",
                    component: FileImporter,
                    height,
                    data: options,
                    btns: [
                        // {
                        //     name: '上传',
                        //     type: 'primary',
                        //     icon: 'el-icon-upload',
                        //     method: 'toUpload',
                        //     callback() {

                        //     }
                        // },
                        {
                            name: '确认',
                            type: 'primary',
                            method: 'confirm',
                            callback(data) {
                                m.close();
                                resolve(data);
                            }
                        },
                        {
                            name: '取消',
                            // method: 'cancel',
                            // callback() {
                            //     m.close();
                            // }
                        }
                    ]
                });
            });

        }

        /**
         * 上传文件方法
         * @param {object} options 
         */
        __proto.$uploadFile = (options) => {

            const { value, height = "700px", title, onConfirm } = options || {};

            const m = __proto.$modal({
                title: title || "文件上传",
                component: FileUploader,
                height,
                data: {
                    value,
                    options: {
                    },
                    disabled: false,
                },
                btns: [
                    {
                        name: '确认',
                        type: 'primary',
                        method: 'confirm',
                        callback(value) {
                            onConfirm && onConfirm.call(null, value);
                            m.close();
                        }
                    },
                    {
                        name: '取消',
                    }
                ]
            });
        }

        /**
         * 查看文件方法
         * @param {object} options 
         */
        __proto.$viewFile = (options) => {
            const { fileList, height = "700px" } = options;

            const m = __proto.$modal({
                title: "文件查看",
                height,
                component: FileTable,
                data: {
                    fileList,
                    disabled: true,
                    height: "100%"
                },
                btns: [
                    {
                        name: '确认',
                        type: 'primary',
                        method: 'confirm',
                        callback() {
                            m.close();
                        }
                    },
                    {
                        name: '取消'
                    }
                ]
            });
        }

        /**
         * 导出Excel
         * @param {object} options 
         * fileName        导出的文件名 {String}             - 默认值: 'Excel文件'
         * columns         导出的Excel文件包含的列 {Array}
         * data            数据集 {Array}             
         * request         导出数据的请求方法，存在则忽略api和method {Function}       
         * exportInquired  导出带查询条件之后的数据 {Boolean}    - 默认值: true 用户可在配置面板中修改
         * query           导出数据的请求参数，在 exportInquired=true 时，request请求中会将该对象作为查询参数，否则，忽略这个参数 {Object}   
         * api             导出数据的请求接口地址 {String}       - 默认值: 'get'
         * method          导出数据的请求接口类型 {String}       
         * resHandler      请求结果处理函数 {Function}       
         * columnFilter    导出列过滤函数 {Function}       
         */
        __proto.$exportExcel = (options) => {
            const {
                columns,
                fileName = 'Excel文件',
                data,
                request,
                api,
                method = "get",
                query,
                exportInquired = true,
                resHandler,
                columnFilter,
                configurable = true
            } = options;

            let export_rows = data ? deepClone(data) : [],
                export_columns = deepClone(columns);

            //导出列过滤
            export_columns = export_columns.filter(columnFilter || defaultColumnFilter);
            export_columns.forEach(i => i.export = true);

            //指定请求方法或者api接口导出
            if (request || api) {
                configExportExcelOptions({
                    fileName,
                    columns: export_columns,
                    exportInquired
                })
                    .then(newOptions => {
                        const { fileName, columns, exportInquired } = newOptions;

                        const _query = exportInquired ? query : {};

                        const promise = request ? request(_query) : axiosRequest[method](api, _query);

                        promise.then(res => {
                            export_rows = res.data.rows;

                            startExportExcel({
                                fileName,
                                columns,
                                rows: export_rows,
                            });
                        });
                    })
            }

            //指定数据集导出
            else if (data && data.length) {
                if (configurable) {
                    configExportExcelOptions({
                        fileName,
                        columns: export_columns,
                    }, false)
                        .then(newOptions => {
                            const { fileName, columns } = newOptions;
                            startExportExcel({
                                fileName,
                                columns,
                                rows: export_rows,
                            });
                        })
                }
                else {
                    startExportExcel({
                        fileName,
                        columns: export_columns,
                        rows: export_rows,
                    })
                }
            }
        }


        /**
         * 导出Zip
         * @param {object} options 
         */
        __proto.$exportZip = (options) => {

        }

        /**
         * 自定义导出选项
         * @param {Object} exportOptions 导出配置项 {fileName,columns,exportInquired} 
         * @param {Boolean} showExportInquired 是否显示 附带查询条件 修改控件
         */
        function configExportExcelOptions(exportOptions, showExportInquired = true) {
            return new Promise((resolve) => {
                const m = __proto.$modal({
                    title: '导出设置',
                    width: '460px',
                    height: '600px',
                    component: () => import('./components/ExportExcelConfig'),
                    data: {
                        exportOptions: exportOptions,
                        showExportInquired
                    },
                    btns: [
                        {
                            name: '确认导出',
                            type: 'primary',
                            method: 'confirm',
                            callback(vm) {
                                resolve(vm);
                                m.close();
                            }
                        },
                        {
                            name: '取消'
                        }
                    ]
                });
            });


        }

    }
}

//导出列默认过滤函数
function defaultColumnFilter(i) {
    return i.export !== false;
}

/**
 * 开始导出
 * @param {object} exportOptions 导出配置项
 */
function startExportExcel(exportOptions) {
    import('@/vendor/Export2Excel').then(excel => {
        excel.default(exportOptions);
    })
}

