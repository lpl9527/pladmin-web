<template>
  <div :class="{'has-logo':showLogo}">
    <!--导航栏logo-->
    <logo v-if="showLogo" :collapse="isCollapse" />
    <el-scrollbar wrap-class="scrollbar-wrapper">

      <el-menu :default-active="activeMenu" :collapse="isCollapse" :background-color="variables.menuBg" :text-color="variables.menuText"
               :unique-opened="$store.state.settings.uniqueOpened" :active-text-color="variables.menuActiveText" :collapse-transition="false" mode="vertical">

        <sidebar-item v-for="route in permission_routers" :key="route.path" :item="route" :base-path="route.path" />
      </el-menu>

    </el-scrollbar>
  </div>

</template>

<script>

  import {mapGetters} from 'vuex'
  import variables from '@/assets/styles/variables.scss'

  import Logo from './Logo'
  import SidebarItem from './SidebarItem'

	export default {
		name: "Sidebar",
    components: {
		  Logo,
      SidebarItem
    },
    computed: {
      ...mapGetters([
        'permission_routers',
        'sidebar'
      ]),
		  activeMenu() {
        const route = this.$route
        const {meta, path} = route
        if (meta.activeMenu) {
          return meta.activeMenu
        }
        return path
      },
		  variables() {
		    return variables
      },
		  showLogo() {
		    return this.$store.state.settings.sidebarLogo
      },
      isCollapse() {
		    return !this.sidebar.opened
      }
    }
	}
</script>

<style scoped>

</style>
