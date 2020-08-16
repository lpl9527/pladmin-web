<!--
    图标选择器-->
<template>
  <div class="icon-body">
    <!--图标搜索框-->
    <el-input v-model="name" style="position: relative;" clearable placeholder="请输入图标名称" @clear="filterIcons" @input.native="filterIcons">
      <i slot="suffix" class="el-icon-search el-input__icon" />
    </el-input>
    <!--图标展示列表-->
    <div class="icon-list">
      <div v-for="(item, index) in iconList" :key="index" @click="selectedIcon(item)">
        <svg-icon :icon-class="item" style="height: 30px;width: 16px;" />
        <span>{{ item }}</span>
      </div>
    </div>
  </div>
</template>

<script>

  import icons from './requireIcons'    //导入所有的图标

  export default {
    name: "IconSelect",
    data() {
      return {
        name: '',
        iconList: icons
      }
    },
    methods: {
      //搜索图标
      filterIcons() {
        this.iconList = icons
        if (this.name) {
          this.iconList = this.iconList.filter(item => item.includes(this.name))
        }
      },
      //选择图标
      selectedIcon(name) {
        this.$emit('selected', name)
        document.body.click()
      },
      //重置图标列表
      reset() {
        this.name = ''
        this.iconList = icons
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .icon-body {
    width: 100%;
    padding: 10px;
    .icon-list {
      height: 200px;
      overflow-y: scroll;
      div {
        height: 30px;
        line-height: 30px;
        margin-bottom: -5px;
        cursor: pointer;
        width: 33%;
        float: left;
      }
      span {
        display: inline-block;
        vertical-align: -0.15em;
        fill: currentColor;
        overflow: hidden;
      }
    }
  }
</style>
