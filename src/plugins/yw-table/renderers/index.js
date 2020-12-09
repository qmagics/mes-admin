/**
 * 表格单元格预设渲染函数
 */

// 预设renderer的样式
import './renderer.scss';

/**
 * 单元格链接渲染器
 * @param { function } h createElement 方法
 * @param { object } context 上下文对象 {value, row}
 * @param { function|object } obj 参数对象
 */
export function link(h, context, obj) {

    const { value, row } = context;

    let link_target = null,
        link_text = value;

    if (typeof obj !== 'function') {
        const { routeName, idField, textField } = obj;

        if (textField) {
            link_text = row[textField];
        }

        link_target = {
            name: routeName,
            params: {
                id: idField ? row[idField] : value
            }
        }
    }
    else {
        const { text, target } = obj.call(null, context);

        if (target) {
            link_target = target;
        }

        if (text) {
            link_text = text;
        }
    }

    return <yw-link target={link_target}>{link_text}</yw-link>
}

/**
 * 单元格时间渲染器
 * @param { function } h createElement 方法
 * @param { object } context 上下文对象 {value, row}
 * @param { string } 格式化字符串
 */
export function time(h, context, formatStr) {
    return <span>{new Date(context.value).format(formatStr)}</span>;
}

/**
 * 单元格缩略图渲染器
 * @param { function } h createElement 方法
 * @param { object } context 上下文对象 {value, row}
 * @param { array } size 图片的[宽,高]
 */
export function thumbnail(h, context, [width, height] = []) {
    return <el-image class="renderer-thumbnail" style={{ width, height }} src={context.value} />;
}

/**
 * 附件渲染器
 * @param { function } h createElement 方法
 * @param { object } context 上下文对象 {value, row}
 * @param { object } options 配置项 { request }
 */
export function attachment(h, context, { onConfirm } = {}) {
    const { value } = context;
    return <el-button type="text"
        icon="el-icon-paperclip"
        vOn: click_stop={() => {
            this.$uploadFile({
                value,
                title: '附件管理',
                onConfirm
            })
        }}>
        附件({(value && value.length) || 0})
</el-button>
}