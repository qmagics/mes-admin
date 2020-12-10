export default {
    methods: {
        /**
         * 导出为Excel文件
         * @param {string} fileName 导出的文件名 
         * @param {boolean} isExportCurrentData 是否只导出当前表格数据
         */
        exportExcel(fileName, isExportCurrentData = false) {

            const { tableData, cOptions, vColumns, searchModel } = this;

            const exportOptions = {
                fileName: fileName,
                columns: vColumns,
            };

            if (!isExportCurrentData) {
                const { request, api } = cOptions;
                exportOptions.request = request;
                exportOptions.api = api;
                exportOptions.query = searchModel;
            }
            else {
                exportOptions.data = tableData;
            }

            this.$exportExcel(exportOptions);
        }
    }
}