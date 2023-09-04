/**
 * @Description: 公共请求方法封装
 * @Author: OceanH
 * @Date: 2023-09-04 16:39:18
 */
import axios from 'axios';

export const requestApi = async (config) => {
  try {
    const { data: res } = await axios.request(config);
    return [res.data, null];
  } catch (err) {
    return [null, err.response.data];
  }
};
