<!--
    Vue整合面包屑导航-->
<template>
  <el-breadcrumb class="app-breadcrumb" separator="/">
    <transition-group name="breadcrumb">
      <el-breadcrumb-item v-for="(item, index) in levelList" :key="item.path">
        <span v-if="item.redirect === 'noredirect' || index === levelList.length-1" class="no-redirect">{{item.meta.title}}</span>
        <!--@事件.prevent可以阻止事件的默认行为（冒泡等）-->
        <a v-else @click.prevent="handleLink(item)">{{item.meta.title}}</a>
      </el-breadcrumb-item>
    </transition-group>
  </el-breadcrumb>
</template>

<script>

  import pathToRegexp from 'path-to-regexp'   //安装url正则校验工具

	export default {
		name: "Breadcrumb",
    data() {
		  return {
		    levelList: null    //要显示的面包屑列表
      }
    },
    methods: {
		  getBreadcrumb() {   //获取面包屑名称列表
		    //只显示路由的标题
        let matched = this.$route.matched.filter(item => item.meta && item.meta.title)    //路由存在且存在标题时加入路由数组
        //获取第一个路由标题
        const first = matched[0]

        if (!this.isDashboard(first)) {   //如果第一个路由名称是Dashboard，则将此路由加到匹配的路由列表中
          matched = [{path: '/dashboard', meta: {title: '首页'}}].concat(matched)
        }
        //设置要展示的面包屑路由名称导航信息列表
        this.levelList = matched.filter(item => item.meta && item.meta.title && item.meta.breadcrumb !== false)
      },
      isDashboard(route) {    //判断路由名称是不是Dashboard
		    const name = route && route.name
        if (!name) {  //路由名称不存在时返回false
          return false
        }
        //如果路由标题名称是Dashboard则返回true
        return name.trim().toLocaleLowerCase() === 'Dashboard'.toLocaleLowerCase()
      },
      handleLink(item) {    //处理路由链接，item指路由
		    const {redirect, path} = item
        if (redirect) {
          this.$router.push(redirect)
          return
        }
        this.$router.push(this.pathCompile(path))
      },
      pathCompile(path) {
		    //获取当前路由
		    const {params} = this.$route
        let toPath = pathToRegexp.compile(path)
        return toPath(params)
      }
    },
    watch: {
		  $route(route) {
		    if (route.path.startsWith('/redirect/')) {    //重定向的地址不需要设置面包屑
		      return
        }
        //获取面包屑导航列表
		    this.getBreadcrumb()
      }
    },
    created() {
		  //获取面包屑导航列表
		  this.getBreadcrumb()
    }
  }
</script>

<style scoped>

</style>
