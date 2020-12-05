import Vue from 'vue';

Vue.mixin({
    beforeRouteEnter(to, from, next) {
        const { refresh } = to.params;
        next((vm) => {
            if (refresh && typeof vm.refresh === "function") {
                vm.refresh();
            }
            // 通过 `vm` 访问组件实例
            // console.log(vm.refresh);
        });
    },

    // created() {
    //     if (this.$route) {
    //         this.tempRoute = { ...this.$route };
    //     }
    // }
});