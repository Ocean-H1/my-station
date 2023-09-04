/**
 * @Description: 乘车码相关接口
 * @Author: OceanH
 * @Date: 2023-09-04 21:16:40
 */
import { requestApi } from "./request";

// 发送乘车码短信
export const sendRideCode = async (params) => {
  return await requestApi({
    url: '/query/rideCode/sendRideCode',
    method: 'get',
    params
  });
};