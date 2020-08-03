<template>
  <el-scrollbar ref="scrollContainer" :vertical="false" class="scroll-container" @wheel.native.prevent="handleScroll">
    <!--不具名插槽-->
    <slot />
  </el-scrollbar>
</template>

<script>

  const tagAndTagSpacing = 4    //标签之间的间距

  export default {
    name: "ScrollPane",
    data() {
      return {
        left: 0
      }
    },
    computed: {
      scrollWrapper() {
        return this.$refs.scrollContainer.$refs.wrap
      }
    },
    methods: {
      handleScroll(e) {
        const eventDelta = e.wheelDelta || -e.deltaY * 40
        const $scrollWrapper = this.scrollWrapper
        $scrollWrapper.scrollLeft = $scrollWrapper.scrollLeft + eventDelta / 4
      },
      moveToTarget(currentTag) {    //移除指定标签
        const $container = this.$refs.scrollContainer.$el
        const $containerWidth = $container.offsetWidth
        const $scrollWrapper = this.scrollWrapper
        const tagList = this.$parent.$refs.tag

        let firstTag = null
        let lastTag = null

        // 拿到第一个和最后一个标签
        if (tagList.length > 0) {
          firstTag = tagList[0]
          lastTag = tagList[tagList.length - 1]
        }
        //如果只剩一个标签
        if (firstTag === currentTag) {
          $scrollWrapper.scrollLeft = 0
        } else if (lastTag === currentTag) {
          $scrollWrapper.scrollLeft = $scrollWrapper.scrollWidth - $containerWidth
        } else {
          // 拿到前一个和后一个标签
          const currentIndex = tagList.findIndex(item => item === currentTag)
          const prevTag = tagList[currentIndex - 1]
          const nextTag = tagList[currentIndex + 1]

          const afterNextTagOffsetLeft = nextTag.$el.offsetLeft + nextTag.$el.offsetWidth + tagAndTagSpacing

          const beforePrevTagOffsetLeft = prevTag.$el.offsetLeft - tagAndTagSpacing

          if (afterNextTagOffsetLeft > $scrollWrapper.scrollLeft + $containerWidth) {
            $scrollWrapper.scrollLeft = afterNextTagOffsetLeft - $containerWidth
          } else if (beforePrevTagOffsetLeft < $scrollWrapper.scrollLeft) {
            $scrollWrapper.scrollLeft = beforePrevTagOffsetLeft
          }
        }
      }

    }
  }
</script>


<style lang="scss" scoped>
  .scroll-container {
    white-space: nowrap;
    position: relative;
    overflow: hidden;
    width: 100%;
    ::v-deep {
      .el-scrollbar__bar {
        bottom: 0px;
      }
      .el-scrollbar__wrap {
        height: 49px;
      }
    }
  }
</style>
