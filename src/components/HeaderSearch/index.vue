<!--
    Vue整合Fuse实现搜索-->
<template>
  <div :class="{'show':show}" class="header-search">
    <!--stop阻止冒泡事件，防止上级元素点击触发事件-->
    <svg-icon class-name="search-icon" icon-class="search" @click.stop="click" />
    <!--下拉搜索展示-->
    <el-select ref="headerSearchSelect" v-model="search" :remote-method="querySearch" filterable default-first-option remote placeholder="搜索" class="header-search-select" @change="change">
      <el-option v-for="item in options" :key="item.path" :value="item" :label="item.title.join(' > ')" />
    </el-select>
  </div>
</template>

<script>

  import Fuse from 'fuse.js'   //apache开源的轻量级模糊搜索，安装 npm install --save fuse.js  特别注意：fuse.js版本是3.4.4
  import path from 'path'

	export default {
		name: "HeaderSearch",
    data() {
		  return {
		    search: '',   //搜索词
        options: [],  //搜索结果选项
        searchPool: [], //搜索记录
        show: false,
        fuse: undefined
      }
    },
    computed: {
		  routes() {   //获取菜单路由列表
		    return this.$store.state.permission.routers
      }
    },
    watch: {
		  routes() {
		    //解析当前路由地址，并将结果放入搜索池中
		    this.searchPool = this.generateRoutes(this.routes)
      },
      searchPool(list) {
		    this.initFuse(list)
      },
      show(value) {   //控制搜索框的展示
		    if (value) {
		      document.body.addEventListener('click', this.close)
        }else {
		      document.body.removeEventListener('click', this.close)
        }
      }
    },
    mounted() {   //组件创建时初始化搜索池
		  this.searchPool = this.generateRoutes(this.routes)
    },
    methods: {
		  generateRoutes(routes, basePath = '/', prefixTitle = []) {    //生成路由列表作为搜索源
		    let res = []

        for (const router of routes) {
          //跳过隐藏的路由组件
          if (router.hidden) {
            continue
          }
          //集合要存放的元素
          const data = {
            path: !this.isHttp(router.path) ? path.resolve(basePath, router.path) : router.path,
            title: [...prefixTitle]
          }
          //如果路由信息不为空，则添加到data中
          if (router.meta && router.meta.title) {
            data.title = [...data.title, router.meta.title]

            if (router.redirect !== 'noRedirect') {
              res.push(data)
            }
          }

          //递归解析子路由
          if (router.children) {
            const tempRouters = this.generateRoutes(router.children, data.path, data.title)
            if (tempRouters.length >= 1) {
              res = [...res, ...tempRouters]
            }
          }
        }
        return res
      },
      isHttp(url) {   //判断请求地址是否是http或https
		    return url.indexOf('http://') !== -1 || url.indexOf('https://') !== -1
      },
      initFuse(list) {    //初始化Fuse搜索对象
		    this.fuse = new Fuse(list, {
		      shouldSort: true,
          threshold: 0.4,
          location: 0,
          distance: 100,
          maxPatternLength: 32,
          minMatchCharLength: 1,
          keys: [{name: 'title', weight: 0.7}, {name: 'path', weight: 0.3}]
        })
      },
      close() {   //关闭搜索方法
		    this.$refs.headerSearchSelect && this.$refs.headerSearchSelect.blur()
        //清空搜索项
        this.options = []
        //关闭搜索框
        this.show = false
      },
      click() {   //点击切换搜索框的展示
		    this.show = !this.show
        if (this.show) {
          this.$refs.headerSearchSelect && this.$refs.headerSearchSelect.focus()
        }
      },
      change(val) {   //搜索词内容改变
		    if(this.isHttp(val.path)) {   //如果是http或https，则新窗口打开
		      window.open(val.path, '_blank')
        }else{
		      this.$router.push(val.path)
        }
		    this.search = ''
        this.options = []
        this.$nextTick(() => {
          this.show = false
        })
      },
      querySearch(query) {    //搜索
		    if (query !== '') {
		      this.options = this.fuse.search(query)
        } else {
		      this.options = []
        }
      }

    }
	}
</script>


<style lang="scss" scoped>
  .header-search {
    font-size: 0 !important;

    .search-icon {
      cursor: pointer;
      font-size: 18px;
      vertical-align: middle;
    }

    .header-search-select {
      font-size: 18px;
      transition: width 0.2s;
      width: 0;
      overflow: hidden;
      background: transparent;
      border-radius: 0;
      display: inline-block;
      vertical-align: middle;

      ::v-deep .el-input__inner {
        border-radius: 0;
        border: 0;
        padding-left: 0;
        padding-right: 0;
        box-shadow: none !important;
        border-bottom: 1px solid #d9d9d9;
        vertical-align: middle;
      }
    }

    &.show {
      .header-search-select {
        width: 210px;
        margin-left: 10px;
      }
    }
  }
</style>
