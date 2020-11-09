<script>
export default {
    name:'Page',

    render(){
        return <div class="page">{this.$slots.default}</div>
    }
}
</script>

<style lang="scss">
    .page{
        height:calc( 100vh - 84px );
    }
</style>