import Vue from 'vue';
import Page from '@/components/Page';
import TitleBlock from '@/components/Page/TitleBlock';
import FixedBlock from '@/components/Page/FixedBlock';
import FixedRow from '@/components/Page/FixedRow';
import FixedCol from '@/components/Page/FixedCol';
import FixedPanel from '@/components/Page/FixedPanel';
import YwLink from '@/components/Page/YwLink';
import SplitPanel from '@/components/SplitPanel';

//注册全局组件
Vue.component(Page.name, Page);
Vue.component(TitleBlock.name, TitleBlock);
Vue.component(FixedBlock.name, FixedBlock);
Vue.component(FixedRow.name, FixedRow);
Vue.component(FixedCol.name, FixedCol);
Vue.component(FixedPanel.name, FixedPanel);
Vue.component(YwLink.name, YwLink);
Vue.component(SplitPanel.name, SplitPanel);