<template>
    <div :class="classObj" class="app-wrapper">
      <div v-if="device==='mobile' && sidebar.opened" class="drawer-bg" @click="handleClickOutside" />
      <!--左侧菜单栏-->
      <sidebar class="sidebar-container"/>
      <!--中间主体内容区域-->
      <div :class="{hasTagsView: needTagsView}" class="main-container">
        <div :class="{'fixed-header':fixedHeader}">
          <!--导航条-->
        </div>
        <!--主体内容区域-->
        <app-main />
      </div>
    </div>
</template>

<script>

  import {mapState} from 'vuex'
  import ResizeMixin from './mixin/ResizeHandler' //切换设备改变sidebar并设置大小
  import Cookies from 'js-cookie'

  import {Sidebar, AppMain} from './components'

	export default {
		name: "index",
    mixins: [ResizeMixin],    //引入公共样式
    components : {
      Sidebar,   //左侧导航栏组件
      AppMain   //主体内容
    },
    computed: {
		  ...mapState({
        sidebar: state => state.app.sidebar,  //获取工具条状态
        device: state => state.app.device,    //获取设备类型
        showSettings: state => state.settings.showSettings,  //是否显示设置
        needTagsView: state => state.settings.tagsView,   //是否显示tagView
        fixedHeader: state => state.settings.fixedHeader  //是否固定头部
      }),
      classObj() {
		    return {
		      hideSidebar: !this.sidebar.opened,
          openSidebar: this.sidebar.opened,
          withoutAnimation: this.sidebar.withoutAnimation,
          mobile: this.device === 'mobile'
        }
      }
    },
    mounted() { //相比created可以获取dom节点
		  if (Cookies.get('theme')) {
        this.$refs.theme.theme = Cookies.get('theme') //设置主题
        this.$store.dispatch('settings/changeSetting', {
          key: 'theme',
          value: Cookies.get('theme')
        })
      }
    },
    methods: {
		  handleClickOutside() {  //关闭sidebar
		    this.$store.dispatch('app/closeSidebar', {withoutAnimation: false})
      }
    }
  }
</script>

<style lang="scss" scoped>

  @import "~@/assets/styles/mixin.scss";
  @import "~@/assets/styles/variables.scss";

  .app-wrapper {
    @include clearfix;
    position: relative;
    height: 100%;
    width: 100%;

    &.mobile.openSidebar {
      position: fixed;
      top: 0;
    }
  }

  .drawer-bg {
    background: #000;
    opacity: 0.3;
    width: 100%;
    top: 0;
    height: 100%;
    position: absolute;
    z-index: 999;
  }

  .fixed-header {
    position: fixed;
    top: 0;
    right: 0;
    z-index: 9;
    width: calc(100% - #{$sideBarWidth});
    transition: width 0.28s;
    padding: 0;
  }

  .hideSidebar .fixed-header {
    width: calc(100% - 54px)
  }

  .mobile .fixed-header {
    width: 100%;
  }
</style>
