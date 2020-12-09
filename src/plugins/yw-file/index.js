import FileTable from './components/FileTable';
import FileImporter from './components/FileImporter';
import FileUploader from './components/FileUploader';
import { deepClone } from '@/utils';

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
         * request         导出数据的请求方法，存在则忽略api {Function}       
         * api             导出数据的请求接口地址 {String}       
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
                resHandler,
                columnFilter,
                configurable = true
            } = options;

            let export_rows = deepClone(data),
                export_columns = deepClone(columns);

            //导出列过滤
            export_columns = export_columns.filter(columnFilter || defaultColumnFilter);

            //指定请求方法或者api接口导出
            if (request || api) {

            }

            //指定数据集导出
            else if (data && data.length) {
                if (configurable) {
                    const m = __proto.$modal({
                        title: '导出设置',
                        width: '460px',
                        height: '600px',
                        component: () => import('./components/ExportExcelConfig'),
                        data: {
                            exportOptions: {
                                fileName,
                                columns: export_columns,
                            }
                        },
                        btns: [
                            {
                                name: '确认导出',
                                type: 'primary',
                                method: 'confirm',
                                callback(vm) {
                                    const { fileName, columns } = vm;
                                    startExportExcel({
                                        fileName,
                                        columns,
                                        rows: export_rows,
                                    });
                                    m.close();
                                }
                            },
                            {
                                name: '取消'
                            }
                        ]
                    });
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

    }
}

//导出列默认过滤函数
function defaultColumnFilter(i) {
    const bl = i.export !== false;
    i.export = true;
    return bl;
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