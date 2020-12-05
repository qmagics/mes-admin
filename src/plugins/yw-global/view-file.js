export default {
    install: (Vue, opt) => {


        Vue.prototype.$viewFile = (options) => {
            const { fileList, height = "700px" } = options;

            Vue.prototype.$modal({
                title: "附件",
                height,
                component: () => import('./components/FileTable'),
                data: {
                    fileList,
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

    }
}