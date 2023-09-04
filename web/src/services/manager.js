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