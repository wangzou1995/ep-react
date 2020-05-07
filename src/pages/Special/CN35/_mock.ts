import mockjs from 'mockjs';
import { parse } from 'url';
import { Request, Response } from 'express';
import { CN35DataItem } from './data.d';
const { Random } = mockjs

let CN35DataSource: CN35DataItem[] = [];

function getCN35(req: Request, res: Response, u: string) {
    let url = u;
    if (!url || Object.prototype.toString.call(url) !== '[object String]') {
        // eslint-disable-next-line prefer-destructuring
        url = req.url;
    }
    const params = JSON.parse(JSON.stringify((parse(url, true).query as unknown)));
    CN35DataSource = []
    if (params.batchCode !== undefined) {
        for (let i = 0; i < 10; i++) {
            CN35DataSource.push({
                id: i,
                batchCode: params.batchCode,
                bigPackCode: Random.string(10),
                printCount: Math.random() * 1000,
                remark: Random.paragraph(1, 2),
                cn35Number: Random.string(10),
                companyCode: Random.string(2),
                bagCode: Random.string(10),
                grossWeight: Math.random() * 20,
                pics: Math.random() * 34,
                destinationPort: 'N/A',
                supplierBatchCode: Random.string(10),

            }
            )
        }
    }
    let result = {
        data: CN35DataSource,
        success: true
    }
    return res.json(result);
}



export default {
    'GET /special/getCN35ByCode': getCN35
};