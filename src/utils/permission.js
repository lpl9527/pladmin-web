/*
    权限检测*/
import store from '@/store'

/**
 * 检查用户是否有某些角色
 * @param value 角色数组
 */
export default function checkPermission(value) {
  if (value && value instanceof Array && value.length > 0) {
    //获取用户拥有的角色数组
    const roles = store.getters && store.getters.roles
    //要验证的角色数组
    const permissionRoles = value

    //获取拥有的角色数组
    const hasPermission = roles.some(role => {
      return permissionRoles.includes(role)
    })

    if (!hasPermission) {
      return false
    }
    //如果拥有其中一个角色，返回true
    return true
  }else {
    return false
  }
}
