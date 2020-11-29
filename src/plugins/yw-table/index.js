import Vue from 'vue';
import YwTable from '@/components/YwTable';
import '@/components/YwTable/style.scss';
import request from '@/utils/request';
import './renderer.scss';

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
    },
    presetColumnRenderers: {
        link(h, context, { routeName, id }) {
            return <yw-link type="router" location={{ name: routeName, params: { id } }}>{context.value}</yw-link>
            // return <el-link onclick={() => { this.$open({ name, params: { id: context.row[id] } }) }}>{context.value}</el-link>
        },
        time(h, context, renderArgs) {
            return <span>{new Date(context.value).format(renderArgs)}</span>;
        },
        thumbnail(h, context) {
            return <el-image class="renderer-thumbnail" src={context.value} />;
        }
    }
});
