<template>

</template>

<script>

  import Fuse from ''   //apache开源的轻量级模糊搜索，安装 npm install --save fuse.js
  import Path from 'path'

	export default {
		name: "HeaderSearch",
    data() {
		  return {
		    search: '',   //搜索词
        options: [],  //搜索的结果选项
        searchPool: [], //搜索记录
        show: false,
        fuse: undefined
      }
    },
    computed: {
		  routers() {   //获取菜单路由列表
		    return this.$store.state.permission.routers
      }
    },
    watch: {
		  routes() {
		    this.
      }
    }
	}
</script>

<style scoped>

</style>
