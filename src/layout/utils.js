import BlankRouterComponent from './blank-router';
import GatherRouterComponent from './gather-router';
import { deepClone } from '@/utils';

/**
 * 获取空白路由页面模板
 * @param {string} name 路由名称 *必填
 */
export function getBlankRouterView(name) {
    const comp = deepClone(BlankRouterComponent);
    comp.name = name;
    return comp;
}

/**
 * 获取聚合路由页面模板
 * @param {string} name 路由名称 *必填
 */
export function getGatherRouterView(name) {
    const comp = deepClone(GatherRouterComponent);
    comp.name = name;
    return comp;
}