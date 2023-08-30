/**
 * @Description: 车站相关接口
 * @Author: OceanH
 * @Date: 2023-08-30 16:02:35
 */
import http from 'axios';

// 获取常用车站列表
export const getFamiliarStation = async () => {
  return await http.get(`/query/station/getFamiliarStation?size=20`);
};

// 获取车站详情信息
export const getAllStations = async () => {
  return await http.get(`/query/station/getAllStations`);
};