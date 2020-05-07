
// eslint-disable-next-line import/no-extraneous-dependencies
import { Request, Response } from 'express';
import { parse } from 'url';
import { EPHandoverMessageItem, EPHandoverMessageParams } from './data.d';
import mockjs from 'mockjs';


// mock tableListDataSource
let tableListDataSource: EPHandoverMessageItem[] = [];
for (let i = 0; i < 10; i += 1) {
    tableListDataSource.push({
        key: i,
        serviceCode: `serviceCode${i}`,
        serviceName: `serviceName${i}`,
        supplierCode: `supplierCode${i}`,
        supplierName: `supplierName${i}`,
        forecastCode: `forecastCode${i}`,
        businessType: `businessType${i}`,
        businessCode: `businessCode${i}`,
        handoverTime: mockjs.Random.date('yyyy-MM-dd HH:mm:ss'),
        isError: true,
        status: i % 6,
        epSendTime: mockjs.Random.date('yyyy-MM-dd HH:mm:ss'),
    });
}
// mock serviceDownSource
let serviceDownSource: {} [] = [];
for (let i = 0; i < 10; i += 1) {
    serviceDownSource.push({
        key: i,
        serviceCode: i,
        serviceName: `serviceName${i}`,
    })
}

function getRule(req: Request, res: Response, u: string) {
    let url = u;
    if (!url || Object.prototype.toString.call(url) !== '[object String]') {
        // eslint-disable-next-line prefer-destructuring
        url = req.url;
    }

    const params = (parse(url, true).query as unknown) as EPHandoverMessageParams;

    let dataSource = tableListDataSource;


    let pageSize = 10;
    if (params.pageSize) {
        pageSize = parseInt(`${params.pageSize}`, 0);
    }

    const result = {
        data: dataSource,
        total: dataSource.length,
        success: true,
        pageSize,
        current: parseInt(`${params.currentPage}`, 10) || 1,
    };

    return res.json(result);
}

function postRule(req: Request, res: Response, u: string, b: Request) {
    let url = u;
    if (!url || Object.prototype.toString.call(url) !== '[object String]') {
        // eslint-disable-next-line prefer-destructuring
        url = req.url;
    }

    const body = (b && b.body) || req.body;
    const { method, name, desc, key } = body;

    switch (method) {
        /* eslint no-case-declarations:0 */
        case 'delete':
            tableListDataSource = tableListDataSource.filter((item) => key.indexOf(item.key) === -1);
            break;
        case 'post':
            const i = Math.ceil(Math.random() * 10000);
            tableListDataSource.unshift({
                key: i,
                serviceCode: `serviceCode ${i}`,
                serviceName: `serviceName ${i}`,
                supplierCode: `supplierCode ${i}`,
                supplierName: `supplierName ${i}`,
                forecastCode: `forecastCode ${i}`,
                businessType: `businessType ${i}`,
                businessCode: `businessCode ${i}`,
                handoverTime: mockjs.Random.date('YYYY-MM-dd HH:mm:ss'),
                isError: true,
                status: i % 6,
                epSendTime: mockjs.Random.date('YYYY-MM-dd HH:mm:ss'),
            });
            break;
        case 'update':
            tableListDataSource = tableListDataSource.map((item) => {
                if (item.key === key) {
                    return { ...item, desc, name };
                }
                return item;
            });
            break;
        default:
            break;
    }

    const result = {
        list: tableListDataSource,
        pagination: {
            total: tableListDataSource.length,
        },
    };

    return res.json(result);
}
function getService(req: Request, res: Response, u: string) {
    let url = u;
    if (!url || Object.prototype.toString.call(url) !== '[object String]') {
        // eslint-disable-next-line prefer-destructuring
        url = req.url;
    }
    const result = {
        data: serviceDownSource
    };

    return res.json(result);
}
export default {
    'GET /api/EPHandoverMessage': getRule,
    'POST /api/EPHandoverMessage': postRule,
    'GET /api/getService': getService,
};
