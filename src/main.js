import Vue from 'vue';
import App from './App';
import store from './store';
import router from './router';

//重置浏览器默认css样式
import 'normalize.css/normalize.css';

//通用插件模块
import '@/plugins/element-ui';
import '@/plugins/yw-global';
import '@/plugins/yw-table';

//弹窗管理插件
import YwModal from '@/plugins/yw-modal';
Vue.use(YwModal, { store });

//文件管理插件
import YwFile from '@/plugins/yw-file';
Vue.use(YwFile, { store });

//全局样式
import '@/styles/index.scss';

//注册图标组件
import './icons';

//权限控制
import './permission';

//Vue错误日志处理
import './utils/error-log';

//注册全局filters
import * as filters from './filters';
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
});

//关闭 Vue 的 productionTip
Vue.config.productionTip = false;

//i18n
import i18n from './lang';

// // mock
// if (process.env.NODE_ENV !== 'production') {
//   const { mockXHR } = require('../mock')
//   mockXHR()
// }

new Vue({
  el: '#app',
  router,
  store,
  i18n,
  render: h => h(App)
})