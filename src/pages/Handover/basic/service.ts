import request from 'umi-request';
import { EPHandoverMessageItem } from './data.d';
/**
 * 查询EP接受信息
 * @param params EPHandoverMessageItem
 */
export async function getEPHandoverMessage(params?: EPHandoverMessageItem) {
  return request('/api/EPHandoverMessage', {
    params,
  });
}

/**
 * 获取Ep服务下拉数据源
 */
export async function getEpService() {
  return await request('/api/getService');
}

/**
 * 新增ep交接信息
 */
export async function addEpMessage(params: EPHandoverMessageItem) {
  return request('/api/addEpMessage', {
    method: 'POST',
    data: {
      ...params,
      method: 'post',
    },
  });
}
