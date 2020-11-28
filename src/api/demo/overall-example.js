import request from '@/utils/request';

export function getList(params) {
    return request({
        url: '/api/overall-example/list',
        method: 'get',
        params,
    })
}
