<template>
  <component v-bind="linkProps(to)">
    <!--放置一个插槽，用于放置要跳转的连接信息-->
    <slot/>
  </component>
</template>

<script>

  import {isExternal} from "../../../utils/validate";

	export default {
		name: "Link",
    props: {
      to: {
        type: String,
        require: true
      }
    },
    methods: {
      linkProps(url) {
        if (isExternal(url)) {
          return {
            is: 'a',
            href: 'url',
            target: '_blank',
            rel: 'noopener'
          }
        }
        return {
          is: 'router-link',
          to: url
        }
      }
    }
	}
</script>

<style scoped>

</style>
