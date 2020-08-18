<!--SQL监控组件-->
<template>
  <pl-frame :src="sqlApi" />
</template>

<script>

  import { mapGetters } from 'vuex'
  import plFrame from '../../../components/Iframe/index'    //自定义弹窗

  export default {
    name: "Sql",
    components: {
      plFrame
    },
    computed: {
      ...mapGetters([
        'sqlApi'    //druid sql监控地址
      ])
    }
  }
</script>
