import request from '@/utils/request';

/**
 * 获取菜单树
 * @param {object} params 查询参数
 */
export function getMenuTree(params) {
    return request({
        url: '/api/menutree',
        method: 'get',
        params: params
    })
}

/**
 * 菜单新增 
 * @param {object} data 菜单数据模型
 */
export function createMenu(data) {
    return request({
        url: `/api/menu`,
        method: 'post',
        data
    })
}

/**
 * 菜单更新
 * @param {object} data 菜单数据模型
 */
export function updateMenu(data) {
    return request({
        url: `/api/menu`,
        method: 'put',
        data
    })
}

/**
 * 删除菜单
 * @param {string} Id 权限Id
 */
export function delMenu(Id) {
    return request({
        url: `/api/menu`,
        method: 'delete',
        data: {
            MenuId: Id
        }
    })
}

/**
 * 获取菜单详情 
 * @param {string} Id 菜单Id
 */
export function getMenuDetail(Id) {
    return request({
        url: `/api/menu`,
        method: 'get',
        params: {
            OptionType: 'detail',
            MenuId: Id
        }
    })
}

/**
 * 获取父级菜单选择
 * @param {object} params 查询参数
 */
export function getMenuSelect(params) {
    return request({
        url: '/api/menuselect',
        method: 'get',
        params: {
            DeleteMark: false,
            EnabledMark: true,
            ...params,
        }
    })
}


/**
 * 获取菜单权限选择树
 */
export function getMenuPermissonTree() {
    return request({
        url: '/api/MenuActionPermissonTreeObject',
        method: 'get'
    })
}