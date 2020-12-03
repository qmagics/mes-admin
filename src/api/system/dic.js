import request from '@/utils/request';

/**
 * 获取字典值
 * @param {string}} Code 字典编码
 */
export function getDic(Code) {
    return request({
        url: '/api/Dictionary',
        method: 'get',
        params: {
            Nature: 2,
            EnabledMark: 1,
            DeleteMark: 0,
            Code
        }
    })
}