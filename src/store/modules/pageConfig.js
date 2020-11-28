/**
 * 页面元数据配置
 */

const state = {

    // pages: [],

    configMap: {
        "System_Permission_List": {
            columns: [
                {
                    label: "权限名称",
                    prop: "Name",
                    render: ['link', {
                        name: "System_Permission_Edit",
                        id: "ActionPermissonId"
                    }],
                    // render: {
                    //     name: "link",
                    //     args: {
                    //         name: "System_Permission_Edit",
                    //         params: "Id"
                    //     }
                    // }
                },
                {
                    label: "接口地址",
                    prop: "Url",
                },
                {
                    label: "控制器",
                    prop: "Controller",
                },
                {
                    label: "Action",
                    prop: "Action",
                },
                {
                    label: "排序码",
                    prop: "SortCode",
                },
                {
                    label: "创建时间",
                    prop: "CreateTime",
                    render: ['time'],
                    renderArgs: 'yyyy'
                }
            ],
            btns: []
        }
    }

}

const mutations = {

}

const actions = {

}
export default {
    namespaced: true,
    state,
    mutations,
    actions
}

