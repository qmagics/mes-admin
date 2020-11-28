import Vue from 'vue';
import YwTable from '@/components/YwTable';
import '@/components/YwTable/style.scss';
import request from '@/utils/request';

Vue.use(YwTable, {
    axios: request,
    defaultOptions: {
        toolbarProps: {
            layout: 'query,searchBtn -> actions,searchbarToggle,columnToggle',
            height: 50
        },
        searchbar: true,
        resHandler(res) {
            return res;
        }
    }
});
