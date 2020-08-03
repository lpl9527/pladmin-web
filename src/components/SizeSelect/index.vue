<!--
    布局大小设置-->
<template>
  <el-dropdown trigger="click" @command="handleSetSize">
    <div>
      <svg-icon class-name="size-icon" icon-class="size" />
    </div>
    <el-dropdown-menu slot="dropdown">
      <el-dropdown-item v-for="item of sizeOptions" :key="item.value" :disabled="size === item.value" :command="item.value">{{item.label}}</el-dropdown-item>
    </el-dropdown-menu>
  </el-dropdown>
</template>

<script>
  export default {
    name: "SizeSelect",
    data() {
        return {
          sizeOptions: [    //布局大小选项
            {label: 'Default', value: 'default'},
            {label: 'Medium', value: 'medium'},
            {label: 'Small', value: 'small'},
            {label: 'Mini', value: 'mini'}
          ]
        }
    },
    computed: {
      size() {    //获取vuex中的大小
        return this.$store.getters.size
      }
    },
    methods: {
      handleSetSize(size) {     //设置布局大小
        //设置element-ui的大小
        this.$ELEMENT.size = size
        //设置vuex中布局大小状态
        this.$store.dispatch('app/setSize', size)
        //刷新页面
        this.refreshView()
        this.$message({
          message: '布局大小设置成功',
          type: 'success'
        })
      },
      refreshView() {     //刷新视图
        //删除所有的缓存视图
        this.$store.dispatch('tagsView/delAllCachedViews', this.$route)

        //获取当前路由地址
        const {fullPath} = this.$route
        this.$nextTick(() => {
          //使用replace函数重定向到此路由实现刷新
          this.$router.replace({path: '/redirect' + fullPath})
        })
      }

    }
  }
</script>

<style scoped>

</style>
