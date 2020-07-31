<template>
  <section class="app-main">

    <!--视图主体内容-->
    <transition name="fade-transform" mode="out-in">
      <keep-alive :include="cachedViews">
        <router-view :key="key" />
      </keep-alive>
    </transition>

    <!--底部信息-->
    <div v-if="$store.state.settings.showFooter" id="el-main-footer">
      <span v-html="$store.state.settings.footerTxt" />
      <span> · </span>
      <a href="http://www.beian.miit.gov.cn" target="_blank">{{$store.state.settings.caseNumber}}</a>
    </div>

  </section>
</template>

<script>
	export default {
		name: "AppMain",
    computed: {
		  cachedViews() {   //缓存视图列表
		    return this.$store.state.tagsView.cachedViews
      },
      key() {   //当前视图的路由地址
		    return this.$route.path
      }
    }
	}
</script>

<style lang="scss" scoped>
  .app-main {
    /* 50= navbar  50  */
    min-height: calc(100vh - 50px);
    width: 100%;
    position: relative;
    overflow: hidden;
  }

  .fixed-header+.app-main {
    padding-top: 50px;
  }

  .hasTagsView {
    .app-main {
      /* 84 = navbar + tags-view = 50 + 34 */
      min-height: calc(100vh - 84px);
    }

    .fixed-header+.app-main {
      padding-top: 84px;
    }
  }
</style>

<style lang="scss">
  // fix css style bug in open el-dialog
  .el-popup-parent--hidden {
    .fixed-header {
      padding-right: 15px;
    }
  }
</style>
