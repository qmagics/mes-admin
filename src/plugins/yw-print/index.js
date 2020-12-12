import PrintManager from "./PrintManager";

//CLodop加载完成之后初始化PrintManager
window.On_CLodop_Opened = PrintManager.initLodop;
import '@/vendor/lodopFuncs';

export default {
    install: (Vue, opt) => {
        const __proto = Vue.prototype;

        /**
         * 打印
         * @param {*} options 
         */
        __proto.$print = (options) => {
            const tpl = [
                {
                    type: "atext",
                    id: "atext26457568",
                    data: {
                        style: {
                            HOrient: 0,
                            VOrient: 0,
                            border: "",
                            borderType: 0,
                            color: "#000",
                            fontFamily: "宋体",
                            fontSize: "12px",
                            fontSpacing: 0,
                            fontStyle: "normal",
                            fontWeight: "normal",
                            textAlign: "left"
                        },
                        width: 500,
                        height: 200,
                        x: 10,
                        y: 10,
                        value: "的功夫",
                        itemtype: 0, //数字型，0--普通项 1--页眉页脚 2--页号项 3--页数项 4--多页项
                        databind: {
                            id: "name",
                            text: "姓名"
                        }
                    }
                },
                {
                    type: "atext",
                    id: "atext26442568",
                    data: {
                        style: {
                            HOrient: 0,
                            VOrient: 0,
                            border: "",
                            borderType: 0,
                            color: "#000",
                            fontFamily: "宋体",
                            fontSize: "12px",
                            fontSpacing: 0,
                            fontStyle: "normal",
                            fontWeight: "normal",
                            textAlign: "left"
                        },
                        width: 500,
                        height: 200,
                        x: 10,
                        y: 300,
                        value: "教师占位符",
                        itemtype: 0, //数字型，0--普通项 1--页眉页脚 2--页号项 3--页数项 4--多页项
                        databind: {
                            id: "teacher.name",
                            text: "教师姓名"
                        }
                    }
                }
            ];

            const data = {
                name: "范晓东",
                age: 29,
                teacher: {
                    name: "杨利",
                    age: 50
                },
                books: [
                    {
                        name: "三体",
                        price: 28
                    },
                    {
                        name: "三国演义",
                        price: 86
                    },
                    {
                        name: "水浒传",
                        price: 60
                    }
                ]
            };

            const pageSetting = {
                width: 794,
                height: 1123,
                intOrient: 1,
            };
            const pm = new PrintManager(tpl, data, pageSetting);

            pm.preview();
        }

    }
}