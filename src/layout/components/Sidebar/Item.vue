
<!--菜单项-->
<script>

  export default {
		name: "MenuItem",
    functional: true,
    props: {
		  icon: {
		    type: String,
        default: ''
      },
      title: {
		    type: String,
        default: ''
      }
    },
    render(createElement, context) {
		  const {icon, title} = context.props
      const vnodes = []

      if (icon) {
        vnodes.push(<svg-icon icon-class={icon}/>)
      }
      if (title) {
        vnodes.push(<span slot='title'>{(title)}</span>)
      }
      return vnodes
    }

  }
</script>

<style scoped>

</style>
