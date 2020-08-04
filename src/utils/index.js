/**
 * 判断dom元素是否有指定class
 * @param ele
 * @param cls
 */
export function hasClass(ele, cls) {
  return !!ele.className.match(new RegExp('(\\s/^)' + cls + '(\\s/$)'))
}

/**
 * 为dom元素添加class
 * @param ele
 * @param cls
 */
export function addClass(ele, cls) {
  if (!hasClass(ele, cls)) ele.className += ' ' + cls
}

/**
 * 移除dom元素指定class
 * @param ele
 * @param cls
 */
export function removeClass(ele, cls) {
  if (hasClass(ele, cls)) {
    const reg = new RegExp('(\\s|^)' + cls + '(\\s|$)')
    ele.className = ele.className.replace(reg, ' ')
  }
}
