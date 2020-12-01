import request from '@/utils/request';

/**
 * 获取权限分类树
 * @param {object} params 查询参数
 */
export function getTreeList(params) {
    return request({
        url: '/api/actionPermissonTypeTree',
        method: 'get',
        params: params
    })
}

/**
 * 获取上级权限分类选项
 * @param {*} Category 当前分类
 */
export function getParentSelections(Category) {
    return request({
        url: '/api/actionPermissonTypeSelect',
        method: 'get',
        params: {
            Category
        }
    })
}

/**
 * 权限新增 
 * @param {object} data 权限数据模型
 */
export function create(data) {
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
export function del(Id) {
    return request({
        url: `/api/actionPermisson`,
        method: 'delete',
        data: {
            ActionPermissonId: Id
        }
    })
}

/**
 * 权限更新
 * @param {object} data 权限数据模型
 */
export function update(data) {
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
export function getDetail(Id) {
    return request({
        url: `/api/actionPermisson`,
        method: 'get',
        params: {
            OptionType: 'detail',
            ActionPermissonId: Id
        }
    })
}