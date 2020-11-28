import Vue from 'vue';
import App from './App';
import App2 from './App2';
import store from './store';
import router from './router';

//重置浏览器默认css样式
import 'normalize.css/normalize.css';

//插件模块
import '@/plugins/element-ui';
import '@/plugins/yw-global';
import '@/plugins/yw-table';
import YwModal from '@/plugins/yw-modal';
Vue.use(YwModal, { store });

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

// // 生产环境下也使用mock (测试时使用)
// if (process.env.NODE_ENV === 'production') {
//   const { mockXHR } = require('../mock')
//   mockXHR()
// }

// mock
const { mockXHR } = require('../mock');
mockXHR();

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})

// new Vue({
//   el: '#app2',
//   router,
//   store,
//   render: h => h(App2)
// })
