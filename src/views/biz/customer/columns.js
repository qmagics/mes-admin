export default function getColumns(_this) {
    return [
        {
            label: "客户编码",
            prop: "Code",
            render: [
                "link",
                {
                    routeName: "Biz_Customer_View",
                    idField: _this.rowKey,
                    textField: "Code",
                },
            ],
        },
        {
            label: "客户名称",
            prop: "FullName",
        }
    ]
}