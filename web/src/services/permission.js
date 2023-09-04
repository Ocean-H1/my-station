/**
 * @Description: 权限相关请求
 * @Author: OceanH
 * @Date: 2023-09-04 16:52:32
 */
import { requestApi } from './request';

// 登录
export const loginAsync = async (params) => {
  return await requestApi({
    url: '/permissions/login',
    method: 'post',
    data: params
  });
};

// 获取验证码图片
export const getCheckCodeImg = async () => {
  return await requestApi({
    url: '/permissions/getCheckCodePicture',
    method: 'get'
  });
};
