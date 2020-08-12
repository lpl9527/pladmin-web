import permission from './permission'

//注册permission指令，
const install = function(Vue) {
  Vue.directive('permission', permission)
}

//el : 指令所绑定的元素，可以用来直接操作DOM。binding: 一个对象，包含指令的很多信息。vnode: VUE编译生成的虚拟节点。

if (window.Vue) {
  window['permission'] = permission
  Vue.use(install);
}

permission.install = install
export default permission
