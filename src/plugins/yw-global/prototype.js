import Vue from 'vue';
import store from '@/store';
import router from '@/router';
import { isString } from '@/utils/validate';

/**
 * 判断当前登录用户是否拥有某个权限
 * @param {string|array} value 权限标识符 eg: 'system:user:list' | ['system:user:list']
 */
export function hasPermission(value) {

    if (value && value.length) {
        value = typeof value === 'string' ? [value] : value;

        //用户拥有的权限列表
        const permissions = store.getters && store.getters.permissions;

        //拥有所有权限
        if (permissions.includes("*") || permissions.includes("*:*:*")) {
            return true;
        }

        //判断用户权限表中是否至少包含指定的权限中的一个
        return permissions.some(p => {
            return value.includes(p);
        })
    }
    else {
        throw new Error(`需要不为空的权限标识符! 比如 ['system:user:list','system:user:add'] 或者 'system:user:add'`)
    }
}

/**
 * 打开一个页面
 * @param {string|object} target 路由名称或路由描述对象
 * @param {boolean} refresh 是否刷新页面,执行页面refresh方法
 */
export function open(target, refresh) {
    if (isString(target)) {
        router.push({
            name: target,
            params: {
                refresh
            }
        });
    }
    else {
        router.push(target);
    }
}

/**
 * 关闭当前路由页面
 * @param {Boolean} toLastViewAfterClosed 关闭后是否跳转至页签列表中最后一个页签 默认true
 * // TODO: 当toLastViewAfterClosed传入false时要做处理，避免页签关闭了，页签还没跳转
 */
export function close(toLastViewAfterClosed = true) {
    const viewToClose = this.$route;

    return new Promise((resolve, reject) => {
        store.dispatch("tagsView/delView", viewToClose)
            .then(({ visitedViews }) => {
                if (toLastViewAfterClosed) {
                    if (isActive(viewToClose)) {
                        toLastView(visitedViews, viewToClose);
                    }
                }
                resolve();
            })
    });
}

/**
 * 跳转到上次访问的路由页签
 * @param {*} visitedViews 访问过的路由页签列表
 */
export function toLastView(visitedViews) {
    const latestView = visitedViews.slice(-1)[0];
    if (latestView) {
        router.push(latestView.fullPath)
    } else {
        router.push('/')
    }
}

/**
 * 判断路由页签是否高亮
 * @param {*} route 路由对象
 */
export function isActive(route) {
    // if (!route.meta || !route.meta.juhe) {
    return route.path === router.currentRoute.path
    // } else {
    // return route.subViews.some((i) => this.$route.path === i.fullPath)
    // }
}

/**
 * 延迟调用
 * @param {number} time 时长(ms) 
 */
export function sleep(time) {
    return new Promise(resolve => setTimeout(resolve, time));
}

Vue.prototype.$hasPermission = hasPermission;
Vue.prototype.$open = open;
Vue.prototype.$close = close;
Vue.prototype.$sleep = sleep;