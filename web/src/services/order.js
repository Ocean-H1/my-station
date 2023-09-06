/**
 * @Description: 订单相关接口
 * @Author: OceanH
 * @Date: 2023-09-04 20:39:25
 */
import { requestApi } from "./request";

// 提交预定订单
export const bookOrder = async (params) => {
  return await requestApi({
    url: '/order/bookOrder',
    method: 'post',
    data: params
  });
};

// 支付接口
export const payOrder = async (params) => {
  return await requestApi({
    url: `/order/payOrder`,
    method: 'get',
    params,
  });
};