import request from '@/utils/request';

// 获取权限分类
export function getPermissionCategory() {
    return request({
        url: '/api/actionPermissonTypeTree',
        method: 'get',
    })
}

/**
 * 获取权限列表
 * @param {object} params 查询参数
 */
export function getPermissionList(params) {
    return request({
        url: `/api/actionPermisson`,
        method: 'get',
        params: {
            Category: 4,
            ...params
        }
    })
}


/**
 * 权限新增 
 * @param {object} data 权限数据模型
 */
export function createPermission(data) {
    return request({
        url: `/api/actionPermisson`,
        method: 'post',
        data
    })
}

/**
 * 权限删除
 * @param {string} Id 权限Id
 */
export function deletePermission(Id) {
    return request({
        url: `/api/actionPermisson`,
        method: 'delete',
        params: {
            Id
        }
    })
}

/**
 * 权限更新
 * @param {object} data 权限数据模型
 */
export function updatePermission(data) {
    return request({
        url: `/api/actionPermisson`,
        method: 'put',
        data
    })
}

/**
 * 获取权限详情 
 * @param {string} Id 权限Id
 */
export function getPermissionDetail(Id) {
    return request({
        url: `/api/actionPermisson`,
        method: 'get',
        params: {
            OptionType: 'detail',
            Id
        }
    })
}

