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
        // background: 'transparent',
        toolbarProps: {
            layout: 'query,searchBtn -> actions,columnToggle',
            height: 60
        },

        searchbar: true,
        resHandler(res) {
            if (this.cOptions.pagination) {
                return res;
            }
            else {
                return res.rows;
            }
        },
        indexTitle: '序号'
    },
    presetColumnRenderers: renderers
});
