import store from '@/store';

function checkPermission(el, binding) {
  let { value } = binding;

  if (value && value.length) {
    value = typeof value === 'string' ? [value] : value;

    //用户拥有的权限列表
    const permissions = store.getters && store.getters.permissions;

    //拥有所有权限
    if (permissions.includes("*") || permissions.includes("*:*:*")) {
      return;
    }

    //判断用户权限表中是否至少包含指定的权限中的一个
    const hasPermission = permissions.some(p => {
      return value.includes(p);
    })

    //销毁无权限的组件
    if (!hasPermission) {
      el.parentNode && el.parentNode.removeChild(el);
    }

  }
  else {
    throw new Error(`需要不为空的权限标识! 比如 v-permission="['system:user:list','system:user:add']" 或者 v-permission="system:user:add" `)
  }
}

export default {
  inserted(el, binding) {
    checkPermission(el, binding)
  },
  update(el, binding) {
    checkPermission(el, binding)
  }
}
