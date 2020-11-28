export default {

    computed: {
        hasFormRef() {
            return this.$refs.form;
        }
    },

    methods: {
        /**
         * 对整个表单进行校验的方法
         * @param {Function(boolean, object)} callback 
         */
        validate(callback) {
            if (this.hasFormRef) {
                return this.$refs.form.validate(callback);
            }
        },

        /**
         * 对整个表单进行重置，将所有字段值重置为初始值并移除校验结果
         */
        resetFields() {
            if (this.hasFormRef) {
                return this.$refs.form.resetFields();
            }
        },

        /**
         * 移除表单项的校验结果
         * @param {array|string} props 待移除的表单项的 prop 属性或者 prop 组成的数组
         */
        clearValidate(props) {
            if (this.hasFormRef) {
                return this.$refs.form.clearValidate(props);
            }
        }
    }
}