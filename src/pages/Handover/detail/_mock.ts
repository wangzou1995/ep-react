
import { Request, Response } from 'express';
import { parse } from 'url';
import { HandoverDetailMessage, Process, OutMessageItem, BasicMessageItem } from './data.d';
import mockjs from 'mockjs';
import { EPHandoverMessageItem } from '../basic/data.d';
import { TrialCalculation } from './data.d';

const { Random } = mockjs


let handoverDetailMessage: HandoverDetailMessage = {};
/**
 * 创建交接明细
 * @param epCode 预报编号
 */
function createEpHandoverDetailMesage(epCode: string) {
    handoverDetailMessage = {
        basicMesage: createBasicMessage(epCode),
        processMessage: createProcessMessage(),
        outMessage: createOutMessage(),
        handoverMessage: createHandoverMessage(epCode),
    }
}
/**
 * 创建基础信息
 * @param epCode 预报编号
 */
function createBasicMessage(epCode: string): BasicMessageItem {
    return {
        key: 1,
        serviceCode: 'serviceCode',
        serviceName: `serviceName`,
        forecastCode: `${epCode}`,
        businessType: `businessType`,
        businessCode: `businessCode`,
        supplierCode: 'ss',
        supplierName: 'sss',
        epSendTime: mockjs.Random.date('yyyy-MM-dd HH:mm:ss'),

    }
}

let processTitles: string[] = ['未处理', '处理中', '已确认', '试算中', '试算完成', '已提交']

/**
 * 创建流程信息
 */
function createProcessMessage(): Array<Process> {
    let i = Math.random() * 6 
    let result: Array<Process> = []
    for (let j = 0; j < i; j++) {
        result.push({
            id: j,
            title: processTitles[j],
            date: mockjs.Random.date('yyyy-MM-dd HH:mm:ss'),
        })
    }
    return result;
}

/**
 * 创建出库信息
 */
function createOutMessage(): OutMessageItem[] {
    return [{
        id: 1,
        bigPackageCount: 52,
        pics: 60,
        mainGrossWeight: 55,
        mainNessWeight: 51,
        bigPackageNum: "xxxs23,xsds4",
    }]
}

/**
 * 创建交接信息
 */
function createHandoverMessage(forecastCode: string): EPHandoverMessageItem[] {
    return [{
        key: 1,
        bigPackageCount: 52,
        pics: 60,
        mainGrossWeight: 55,
        mainNessWeight: 51,
        bigPackageNum: "xxxs23,xsds4",
        handoverTime: (mockjs.Random.date('yyyy-MM-dd HH:mm:ss')),
        certificate: 3,
        isError: true,
        remark: '测试信息',
        forecastCode: forecastCode,
        serviceCode: `serviceCode`,
        serviceName: `serviceName`,
        supplierCode: `supplierCode`,
        supplierName: `supplierName`,
        businessType: `businessType`,
        businessCode: `businessCode`,
        status: 1,
        epSendTime: mockjs.Random.date('yyyy-MM-dd HH:mm:ss'),
    }]
}
//  创建试算信息
function createTrailData(epCode: string): TrialCalculation[] {
    let i = Math.random() * 6
    let result: TrialCalculation[] = []
    for (let j = 0; j < i; j++) {
        result.push({
            id: j,
            countryName: Random.cname(),
            pics: Math.random() * 300,
            weight: Math.random() * 500,
            eValue: Math.random() * 30
        })
    }
    return result;
}
function getDetail(req: Request, res: Response, u: string) {
    let url = u;
    if (!url || Object.prototype.toString.call(url) !== '[object String]') {
        // eslint-disable-next-line prefer-destructuring
        url = req.url;
    }
    console.log(url)
    const params = JSON.parse(JSON.stringify((parse(url, true).query as unknown)));
    createEpHandoverDetailMesage(params['forcecastCode'])

    return res.json({
        data:handoverDetailMessage,
        success: true
    });
}
function getTrial(req: Request, res: Response, u: string) {
    let url = u;
    if (!url || Object.prototype.toString.call(url) !== '[object String]') {
        // eslint-disable-next-line prefer-destructuring
        url = req.url;
    }
    console.log(url)
    const params = JSON.parse(JSON.stringify((parse(url, true).query as unknown)));
   
    return res.json(
        {
            data:createTrailData(params['forcecastCode']),
            success: true
        });
}
export default {
    'GET /api/EPHandoverDetail': getDetail,
    'GET /api/trialData': getTrial,
};
