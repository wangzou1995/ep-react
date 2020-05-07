import request from 'umi-request';
import { EPHandoverMessageItem } from '../basic/data.d';


export async function getEPHandoverDetailMessage(params: string) {
  return await request('/api/EPHandoverDetail', {
    params: {
      forcecastCode: params,
    },
    method: 'GET'
  });
}
export async function getTrialData(params: string) {
  return await request('/api/trialData', {
    params: {
      forcecastCode: params,
    },
    method: 'GET'
  });
}
/**
 * 新增ep交接信息
 */
export async function updateEpMessage(params: EPHandoverMessageItem) {
  return request('/api/addEpMessage', {
    method: 'POST',
    data: {
      ...params,
      method: 'post',
    },
  });
}