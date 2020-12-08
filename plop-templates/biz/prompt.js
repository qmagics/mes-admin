const { notEmpty } = require('../utils.js');

const params = {
  path: "aaa/bbb",
  modules: []
}

module.exports = {
  description: '生成一个业务模块',
  prompts: [
    {
      type: 'input',
      name: 'name',
      message: '模块名称(业务模块的名称，不得与现有模块的名称重复)',
      validate: notEmpty('name')
    },
    {
      type: 'input',
      name: 'path',
      message: '视图路径(即基于@views/biz/目录的路径字符串)',
      validate: notEmpty('path')
    },
    {
      type: 'checkbox',
      name: 'modules',
      message: '功能模块',
      choices: [
        {
          name: '增',
          value: 'add',
          checked: true
        },
        {
          name: '删',
          value: 'delete',
          checked: true
        },
        {
          name: '改',
          value: 'update',
          checked: true
        },
        {
          name: '查',
          value: 'view',
          checked: true,
        },
      ],
      // validate(value) {
      //   if (value.indexOf('script') === -1 && value.indexOf('template') === -1) {
      //     return 'View require at least a <script> or <template> tag.'
      //   }
      //   return true
      // }
    }
  ],
  actions: data => {
    const { name, path, modules } = data;
    // const name = '{{name}}'
    // const actions = [{
    //   type: 'add',
    //   path: `src/views/${name}/index.vue`,
    //   templateFile: 'plop-templates/view/index.hbs',
    //   data: {
    //     name: name,
    //     template: data.blocks.includes('template'),
    //     script: data.blocks.includes('script'),
    //     style: data.blocks.includes('style')
    //   }
    // }]

    const withAdd = modules.includes('add'),
      withDelete = modules.includes('delete'),
      withUpdate = modules.includes('update'),
      withView = modules.includes('view');

    const actions = [
      {
        type: "add",
        path: `src/views/biz/${path}/detail.vue`,
        templateFile: 'plop-templates/biz/detail.hbs',
        data: {
          name,
          path
        }
      }
    ];

    if (withView) {
      actions.push({
        type: 'add',
        path: `src/views/biz/${path}/list.vue`,
        templateFile: 'plop-templates/biz/list.hbs',
        data: {
          name,
          path
        }
      });
    }

    return actions
  }
}
