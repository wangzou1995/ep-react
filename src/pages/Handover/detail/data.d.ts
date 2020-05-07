import { EPHandoverMessageItem } from "../basic/data.d";

export interface HandoverDetailMessage {
  basicMesage?: BasicMessageItem;
  processMessage?: Array<Process>
  outMessage?: Array<OutMessageItem>;
  handoverMessage?: Array<EPHandoverMessageItem>;
}
export interface BasicMessageItem {
    key: number; // key
    serviceCode: string; // 服务编号
    serviceName: string; // 服务名称
    supplierCode: string; // 供应商编号
    supplierName: string; // 供应商名称
    forecastCode: string; // 预报编号
    businessType: string; // 业务类型
    businessCode: string; // 业务编号
    epSendTime: string; // 预报发出时间
  
}
/**
 * 出库信息
 */
export interface OutMessageItem{
  id: number;
  bigPackageCount: number;
  pics: number;
  mainGrossWeight: number;
  mainNessWeight: number;
  bigPackageNum: string;
}

/**
 * 流程
 */
export interface Process {
  id: number;
  title: string;
  date: string;
}
/**
 * 试算
 */
export interface TrialCalculation {
  id: number;
  countryName: string;
  pics: number;
  weight: number;
  eValue: number
}
