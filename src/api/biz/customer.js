import request from '@/utils/request';

/**
 * 获取客户档案分类树
 * @param {object} params 查询参数
 */
export function getCustomerCategoryTree(params) {
    return request({
        url: '/api/BizCustomerTree',
        method: 'get',
        params: {
            Nature: 1,
            ...params
        }
    })
}

/**
 * 获取客户档案分类选择树
 * @param {object} params 查询参数
 */
export function getCustomerCategorySelect(params) {
    return request({
        url: '/api/BizCustomerSelect',
        method: 'get',
        params: {
            Nature: 1,
            ...params
        }
    })
}

/**
 * 获取客户档案列表
 * @param {object} params 查询参数
 */
export function getCustomerList(params) {
    return request({
        url: `/api/BizCustomer`,
        method: 'get',
        params: {
            Nature: 2,
            ...params
        }
    })
}

/**
 * 客户档案新增 
 * @param {object} data 客户档案模型
 */
export function createCustomer(data) {
    return request({
        url: `/api/BizCustomer`,
        method: 'post',
        data
    })
}

/**
 * 客户档案更新
 * @param {object} data 客户档案模型
 */
export function updateCustomer(data) {
    return request({
        url: `/api/BizCustomer`,
        method: 'put',
        data
    })
}

/**
 * 删除客户档案
 * @param {string} Id 客户档案Id
 */
export function deleteCustomer(Id) {
    return request({
        url: `/api/BizCustomer`,
        method: 'delete',
        data: {
            CustomerId: Id
        }
    })
}

/**
 * 获取客户档案详情 
 * @param {string} Id 客户档案Id
 */
export function getCustomerDetail(Id) {
    return request({
        url: `/api/BizCustomer`,
        method: 'get',
        params: {
            OptionType: 'detail',
            CustomerId: Id
        }
    })
}