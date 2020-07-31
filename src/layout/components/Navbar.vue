<template>
  <div class="navbar">
  </div>
</template>

<script>

  import {mapGetters} from 'vuex'

  //引入一些公共的组件，从左至右展示
  import Hamburger from '@/components/Hamburger'      //引入汉堡用于控制菜单栏展示
  import Breadcrumb from '@/components/Breadcrumb'    //引入面包屑导航
  import Search from '@/components/HeaderSearch'      //引入全局搜索（只能搜索路由菜单项）
  import Doc from '@/components/Doc'                  //引入说明文档


	export default {
		name: "Navbar"
	}
</script>

<style scoped>

</style>
