import store from '@/store'

const {body} = document
const WIDTH = 992

export default {
  watch: {
    $route(route) {   //设备是手机并且导航栏打开，则将导航栏关闭
      if (this.device === 'mobile' && this.sidebar.opened) {
        store.dispatch('app/closeSidebar', {withoutAnimation: false})
      }
    }
  },
  beforeMount() {
    window.addEventListener('resize', this.$_resizeHandler)
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.$_resizeHandler)
  },
  mounted() {
    const  isMobile = this.$_isMobile()
    if (isMobile) {
      store.dispatch('app/toggleDevice', 'mobile')
      store.closeSidebar('app/closeSidebar', {withoutAnimation: true})
    }
  },
  methods: {
    $_isMobile() {
      const rect = body.getBoundingClientRect()
      return rect.width - 1 < WIDTH
    },
    $_resizeHandler() {
      if (!document.hidden) {
        const isMobile = this.$_isMobile()
        //切换设备
        store.dispatch('app/toggleDevice', isMobile ? 'mobile' : 'desktop')

        if (isMobile){  //如果是手机设备，则关闭sidebar
          store.dispatch('app/closeSidebar', {withoutAnimation: true})
        }
      }
    }
  }
}
