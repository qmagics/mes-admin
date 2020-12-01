import { getRoutes } from '@/api/menu';
import { constantRoutes } from '@/router';
import Layout from '@/layout/index';
import { getBlankRouterView } from '@/layout/utils';
import { deepClone } from '@/utils';


/**
 * 拍平数据
 * 超过二级以上的路由转化为二级路由
 * @param {*} arr 
 */
function flattenRoutesData(routesData) {
  let e_routes = [];

  const routes = routesData.map(i => {
    if (i.children && i.children.length && i.level > 1) {
      e_routes = e_routes.concat(flattenRoutesData(i.children));
      i.children = [];
    }
    return i;
  });

  return [...routes, ...e_routes];
}

/**
 * 把通过api获取到的路由数据转化为VueRouter可识别的路由对象
 * @param {*} routesData 
 */
function parseRoutes(routesData) {

  const flattedRoutes = flattenRoutesData(routesData);

  return flattedRoutes.map(route => {
    if (route.component) {
      if (route.component === 'Layout') {
        route.component = Layout;
      }
      else {
        route.component = loadView(route.component);
      }
    }
    else if (route.children && route.children.length > 0) {
      route.component = getBlankRouterView(route.name);
    }

    if (route.children != null && route.children && route.children.length) {
      route.children = parseRoutes(route.children)
    }

    return route;
  });
}

/**
 * 把通过api获取到的路由数据转化为可供菜单栏使用路由对象
 * @param {*} routesData 
 */
function parseMenuRoutes(routesData) {
  return routesData.filter(i => {
    if (!i.component && (!i.children || !i.children.length)) {
      console.log(i.meta.title)
      return false;
    }
    else if (i.children && i.children.length) {
      i.children = parseMenuRoutes(i.children);
    }
    return true;
  });
  // return asyncRoutesData.map(route => {
  // if (route.component) {
  //   if (route.component === 'Layout') {
  //     route.component = Layout;
  //   }
  //   else {
  //     route.component = loadView(route.component);
  //   }
  // }
  // else if (route.children && route.children.length > 0) {
  //   route.component = getBlankRouterView(route.name);
  // }

  // if (route.children != null && route.children && route.children.length) {
  //   route.children = parseRoutes(route.children)
  // }

  // return route;
  // });
}

/**
 * 加载视图组件
 * @param {*} path 视图组件路径
 */
function loadView(path) {
  return (resolve) => require([`@/views/${path}`], resolve);
  // return () => import(`@/views/${path}`);
}

const state = {
  routes: [],
  addRoutes: [],
  menuRoutes: []
}

const mutations = {
  SET_ROUTES: (state, routes) => {
    state.addRoutes = routes;
    state.routes = constantRoutes.concat(routes);
  },

  SET_MENU_ROUTES: (state, routes) => {
    state.menuRoutes = constantRoutes.concat(routes);
  }
}

const actions = {
  generateRoutes({ commit }) {
    return new Promise((resolve) => {
      getRoutes()
        .then(res => {
          /**
           * 2.设置菜单栏路由绑定对象
           * 菜单栏路由与Vue的路由对象并不是一一对应
           * 有些路由不在菜单中
           * 两种路由对象的嵌套结构很可能是不一样的
           * 菜单栏路由可能还会包含一些额外参数
           */
          const clonedData = deepClone(res.data);
          const parsedMenuRoutes = parseMenuRoutes(clonedData);
          commit('SET_MENU_ROUTES', parsedMenuRoutes);

          /**
           * 1.设置路由对象 
           * 增加404页面路由(404页面路由必须放在路由数组的最后)
           */
          const parsedRoutes = parseRoutes(res.data);
          console.log(parsedRoutes);
          parsedRoutes.push({ path: '*', redirect: '/404', hidden: true });
          commit('SET_ROUTES', parsedRoutes);

          //Promise返回路由对象
          resolve(parsedRoutes);
        })
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
