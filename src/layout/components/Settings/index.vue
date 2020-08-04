<!--
    系统设置组件-->
<template>
  <div class="drawer-container">
    <div>
      <h3 class="drawer-title">系统布局设置</h3>

      <!--切换主题颜色-->
      <div class="drawer-item">
        <span>主题颜色</span>
        <theme-picker style="float: right; height: 26px; margin: -3px 8px 0 0;" @change="themeChange" />
      </div>

      <!--控制标签显示-->
      <div class="drawer-item">
        <span>显示标签</span>
        <el-switch v-model="tagsView" class="drawer-switch" />
      </div>

      <!--是否固定头部-->
      <div class="drawer-item">
        <span>固定头部</span>
        <el-switch v-model="fixedHeader" class="drawer-switch" />
      </div>

      <!--是否显示系统logo-->
      <div class="drawer-item">
        <span>显示LOGO</span>
        <el-switch v-model="sidebarLogo" class="drawer-switch" />
      </div>

      <!--菜单一级展开控制-->
      <div class="drawer-item">
        <span>菜单UniqueOpened</span>
        <el-switch v-model="uniqueOpened" class="drawer-switch" />
      </div>

    </div>
  </div>
</template>

<script>

  import ThemePicker from '@/components/ThemePicker'    //导入主题选择组件

	export default {
		name: "Settings",
    components: {
		  ThemePicker
    },
    data() {
		  return {

      }
    },
    computed: {
		  fixedHeader: {    //头部固定设置
		    get() {
		      return this.$store.state.settings.fixedHeader
        },
        set(val) {
		      this.$store.dispatch('settings/changeSetting', {
		        key: 'fixedHeader',
            value: val
          })
        }
      },
      tagsView: {   //标签视图设置
		    get() {
		      return this.$store.state.settings.tagsView
        },
        set(val) {
		      this.$store.dispatch('settings/changeSetting', {
		        key: 'tagsView',
            value: val
          })
        }
      },
      sidebarLogo: {    //系统logo
		    get() {
		      return this.$store.state.settings.sidebarLogo
        },
        set(val) {
		      this.$store.dispatch('settings/changeSetting', {
		        key: 'sidebarLogo',
            value: val
          })
        }
      },
      uniqueOpened: {   //保持一个子菜单的展开
		    get() {
		      return this.$store.state.settings.uniqueOpened
        },
        set(val) {
		      this.$store.dispatch('settings/changeSetting', {
		        key: 'uniqueOpened',
            value: val
          })
        }
      }
    },
    methods: {
		  themeChange(val) {    //更换主题
        this.$store.dispatch('settings/changeSetting', {
          key: 'theme',
          value: val
        })
      }
    }
	}
</script>

<style lang="scss" scoped>
  .drawer-container {
    padding: 24px;
    font-size: 14px;
    line-height: 1.5;
    word-wrap: break-word;

    .drawer-title {
      margin-bottom: 12px;
      color: rgba(0, 0, 0, .85);
      font-size: 14px;
      line-height: 22px;
    }

    .drawer-item {
      color: rgba(0, 0, 0, .65);
      font-size: 14px;
      padding: 12px 0;
    }

    .drawer-switch {
      float: right
    }
  }
</style>
