/**
 *  Create By Yufei
 *
 */

/**
 * @function 判断外部路径
 * @param { '' } path
 * @returns
 */

export default function isExternal(path) {
  return /^(https?:|http:|mailto:|tel)/.test(path);
}

/**
 * @function 密码验证  必须包含数字、英文字母、特殊符号且大于等于8位（特殊符号包括: ~!@#$%^&*）
 * @param { '' } value
 * @returns
 */
export function validatePass(value = '') {
  const reg = /^(?=.*\d)(?=.*[a-zA-Z])[\da-zA-Z~!@#$%^&*]{6,18}$/;
  return value.match(reg);
}

/**
 * @function 手机号验证
 * @param { '' } value
 * @returns
 */
export function validatePhone(value = '') {
  const reg = /^13[0,9]|14[01456879]|15[0-35-9]|16[2567]|17[0,8]|18[0,9]|19[0-35-9]\d{9}/gm;
  return value.match(reg);
}
/**
 *
 * @function 用户名只允许出现中文/字母/数字/下划线,  但不允许以下划线开头或结束,不允许以数字开头
 * @param { '' } value
 * @returns
 */
export function validateUserName(value = '') {
  const reg = /^(?!_)(?!.*?_$)(?!\d)[a-zA-Z0-9_\u4e00-\u9fa5]+$/;
  return value.match(reg);
}
