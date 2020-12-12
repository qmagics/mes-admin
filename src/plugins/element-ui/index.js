import Vue from 'vue';
import Cookies from 'js-cookie';
import ElementUI from 'element-ui';
import '@/styles/element-variables.scss';

//重写Switch组件默认属性
// const ElSwitch_Props = ElementUI.Switch.props;
// ElSwitch_Props.activeValue.default = 1;
// ElSwitch_Props.inactiveValue.default = 0;

Vue.use(ElementUI, { size: Cookies.get('size') || 'small' });