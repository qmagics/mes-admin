import Vue from 'vue';

//全局通用方法
import './common';

//注册全局组件
import './global-components';

//注册全局过滤器
import './global-filter';

//注册全局指令
import './global-directive';

//注册全局实例方法
import './prototype';

//全局mixins
import './global-mixins';

//modal-input插件
import ModalInput from './modal-input';
Vue.use(ModalInput);

//view-file插件
import ViewFile from './view-file';
Vue.use(ViewFile);