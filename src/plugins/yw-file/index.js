import FileViewer from './components/FileViewer';
import FileUploader from './components/FileUploader';

export default {
    install: (Vue, opt) => {

        const __proto = Vue.prototype;

        Vue.component(FileUploader.name, FileUploader);
        Vue.component(FileViewer.name, FileViewer);

        //上传文件方法
        __proto.$uploadFile = (options) => {

            const { fileList, height = "700px" } = options;

            __proto.$modal({
                title: "附件上传",
                component: FileUploader,
                height,
                data: {
                    value: fileList,
                    height: "100%"
                },
                btns: [
                    {
                        name: '上传',
                        type: 'primary',
                        icon: 'el-icon-upload',
                        method: 'toUpload',
                        callback() {

                        }
                    },
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

        //查看文件方法
        __proto.$viewFile = (options) => {
            const { fileList, height = "700px" } = options;

            __proto.$modal({
                title: "附件查看",
                height,
                component: FileViewer,
                data: {
                    fileList,
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