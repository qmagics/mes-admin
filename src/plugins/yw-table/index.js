import Vue from 'vue';
import YwTable from '@/components/YwTable';
import '@/components/YwTable/style.scss';
import request from '@/utils/request';
import * as renderers from './renderers';

Vue.use(YwTable, {
    axios: request,
    defaultOptions: {
        outBorder: false,
        border: false,
        stripe: true,
        showIndex: true,
        selectable: true,
        singleSelect: true,
        clickToSelect: true,
        indexTitle: '序号',
        searchbar: true,
        tree: false,
        toolbarProps: {
            layout: 'superSearchBtn, query -> actions,columnToggle',
            height: 60
        },
        resHandler(res) {
            if (this.cOptions.pagination) {
                return res;
            }
            else {
                return res.rows;
            }
        },
    },
    presetColumnRenderers: renderers
});
