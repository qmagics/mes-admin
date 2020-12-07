import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/api/login',
    method: 'post',
    data
  })
}

export function getInfo(token) {
  // return request({
  //   url: '/api/profile',
  //   method: 'get',
  //   params: { token }
  // })

  return new Promise((resolve) => {
    const data = {
      "permissions": [
        "*:*:*",
        "system:permission:list",
        "system:permission:add",
        "system:permission:edit",
      ],

      "roles": [
        "admin",
        "common"
      ],

      "user": {
        "userName": "admin",
        "userId": "@guid",
        "sex": "1",
        "remark": "管理员",
        "avatar": "https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif"
      },

      "dept": {
        "deptName": "研发部"
      }
    }

    resolve({ data, bl: true });
  })


}

export function logout() {
  return request({
    url: '/api/logout',
    method: 'post'
  })
}
