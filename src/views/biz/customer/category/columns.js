export default function getColumns(_this) {
    return [
        {
            label: "分类名称",
            prop: "Code",
            render: [
                "link",
                {
                    routeName: "Biz_CustomerCategory_View",
                    idField: _this.rowKey,
                    textField: "FullName",
                },
            ],
        },
        {
            label: "分类编码",
            prop: "Code",
        }
    ]
}