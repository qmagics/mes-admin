import Vue from 'vue';
import Cookies from 'js-cookie';
import Element from 'element-ui';
import '@/styles/element-variables.scss';

Vue.use(Element, { size: Cookies.get('size') || 'small' });