import { Moment } from 'moment';
/**
 * ep交接信息数据类型
 */
export interface EPHandoverMessageItem {
  key: number; // key
  serviceCode: string; // 服务编号
  serviceName: string; // 服务名称
  supplierCode: string; // 供应商编号
  supplierName: string; // 供应商名称
  forecastCode: string; // 预报编号
  businessType: string; // 业务类型
  businessCode: string; // 业务编号
  mainGrossWeight?: number; // 主单毛重
  mainNessWeight?: number; // 主单净重
  bigPackageCount?: number; // 大包数量
  bigPackageNum?: string; // 大包号
  pics?: number; // 小件建树
  certificate?: number; // 凭证个数
  handoverTime: string | Moment; // 交接时间
  epSendTime: string // ep发送时间
  isError: boolean; // 是否存在异常
  status: number; // 状态
  remark?: string; // 备注
}
export interface EPHandoverMessagePagination {
  total: number;
  pageSize: number;
  current: number;
}

export interface EPHandoverMessageData {
  list: EPHandoverMessageItem[];
  pagination: Partial<EPHandoverMessagePagination>;
}

export interface EPHandoverMessageParams {
  serviceName?: string;
  supplierName?: string;
  status?: number;
  forecastCode?: string;
  pageSize?: number;
  currentPage?: number;
}
