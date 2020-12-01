<template>
  <div class="dashboard-container">
    <pre>{{permission_menuRoutes.length}}</pre>
    <pre>{{permission_routes.length}}</pre>
    <!-- <component :is="currentRole" /> -->
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
// import adminDashboard from './admin'
// import editorDashboard from './editor'

export default {
  name: 'Dashboard',
  // components: { adminDashboard, editorDashboard },
  // data() {
  //   return {
  //     currentRole: 'adminDashboard'
  //   }
  // },
  computed: {
    ...mapGetters([
      'permission_menuRoutes',
      'permission_routes',
    ])
  },
  // created() {
  //   if (!this.roles.includes('admin')) {
  //     this.currentRole = 'editorDashboard'
  //   }
  // }
}
</script>
