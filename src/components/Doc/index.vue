<!--
    项目介绍文档，可以不使用-->
<template>
  <div>
    <svg-icon icon-class="doc" @click="click" />
  </div>
</template>

<script>
	export default {
		name: "Doc",
    methods: {
		  click() {   //点击新窗口打开文档
		    window.open('https://www.baidu.com/', '_blank')
      }
    }
	}
</script>

<style scoped>

</style>
