const getters = {
  token: (state) => state.user.token,
  role: (state) => state.user.role,
  alertList: (state) => state.alert.alertList,
  alertType: (state) => state.alert.alertType,
  alertLine: (state) => state.alert.alertLine,
  alertTypeText: (state) => state.alert.alertTypeText,
};
export default getters;
