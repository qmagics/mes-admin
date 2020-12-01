
module.exports = [
    // 获取菜单路由
    {
        url: '/api/routes',
        type: 'get',
        response: _ => {
            return {
                status: 200,
                data: [
                    {
                        "name": "System",
                        "path": "/system",
                        "component": "Layout",
                        "level": 1,
                        "redirect": "noRedirect",
                        "meta": {
                            "icon": "el-icon-s-tools",
                            "title": "系统管理",
                        },
                        "children": [
                            {
                                "name": "System_Menu",
                                "path": "/system/menu",
                                "component": "system/menu",
                                "level": 2,
                                "meta": {
                                    "icon": "el-icon-menu",
                                    "title": "菜单管理",
                                }
                            },
                            {
                                "name": "System_Permission",
                                "path": "/system/permission",
                                // "component": "system/permission",
                                "level": 2,
                                "redirect": "/system/permission/list",
                                "meta": {
                                    "icon": "el-icon-unlock",
                                    "title": "权限管理",
                                },
                                "children": [
                                    {
                                        "name": "System_Permission_List",
                                        "path": "/system/permission/list",
                                        "component": "system/permission/list",
                                        "level": 3,
                                        "meta": {
                                            "icon": "el-icon-unlock",
                                            "title": "权限管理",
                                        }
                                    },
                                    {
                                        "name": "System_Permission_List2",
                                        "path": "/system/permission/list2",
                                        "component": "system/permission/list",
                                        "level": 3,
                                        "meta": {
                                            "icon": "el-icon-unlock",
                                            "title": "权限列表2",
                                        }
                                    },
                                    {
                                        "name": "System_Permission_List3",
                                        "path": "/system/permission/list3",
                                        "component": "system/permission/list",
                                        "level": 3,
                                        "meta": {
                                            "icon": "el-icon-unlock",
                                            "title": "权限列表3",
                                        }
                                    },
                                    // {
                                    //     "name": "System_Permission_Add",
                                    //     "path": "/system/permission/add",
                                    //     "component": "system/permission/add",
                                    //     "level": 3,
                                    //     "hidden": true,
                                    //     "meta": {
                                    //         "icon": "el-icon-plus",
                                    //         "title": "新增权限",
                                    //     }
                                    // },
                                    // {
                                    //     "name": "System_Permission_Edit",
                                    //     "path": "/system/permission/edit/:id",
                                    //     "component": "system/permission/edit",
                                    //     "level": 3,
                                    //     "hidden": true,
                                    //     "props": true,
                                    //     "meta": {
                                    //         "icon": "el-icon-edit",
                                    //         "title": "编辑权限",
                                    //     }
                                    // },
                                    // {
                                    //     "name": "System_Permission_View",
                                    //     "path": "/system/permission/view/:id",
                                    //     "component": "system/permission/view",
                                    //     "level": 3,
                                    //     "hidden": true,
                                    //     "props": true,
                                    //     "meta": {
                                    //         "icon": "el-icon-view",
                                    //         "title": "查看权限",
                                    //     }
                                    // }
                                ]
                            }
                        ]
                    }
                ]
            }
        }
    }
]
