export default function getColumns(_this) {
    return [
        {
            label: "客户名称",
            prop: "FullName",
            render: [
                "link",
                {
                    routeName: "Biz_Customer_View",
                    idField: _this.rowKey,
                    textField: "FullName",
                },
            ],
        },
        {
            label: "客户简称",
            prop: "ShortName",
        },
        {
            label: "客户编码",
            prop: "Code",
        },
        {
            label: "联系人",
            prop: "Contect",
        },
        {
            label: "联系电话",
            prop: "ContectPhone",
        },
        {
            label: '附件',
            prop: "AttachmentList",
            render(h, context) {
                context.value = [
                    {
                        AttachmentId: "1111",
                        FileName: "图片1",
                        FilePath: "/file/1111.png",
                        FileThumb: "/file/1111-thumb.png",
                        SourceFileName: "图片1原原始名称"
                    },
                    {
                        AttachmentId: "2222",
                        FileName: "图片2",
                        FilePath: "/file/2222.png",
                        FileThumb: "/file/2222-thumb.png",
                        SourceFileName: "图片2原原始名称"
                    },
                    {
                        AttachmentId: "3333",
                        FileName: "文本1",
                        FilePath: "/file/3333.txt",
                        FileThumb: "/file/3333-thumb.txt",
                        SourceFileName: "文本1原始名称"
                    }
                ];

                const { value } = context;

                return <el-button type="text"
                    icon="el-icon-paperclip"
                    vOn: click_stop={() => { _this.$viewFile({ fileList: value }) }}>
                    附件({value && value.length})
                </el-button>
            }
        }
    ]
}