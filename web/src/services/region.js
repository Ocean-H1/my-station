/**
 * @Description: 地区相关接口定义
 * @Author: OceanH
 * @Date: 2023-09-06 20:53:11
 */
import { requestApi } from "./request";

// 查询所有地区列表
export const getAllRegions = async () => {
  return await requestApi({
    url: '/query/region/getAllRegions',
    method: 'get',
  });
};