<!--
    全屏展示-->
<template>
  <div>
    <!--根据是否全屏切换图标并绑定切换事件-->
    <svg-icon :icon-class="isFullscreen ? 'exit-fullscreen' : 'fullscreen'" @click="click" />
  </div>
</template>

<script>

  import screenfull from 'screenfull'   //导入全屏展示组件

  export default {
    name: "Screenfull",
    data() {
      return{
        isFullscreen: false   //是否全屏展示
      }
    },
    mounted() {
    },
    methods: {
      init() {    //初始化状态，绑定change事件
        if (screenfull.isEnabled) {
          screenfull.on('change', this.change)
        }
      },
      change() {    //同步改变
        this.isFullscreen = screenfull.isFullscreen
      },
      destroy() {   //关闭全屏操作，禁止使用
        if (screenfull.isEnabled) {
          screenfull.off('change', this.change)
        }
      },
      click() {   //点击控制全屏
        if (!screenfull.isEnabled) {    //如果全屏不能使用了（不是手动禁止的）
          this.$message({
            message: '你的浏览不能工作了',
            type: 'warning'
          })
          return
        }
        //切换全屏状态
        screenfull.toggle()
      }
    }
  }
</script>

<style scoped>
  .screenfull-svg {
    display: inline-block;
    cursor: pointer;
    fill: #5a5e66;;
    width: 20px;
    height: 20px;
    vertical-align: 10px;
  }
</style>
