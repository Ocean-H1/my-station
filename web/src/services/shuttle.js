/**
 * @Description: 线路相关接口
 * @Author: OceanH
 * @Date: 2023-08-30 16:02:35
 */
import { requestApi } from "./request";

// 获取热门线路列表
export const getFamiliarShuttles = async (params) => {
  // return await http.get(`/query/shuttle/getFamiliarShuttles`, {
  //   params,
  // });
  return await requestApi({
    url: '/query/shuttle/getFamiliarShuttles',
    method: 'get',
    params
  });
};