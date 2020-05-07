import { CN35Params } from './data';
import { request } from 'umi';
/**
 * 查询EP接受信息
 * @param params EPHandoverMessageItem
 */
export async function getCN35(params?: CN35Params) {
    return request('/special/getCN35ByCode', {
      params,
    });
  }
  