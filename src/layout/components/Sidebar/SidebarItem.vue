<template>
  <div v-if="!item.hidden" class="menu-wrapper">
    <template v-if="hasOneShowingChild(item.children, item) && (!onlyOneChild.children||onlyOneChild.noShowingChildren) && !item.alwaysShow">
      <app-link v-if="onlyOneChild.meta" :to="resolvePath(onlyOneChild.path)">
        <el-menu-item :index="resolvePath(onlyOneChild.path)" :class="{'submenu-title-noDropdown':!isNest}">
          <item :icon="onlyOneChild.meta.icon||(item.meta&&item.meta.icon)" :title="onlyOneChild.meta.title" />
        </el-menu-item>
      </app-link>
    </template>

    <el-submenu v-else ref="subMenu" :index="resolvePath(item.path)" popper-append-to-body>
      <template slot="title">
        <item v-if="item.meta" :icon="item.meta && item.meta.icon" :title="item.meta.title" />
      </template>
      <sidebar-item
        v-for="child in item.children"
        :key="child.path"
        :is-nest="true"
        :item="child"
        :base-path="resolvePath(child.path)"
        class="nest-menu"
      />
    </el-submenu>
  </div>
</template>

<script>

  import path from 'path'
  import FixiOSBug from './FixiOSBug'
  import {isExternal} from "../../../utils/validate";

  //子组件
  import Item from "./Item";
  import AppLink from './Link'

	export default {
		name: "SidebarItem",
    components: {
      Item,
      AppLink
    },
    mixins: [FixiOSBug],
    data() {
      this.onlyOneChild = null
      return {}
    },
    props: {  //存放路由对象
		  item: {
		    type: Object,
        require: true
      },
      isNest: {
		    type: Boolean,
        default: false
      },
      basePath: {
		    type: String,
        default: ''
      }
    },
    methods: {
      hasOneShowingChild(children = [], parent) {
        const showingChildren = children.filter(item => {
          if (item.hidden) {
            return false
          } else {
            this.onlyOneChild = item
            return true
          }
        })

        if (showingChildren.length === 1) {
          return true
        }
        if (showingChildren.length === 0){
          this.onlyOneChild = {... parent, path: '', noShowingChildren: true}
          return true
        }
        return false
      },
      resolvePath(routerPath) {   //解析路由地址
        if (isExternal(routerPath)) {
          return routerPath
        }
        if (isExternal(this.basePath)) {
          return this.basePath
        }
        return path.resolve(this.basePath, routerPath)
      }
    }
	}
</script>

<style scoped>

</style>
