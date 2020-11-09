import Vue from 'vue';
import YwTable from '@/components/YwTable';
import '@/components/YwTable/style.scss';

Vue.use(YwTable, {
    defaultOptions: {
        toolbarProps: {
            layout: 'query,searchBtn -> actions,searchbarToggle,columnToggle',
            height: 50
        },
        searchbar: true,
    }
});
