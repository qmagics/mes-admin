//默认配置项
export const DEFAULT_OPTIONS = {
    //实例级别预设行状态
    presetRowStates: null,

    background: '#fff',

    height: '100%',

    width: '100%',

    border: true,

    outBorder: true,

    showIndex: false,

    indexTitle: "#",

    pageNumber: 1,

    pageSize: 10,

    pagerLayout: `sizes,prev,pager,next,jumper,->,total`,

    pagerSizes: [10, 20, 50, 100, 200, 500],

    data: [],

    size: "small",

    selectable: false,

    singleSelect: false,

    clickToSelect: false,

    highlightCurrentRow: true,

    rowKey: '',

    api: '',

    method: 'get',

    order: "asc",

    sort: "",

    //是否树形
    tree: false,

    //树形属性配置
    treeProps: {
        hasChildren: 'hasChildren',//是否有子节点

        children: 'children',//子节点标识

        lazy: true,//懒加载子节点

        load: function (tree, treeNode, resolve) {//默认加载子节点函数
            // setTimeout(() => {
            //     resolve([
            //         {
            //             id: 255,
            //             name: "MAYAAA",
            //             age: 176
            //         }, {
            //             id: 257,
            //             name: "MAYBBB",
            //             age: 172
            //         }
            //     ])
            // }, 1000)
        }
    },

    //ajax结果处理函数
    resHandler(res) {
        return res.data;
    },

    //是否全屏
    fullScreen: false,

    //是否显示合计
    showSummary: false,

    //合计方法
    summaryMethod: null,

    //是否有工具栏
    toolbar: true,
    //toolbar属性
    toolbarProps: {
        // layout: 'query,searchBtn -> searchbarToggle,actions,customActions,columnToggle,fullScreen',
        layout: 'query,searchBtn -> actions,columnToggle',
        height: 50
    },

    //是否有抽屉
    drawer: false,
    drawerProps: {
        visible: false,
    },

    //是否有搜索栏
    searchbar: false,
    searchbarProps: {
        show: false,
        size: 'mini',
        minHeight: 100,
        maxHeight: 300,
        background: "#f7f7f7",
        scrollable: false,
    },

    //是否有分页
    pagination: true,
    //分页属性
    paginationProps: {
        height: 50
    },

    //是否有尾部
    footer: false,
    //footer属性
    footerProps: {
        height: 50,
        background: '#f3f3f3'
    },

    //关键词查询控件属性
    keywordProps: {
        label: '',
        prop: 'key',
        placeholder: '请输入关键词'
    },

    //#region 扩展功能

    //是否有头部
    header: false,
    //header属性
    headerProps: {
        classes: '',
        height: '50px',
        background: ''
    },

    //是否有侧边栏
    aside: false,
    //侧边栏属性
    asideProps: {
        width: 200,
        bottom: 0,//左右侧栏优先展示，因此bottom和top写死，后期做成优先级可配置
        top: 0,
        show: true,
        background: '#fff',
        showToggle: false,
    },

    //是否有右侧边栏
    asideRight: false,
    //右侧边栏属性
    asideRightProps: {
        width: 200,
        bottom: 0,//左右侧栏优先展示，因此bottom和top写死，后期做成优先级可配置
        top: 0,
        show: true,
        background: '#fff',
        showToggle: false,
    },

    //底部侧边栏
    asideBottom: false,
    //底部侧边栏属性
    asideBottomProps: {
        height: 200,
        show: true,
        background: '#fff',
        showToggle: false,
    },

    //头部侧边栏
    asideTop: false,
    //头部侧边栏属性
    asideTopProps: {
        height: 200,
        show: true,
        background: '#fff',
        showToggle: false,
    },

    //#endregion
}