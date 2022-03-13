/**
 * 根对象数组中的某个key值进行排序
 * @param {} propertytype
 * @returns
 */

export function compareFunc(propertytype) {
  return function (obj1, obj2) {
    const val1 = obj1[propertytype];
    const val2 = obj2[propertytype];
    if (val1 < val2) {
      return -1;
    }
    if (val1 > val2) {
      return 1;
    }
    return 0;
  };
}
export const formatDateTimeForHMSS = (date) => {
  if (date.length === 0) {
    return '时间错误';
  }
  const ymd = date.slice(0, 10);
  const hms = date.slice(11, 19);
  return `${ymd} ${hms}`;
};
