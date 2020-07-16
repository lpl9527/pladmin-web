/*
    一些数据验证方法*/

/**
 * 判断字符串是否是https?:|mailto:|tal: 开头的
 * @param path
 * @returns {boolean}
 */
export function isExternal(path) {
  return /^(https?:|mailto:|tel:)/.test(path)
}
