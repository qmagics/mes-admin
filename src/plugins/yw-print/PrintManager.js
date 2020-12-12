import { getValueByPath } from "@/utils";

let installed = false,
    msg = '',
    LODOP = null;

export default class PrintManager {
    /**
     * 打印管理器
     * @param {array} template 打印模板(里面存放着control)
     * @param {object} data 打印数据
     * @param {object} pageSetting 打印页面设置
     */
    constructor(template = [], data, pageSetting) {
        this.template = template;
        this.data = data;
        this.pageSetting = pageSetting;
    }

    /**
     * 绑定字段Map
     */
    _bindingMap = null;
    get bindingMap() {
        const { _bindingMap, template } = this,
            templateLen = template.length;

        if (!_bindingMap) {
            if (template) {
                this._bindingMap = {};

                for (let i = 0; i < templateLen; i++) {

                    const control = template[i],
                        bindid = control.data.databind.id;

                    switch (control.type) {
                        //普通文本
                        case "atext":
                        //图片
                        case "aimage":
                            this._bindingMap[bindid] = "";
                            break;

                        //表格
                        case "atable":
                            if (!this._bindingMap[bindid])
                                this._bindingMap[bindid] = [];

                            const { thead, tbody } = control.data,
                                theadRows = thead.rows,
                                tbodyRows = tbody.rows;

                            for (let j = 0, theadLen = theadRows.length; j < theadLen; j++) {
                                const row = theadRows[j],
                                    cells = row.cells;

                                for (let k = 0, cellLen = cells.length; k < cellLen; k++) {
                                    const cell = cells[k];
                                    if (cell.databind && cell.databind.id) {
                                        const cbindid = cell.databind.id;

                                        if (this._bindingMap[bindid].indexOf(cbindid) < 0) {
                                            this._bindingMap[bindid], push(cbindid);
                                        }
                                    }
                                }
                            }

                            for (let j = 0, tbodyLen = tbodyRows.length; j < tbodyLen; j++) {
                                const row = tbodyRows[j],
                                    cells = row.cells;

                                for (let k = 0, cellLen = cells.length; k < cellLen; k++) {
                                    const cell = cells[k];
                                    if (cell.databind && cell.databind.id) {
                                        const cbindid = cell.databind.id;

                                        if (this._bindingMap[bindid].indexOf(cbindid) < 0) {
                                            this._bindingMap[bindid], push(cbindid);
                                        }
                                    }
                                }
                            }
                            break;

                        //图表
                        case "achart":
                            if (!this._bindingMap[bindid])
                                this._bindingMap[bindid] = [];

                            const xdata = control.data.xdata,
                                xdataLen = xdata.length;

                            for (let j = 0; j < xdataLen; j++) {
                                const item = xdata[j],
                                    cbindid = item.id;
                                if (item.show && this._bindingMap[bindid].indexOf(cbindid) < 0) {
                                    this._bindingMap[bindid].push(cbindid);
                                }
                            }
                            break;

                        default:
                            break;
                    }
                }
            }
            else {
                return this._bindingMap = {};
            }
        }

        return this._bindingMap;
    }

    /**
     * 打印生成器 - text
     * @param {object} control 模板中配置的控件 
     */
    g_text(control) {
        const tdata = control.data;
        let content = tdata.value;

        // var databind = control.data.databind.id.split('.');
        // var data;
        // for (var i = 0; i < databind.length; i++) {
        //     if (this.data[databind[i]])
        //         data = this.data[databind[i]];
        // }

        const data = getValueByPath(this.data, control.data.databind.id);

        if (data && data != '') {
            content = data;
        }
        LODOP.ADD_PRINT_TEXT(tdata.y + "px", tdata.x + "px", tdata.width + "px", tdata.height + "px", content);
        LODOP.SET_PRINT_STYLEA(0, "ItemType", tdata.itemtype);
        for (var key in tdata.style) {
            switch (key) {
                case "color":
                    LODOP.SET_PRINT_STYLEA(0, "FontColor", tdata.style[key]);
                    break;
                case "fontFamily":
                    LODOP.SET_PRINT_STYLEA(0, "FontName", tdata.style[key]);
                    break;
                case "fontSize":
                    LODOP.SET_PRINT_STYLEA(0, "FontSize", parseInt(tdata.style[key]) * 0.75);
                    break;
                case "fontSpacing":
                    LODOP.SET_PRINT_STYLEA(0, "letterSpacing", parseInt(tdata.style[key]));
                    break;
                case "fontWeight":
                    LODOP.SET_PRINT_STYLEA(0, "Bold", tdata.style[key] == "normal" ? 0 : 1);
                    break;
                case "fontStyle":
                    LODOP.SET_PRINT_STYLEA(0, "Italic", tdata.style[key] == "normal" ? 0 : 1);
                    break;
                case "textAlign":
                    {
                        var v = tdata.style[key];
                        var pv = 1;
                        if (v == "left")
                            pv = 1;
                        else if (v == "center")
                            pv = 2;
                        else if (v == "right")
                            pv = 3;
                        LODOP.SET_PRINT_STYLEA(0, "Alignment", pv);
                        break
                    };
                case "borderType":
                    LODOP.SET_PRINT_STYLEA(0, "TextFrame", tdata.style[key]);
                    break;
                case "VOrient":
                    LODOP.SET_PRINT_STYLEA(0, "VOrient", tdata.style[key]);
                    break;
                case "HOrient":
                    LODOP.SET_PRINT_STYLEA(0, "HOrient", tdata.style[key]);
                    break;
                default:

            }
        }
    }

    /**
     * 
     */
    build() {
        if (!installed) {
            alert(msg);
            return;
        }
        LODOP.PRINT_INIT("打印测试1");
        if (this.pageSetting) {
            const { intOrient, width, height, pagetype } = this.pageSetting;
            LODOP.SET_PRINT_PAGESIZE(intOrient, width + 'px', height + 'px', pagetype);
        }
        for (let i = 0, len = this.template.length; i < len; i++) {
            var control = this.template[i];

            const g = PrintManager.getG(control.type);
            g && this[g] && this[g].call(this, control);
        }
    }

    /**
     * 打印预览
     */
    preview() {
        this.build();
        LODOP.PREVIEW();
    }

    /**
     * 直接打印
     */
    print() {
        this.build();
        LODOP.PRINT();
    }

    /**
     * 获取打印生成器
     */
    static getG(controlType) {
        return controlType.replace(/^a/, 'g_');
    }

    static initLodop() {
        console.log('initLodop');
        try {
            LODOP = getLodop();
            installed = true;
        } catch (error) {
            installed = false;
            msg = '请安装打印控件,若已安装请运行！';
        }
    }
}

