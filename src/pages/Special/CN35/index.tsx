import React from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import ProTable, { ProColumns } from '@ant-design/pro-table';
import { Button, Card, Form, Input } from 'antd';
import { CN35DataItem } from './data';
import { PlusOutlined } from '@ant-design/icons';
import { getCN35 } from './service';
import CN35Debug from './components/CN35Debug';
const CN35: React.FC<{}> = () => {
    const columns: ProColumns<CN35DataItem>[] = [
        {
            title: '批次号',
            dataIndex: 'batchCode',
            valueType: 'text',
        },
        {
            title: '大包号',
            dataIndex: 'bigPackCode',
            hideInSearch: true
        },
        {
            title: '打印次数',
            dataIndex: 'printCount',
            hideInSearch: true
        },
        {
            title: '备注',
            dataIndex: 'remark',
            hideInSearch: true
        },
        {
            title: 'CN35 Number',
            dataIndex: 'cn35Number',
            hideInSearch: true
        },
        {
            title: '国家',
            dataIndex: 'companyCode',
            hideInSearch: true
        },
        {
            title: '袋牌号',
            dataIndex: 'bagCode',
            hideInSearch: true
        },
        {
            title: '大包毛重（KG）',
            dataIndex: 'grossWeight',
            hideInSearch: true
        },
        {
            title: '小件数量',
            dataIndex: 'pics',
            hideInSearch: true
        },
        {
            title: 'Destination Port',
            dataIndex: 'destinationPort',
            hideInSearch: true
        },
        {
            title: '供应商批次号',
            dataIndex: 'supplierBatchCode',
            hideInSearch: true
        },
    ]
    return (
        <PageHeaderWrapper>
        
            <ProTable style={{ float: 'left', width: '78%' }}

                rowKey="id"
                columns={columns}
                toolBarRender={(action, { selectedRows }) => [
                    <Button icon={<PlusOutlined />} type="primary" onClick={() => {

                    }}>
                        导出EXCEL
      </Button>,
                    <Button icon={<PlusOutlined />} type="primary" onClick={() => {

                    }}>
                        上传CN35
</Button>,
                    <Button icon={<PlusOutlined />} type="primary" onClick={() => { }}>
                        删除该批次CN35
      </Button>,
                    <Button icon={<PlusOutlined />} type="primary" onClick={() => { }}>
                        该批次处理完成
      </Button>,
                ]}
                request={(params: any) => {
                    return getCN35(params)

                }
                }
            />
             <CN35Debug style={{width:'20%', float: 'right'}} />
        </PageHeaderWrapper>
    )

}

export default CN35