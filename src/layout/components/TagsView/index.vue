<!--
    标签视图组件-->
<template>
  <div id="tags-view-container" class="tags-view-container">
    <!--遍历展示所有可见的标签-->
    <scroll-pane ref="scrollPane" class="tags-view-wrapper">
      <router-link v-for="tag in visitedViews" ref="tag" :key="tag.path" :class="isActive(tag) ? 'active' : ''" :to="{path: tag.path, query: tag.query, fullPath: tag.fullPath}"
                   tag="span" class="tags-view-item" @click.middle.native="closeSelectedTag(tag)" @contextmenu.prevent.native="openMenu(tag,$event)">
        {{tag.title}}
        <span v-if="!tag.meta.affix" class="el-icon-close" @click.prevent.stop="closeSelectedTag(tag)" />
      </router-link>
    </scroll-pane>
    <!--标签操作项-->
    <ul v-show="visible" :style="{left:left+'px',top:top+'px'}" class="contextmenu">
      <li @click="refreshSelectedTag(selectedTag)">刷新</li>
      <li v-if="!(selectedTag.meta && selectedTag.meta.affix)" @click="closeSelectedTag(selectedTag)">关闭</li>
      <li @click="closeOthersTags">关闭其他</li>
      <li @click="closeAllTags(selectedTag)">关闭全部</li>
    </ul>
  </div>
</template>

<script>

  import ScrollPane from "./ScrollPane";
  import path from 'path'

  export default {
    name: "TagsView",
    components: {
      ScrollPane
    },
    data() {
      return {
        visible: false,
        top: 0,
        left: 0,
        selectedTag: {},
        affixTags: []
      }
    },
    computed: {
      visitedViews() {    //显示的视图
        return this.$store.state.tagsView.visitedViews
      },
      routes() {     //路由集合
        return this.$store.state.permission.routers
      }
    },
    watch: {
      $route() {
        //加入当前路由到state视图
        this.addTags()
        this.moveToCurrentTag()
      },
      visible(value) {
        if (value) {
          document.body.addEventListener('click', this.closeMenu)
        } else {
          document.body.removeEventListener('click', this.closeMenu)
        }
      }
    },
    mounted() {
      //初始化标签
      this.initTags()
      //加入当前路由到state视图
      this.addTags()
    },
    methods: {
      isActive(route) {   //判断视图是否活跃（即路由地址是否与当前路由地址相同）
        return route.path === this.$router.path
      },
      filterAffixTags(routes, basePath = '/') {   //过滤附加标签（存在的则加入）
        let tags = []
        routes.forEach(route => {
          if (route.meta && route.meta.affix) {
            const tagPath = path.resolve(basePath, route.path)
            tags.push({
              fullPath: tagPath,
              path: tagPath,
              name: route.name,
              meta: {...route.meta}
            })
          }
          if (route.children) {
            //递归过滤附加标签
            const tempTags = this.filterAffixTags(route.children, route.path)
            if (tempTags.length >= 1) {
              tags = [...tags, ...tempTags]
            }
          }
        })
        return tags
      },
      initTags() {    //初始化标签
        const affixTags = this.affixTags = this.filterAffixTags(this.routes)
        for (const tag of affixTags) {
          //必须存在标签名
          if (tag.name) {
            //将此标签加入到state的展示的标签视图中
            this.$store.dispatch('tagsView/addVisitedView', tag)
          }
        }
      },
      addTags() {   //添加当前路由到标签中
        //获取当前路由名称
        const {name} = this.$route
        //必须存在名称时
        if (name) {
          //将当前路由添加到state中
          this.$store.dispatch('tagsView/addView', this.$route)
        }
      },
      moveToCurrentTag() {    //移动到当前标签
        const tags = this.$refs.tag
        this.$nextTick(() => {
          for (const tag of tags) {
            if (tag.to.path === this.$route.path) {
              //移动到目标标签
              this.$refs.scrollPane.moveToTarget(tag)
              //当当前标签路由地址与目标路由地址不同时则更新
              if (tag.to.fullPath !== this.$route.fullPath) {
                this.$store.dispatch('tagsView/updateVisitedView', this.$route)
              }
              break
            }
          }
        })
      },
      refreshSelectedTag(view) {    //刷新当前标签视图
        //清除缓存
        this.$store.dispatch('tagsView/delCachedView', view).then(() => {
          //获取选择的视图的路由地址
          const {fullPath} = view
          //重定向到该路由
          this.$nextTick(() => {
            this.$router.replace({
              path: '/redirect' + fullPath
            })
          })
        })
      },
      closeSelectedTag(view) {    //关闭选择的标签
        //先删除state中当前视图标签
        this.$store.dispatch('tagsView/delView', view).then(({visitedViews}) => {
          //如果当前视图标签正在活跃
          if(this.isActive(view)) {
            //跳转到最后一个标签视图
            this.toLastView(visitedViews, view)
          }
        })
      },
      closeOthersTags() {   //关闭其他标签
        this.$router.push(this.selectedTag)
        //删除state中其他视图标签
        this.$store.dispatch('tagsView/delOthersViews', this.selectedTag).then(() => {
          //移动到当前标签
          this.moveToCurrentTag()
        })
      },
      closeAllTags(view) {    //删除所有标签
        //删除state中所有课件标签
        this.$store.dispatch('tagsView/delAllViews').then(({ visitedViews }) => {
          if (this.affixTags.some(tag => tag.path === view.path)) {
            return
          }
          //跳转到最后一个标签视图
          this.toLastView(visitedViews, view)
        })
      },
      toLastView(visitedViews, view) {    //跳转到最后一个可见视图
        //获取最后一个可见视图
        const lastView = visitedViews.splice(-1)[0]
        if (lastView) {
          this.$router.push(lastView)
        }else {   //没有最后一个视图时
          //跳转到首页
          if (view.name === 'Dashboard') {
            this.$router.replace({path: '/redirect' + view.fullPath})
          }else {
            this.$router.push('/')
          }
        }
      },
      openMenu(tag, e) {    //打开菜单
        const menuMinWidth = 105
        const offsetLeft = this.$el.getBoundingClientRect().left //容器左外边距
        const offsetWidth = this.$el.offsetWidth //容器宽度
        const maxLeft = offsetWidth - menuMinWidth //左边框
        const left = e.clientX - offsetLeft + 15 //容器右外边距

        if (left > maxLeft) {
          this.left = maxLeft
        } else {
          this.left = left
        }

        this.top = e.clientY
        this.visible = true
        this.selectedTag = tag
      },
      closeMenu() {
        this.visible = false
      }
    }
  }
</script>

<style lang="scss" scoped>
  .tags-view-container {
    height: 34px;
    width: 100%;
    background: #fff;
    border-bottom: 1px solid #d8dce5;
    box-shadow: 0 1px 3px 0 rgba(0, 0, 0, .12), 0 0 3px 0 rgba(0, 0, 0, .04);
    .tags-view-wrapper {
      .tags-view-item {
        display: inline-block;
        position: relative;
        cursor: pointer;
        height: 26px;
        line-height: 26px;
        border: 1px solid #d8dce5;
        color: #495060;
        background: #fff;
        padding: 0 8px;
        font-size: 12px;
        margin-left: 5px;
        margin-top: 4px;
        &:first-of-type {
          margin-left: 15px;
        }
        &:last-of-type {
          margin-right: 15px;
        }
        &.active {
          background-color: #42b983;
          color: #fff;
          border-color: #42b983;
          &::before {
            content: '';
            background: #fff;
            display: inline-block;
            width: 8px;
            height: 8px;
            border-radius: 50%;
            position: relative;
            margin-right: 2px;
          }
        }
      }
    }
    .contextmenu {
      margin: 0;
      background: #fff;
      z-index: 3000;
      position: absolute;
      list-style-type: none;
      padding: 5px 0;
      border-radius: 4px;
      font-size: 12px;
      font-weight: 400;
      color: #333;
      box-shadow: 2px 2px 3px 0 rgba(0, 0, 0, .3);
      li {
        margin: 0;
        padding: 7px 16px;
        cursor: pointer;
        &:hover {
          background: #eee;
        }
      }
    }
  }
</style>

<style lang="scss">
  //reset element css of el-icon-close
  .tags-view-wrapper {
    .tags-view-item {
      .el-icon-close {
        width: 16px;
        height: 16px;
        vertical-align: 2px;
        border-radius: 50%;
        text-align: center;
        transition: all .3s cubic-bezier(.645, .045, .355, 1);
        transform-origin: 100% 50%;
        &:before {
          transform: scale(.6);
          display: inline-block;
          vertical-align: -3px;
        }
        &:hover {
          background-color: #b4bccc;
          color: #fff;
        }
      }
    }
  }
</style>
