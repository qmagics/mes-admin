
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
                                "redirect": "/system/menu/list",
                                "level": 2,
                                "meta": {
                                    "icon": "el-icon-menu",
                                    "title": "菜单管理",
                                },
                                "children": [
                                    {
                                        "name": "System_Menu_List",
                                        "path": "/system/menu/list",
                                        "component": "system/menu/list",
                                        "level": 3,
                                        "meta": {
                                            "icon": "el-icon-menu",
                                            "title": "菜单管理",
                                        }
                                    },
                                    {
                                        "name": "System_Menu_Add",
                                        "path": "/system/menu/add",
                                        "component": "system/menu/add",
                                        "level": 3,
                                        "hidden": true,
                                        "meta": {
                                            "icon": "el-icon-plus",
                                            "title": "新增菜单",
                                        }
                                    },
                                    {
                                        "name": "System_Menu_Edit",
                                        "path": "/system/menu/edit/:id",
                                        "component": "system/menu/edit",
                                        "level": 3,
                                        "props": true,
                                        "hidden": true,
                                        "meta": {
                                            "icon": "el-icon-edit",
                                            "title": "编辑菜单",
                                        }
                                    },
                                    {
                                        "name": "System_Menu_View",
                                        "path": "/system/menu/view/:id",
                                        "component": "system/menu/view",
                                        "level": 3,
                                        "props": true,
                                        "hidden": true,
                                        "meta": {
                                            "icon": "el-icon-edit",
                                            "title": "查看菜单",
                                        }
                                    },
                                ]
                            },
                            {
                                "name": "System_Permission",
                                "path": "/system/permission",
                                "redirect": "/system/permission/list",
                                "level": 2,
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
                                        "name": "System_Permission_Add",
                                        "path": "/system/permission/add",
                                        "component": "system/permission/add",
                                        "level": 3,
                                        "hidden": true,
                                        "meta": {
                                            "icon": "el-icon-plus",
                                            "title": "新增权限",
                                        }
                                    },
                                    {
                                        "name": "System_Permission_Edit",
                                        "path": "/system/permission/edit/:id",
                                        "component": "system/permission/edit",
                                        "level": 3,
                                        "hidden": true,
                                        "props": true,
                                        "meta": {
                                            "icon": "el-icon-edit",
                                            "title": "编辑权限",
                                        }
                                    },
                                    {
                                        "name": "System_Permission_View",
                                        "path": "/system/permission/view/:id",
                                        "component": "system/permission/view",
                                        "level": 3,
                                        "hidden": true,
                                        "props": true,
                                        "meta": {
                                            "icon": "el-icon-view",
                                            "title": "查看权限",
                                        }
                                    }
                                ]
                            },
                            {
                                "name": "System_PermissionCategory",
                                "path": "/system/permission-category",
                                "redirect": "/system/permission-category/list",
                                "hidden": true,
                                "level": 2,
                                "meta": {
                                    "icon": "el-icon-unlock",
                                    "title": "权限分类管理",
                                },
                                "children": [
                                    {
                                        "name": "System_PermissionCategory_List",
                                        "path": "/system/permission-category/list",
                                        "component": "system/permission-category/list",
                                        "hidden": true,
                                        "level": 3,
                                        "meta": {
                                            "icon": "el-icon-s-grid",
                                            "title": "权限分类管理",
                                        }
                                    },
                                    {
                                        "name": "System_PermissionCategory_Add",
                                        "path": "/system/permission-category/add",
                                        "component": "system/permission-category/add",
                                        "level": 3,
                                        "hidden": true,
                                        "meta": {
                                            "title": "新增权限分类",
                                        }
                                    },
                                    {
                                        "name": "System_PermissionCategory_Edit",
                                        "path": "/system/permission-category/edit/:id",
                                        "component": "system/permission-category/edit",
                                        "level": 3,
                                        "hidden": true,
                                        "props": true,
                                        "meta": {
                                            "title": "编辑权限分类",
                                        }
                                    },
                                    {
                                        "name": "System_PermissionCategory_View",
                                        "path": "/system/permission-category/view/:id",
                                        "component": "system/permission-category/view",
                                        "level": 3,
                                        "hidden": true,
                                        "props": true,
                                        "meta": {
                                            "title": "查看权限分类",
                                        }
                                    }
                                ]
                            }
                        ]
                    }
                ]
            }
        }
    }
]
