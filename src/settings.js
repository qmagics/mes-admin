module.exports = {
  /**
   * @type {string} 
   * @description 会显示在浏览器页签中
   */
  title: 'MES Admin',

  /**
   * @type {boolean} true | false
   * @description 是否显示右侧设置栏
   */
  showSettings: false,

  /**
   * @type {boolean} true | false
   * @description 是否默认显示tags
   */
  tagsView: true,

  /**
   * @type {boolean} true | false
   * @description 是否默认固定头部
   */
  fixedHeader: true,

  /**
   * @type {boolean} true | false
   * @description 是否默认显示左侧栏Logo
   */
  sidebarLogo: true,

  /**
   * @type {string | array} 'production' | ['production', 'development']
   * @description 是否显示错误日志面板
   * production:表示生产环境显示 development:表示开发环境显示
   */
  errorLog: ['production', 'development']
}
