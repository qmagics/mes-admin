import FileTable from './components/FileTable';
import FileImporter from './components/FileImporter';
import FileUploader from './components/FileUploader';

export default {
    install: (Vue, opt) => {

        const __proto = Vue.prototype;

        Vue.component(FileUploader.name, FileUploader);
        Vue.component(FileTable.name, FileTable);

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

            const { value, height = "700px", request } = options || {};

            const m = __proto.$modal({
                title: "文件上传",
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
                        callback() {
                            request && request.call();
                            m.close();
                        }
                    },
                    {
                        name: '取消',
                    }
                ]
            });
        }

        //查看文件方法
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

    }
}