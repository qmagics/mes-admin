module.exports = [
    {
        url: '/api/overall-example/list',
        type: 'get',
        response: _ => {
            return {
                code: 200,
                data: {
                    'rows|10': [
                        {
                            id: '@guid',
                            name: '@cname'
                        }
                    ],
                    total: 100
                }
            }
        }
    }
]