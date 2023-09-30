/**
 * @Description: 管理员相关接口
 * @Author: OceanH
 * @Date: 2023-09-04 18:20:31
 */
import { requestApi } from "./request";

// 获取用户权限等级
export const checkUserPermission = async () => {
  return await requestApi({
    url: '/manager/checkPermission',
    method: 'get'
  });
};

// 班次管理-查询班次
export const getShuttleInfoList = async (params) => {
  return await requestApi({
    url: '/manager/getShuttleInfoList',
    method: 'post',
    data: params,
  });
};

// 班次管理-新建班次
export const createShuttleInfo = async (params) => {
  return await requestApi({
    url: '/manager/createShuttleInfo',
    method: 'post',
    data: params,
  });
};

// 班次管理-更新班次使用状态
export const changeShiftStatus = async (params) => {
  return await requestApi({
    url: '/manager/changeShuttleStatus',
    method: 'get',
    params,
  });
};