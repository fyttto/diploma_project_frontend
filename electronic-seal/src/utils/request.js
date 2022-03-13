/**
 * 此处对不同接口的API进行了汇总，统一管理，方便调取
 */

import { get, post } from '@/service/requestWay';

/**
 *
 *   用户信息获取接口
 */
export const getUserInfo = (parma) => get('/user/getInformation', parma); // 获取用户信息接口

/**
 *   登录模块接口
 */
export const login = (parma) => get('/user/login', parma); // 登录

/**
 *   注册模块接口
 */
export const registerInfo = (data) => post('/user/register', data); // 注册接口
export const validateSend = (phoneNumber) => get(`/user/sendMsg/${phoneNumber}`); // 短信接口

/**
 *   数据展示模块接口
 */
export const getAlertType = (parma) => get('/alert/alertTypeDistribution', parma); // 报警类型--主页数据
export const getAlertHandling = (parma) => get('/alert/alertHandlingStatistics', parma); // 报警已处理数量--主页数据
export const getAlertCount = (parma) => get('/alert/getAlertCount', parma); // 报警数量统计--主页数据
export const getOnlineEquipment = (parma) => get('/alert/equipmentOnlineStatistics', parma); // 装备数据--主页数据
export const getAlertList = (parma) => get('/alert/getAlertByUserId', parma); // 报警列表--主页数据
export const getOnlineEvery = (parma) => get('/alert/getAlertCount', parma);

/**
 *   报警查询模块接口
 */
export const getAlertDetail = (parma) => get('/alert/getAlertById', parma); // 报警详情--主页数据
export const getAlertTable = (parma) => get('/alert/getMineAndAlert', parma);

/**
 *   查询模块接口
 */
export const getAlertInfo = (parma) => get('/alert/getMoreAlert', parma);
export const getArea = (parma) => get('/area/getDetailedAreas', parma);
export const getAlertByTime = (parma) => get('/alert/getAlertByTime', parma);

// 修改报警模块
export const changeAlert = (data) => post('/alert/updateALert', data);

// 人员查询模块
export const getWorkerInfo = (parma) => get('/worker/getAllWorker', parma);
export const searchWorkerInfo = (parma) => get('/worker/queryWorker', parma);

// 设备查询模块
export const getAllVehicleInfo = (parma) => get('/vehicle/getAllVehicle', parma);
