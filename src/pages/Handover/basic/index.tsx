import { PlusOutlined, SearchOutlined } from '@ant-design/icons';
import { Button,message } from 'antd';
import React, { useRef, ReactNode, useEffect } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import ProTable from '@ant-design/pro-table';
import { history } from 'umi'
import { getEPHandoverMessage, getEpService, addEpMessage} from './service';
import { EPHandoverMessageItem } from './data';
import { ActionType, ProColumns } from '@ant-design/pro-table/lib/Table';
import { StatusType } from '@ant-design/pro-table/lib/component/status';
import { useState } from 'react';
import CreateEpHandoverForm from './components/CreateEpHandover';

import { FormValueType } from '@/pages/Handover/basic/components/CreateEpHandover';
import ImportEpHandoverForm from './components/ImportEpHandover';



/**
 * 添加节点
 * @param fields
 */
const handleAdd = async (fields: FormValueType) => {
    const hide = message.loading('正在添加');
    try {
      await addEpMessage(fields);
      hide();
      message.success('添加成功');
      return true;
    } catch (error) {
      hide();
      message.error('添加失败请重试！');
      return false;
    }
  };


const HandoverBasicMessage: React.FC<{}> = () => {
    const [createModalVisible, handleCreateModalVisible] = useState<boolean>(false);
    const [importModalVisible, handleImportModalVisible] = useState<boolean>(false);
    const [service, handleService] = useState<{
        [key: string]: {
            text: ReactNode;
            status: StatusType;
        } | ReactNode;
    }>({})
    /**
     * 定义获取服务明细
     */
    function serviceFun() {
        let serviceData: {
            [key: string]: {
                text: ReactNode;
                status: StatusType;
            } | ReactNode;
        } = {}
        getEpService().then(
            resp => {
                console.log('go then')
                resp.data.forEach((element: any) => {
                    let temp: any = {}
                    temp[element.serviceCode] = {
                        text: element.serviceCode + '-' + element.serviceName
                    }
                    serviceData = { ...serviceData, ...temp }
                });
                console.log('init service', serviceData)
                handleService(serviceData)
            }
        ).catch(
            err => {
                console.log('err', err)

            }
        )


    }
    useEffect(() => {
        serviceFun()
    }, [])
    const actionRef = useRef<ActionType>();
    // 表格字段数据
    const columns: ProColumns<EPHandoverMessageItem>[] = [
        {
            title: '服务编号',
            dataIndex: 'serviceCode',
            valueEnum: service,
        },
        {
            title: '服务名称',
            dataIndex: 'serviceName',
            hideInSearch: true
        },
        {
            title: '供应商编号',
            dataIndex: 'supplierCode',
        },
        {
            title: '供应商名称',
            dataIndex: 'supplierName',
            hideInSearch: true
        },
        {
            title: '预报编号',
            dataIndex: 'forecastCode',
        },
        {
            title: '业务编号',
            dataIndex: 'businessType',
            hideInSearch: true
        },
        {
            title: '业务编号',
            dataIndex: 'businessCode',
            hideInSearch: true
        },
        {
            title: 'EP交接时间',
            dataIndex: 'handoverTime',
            hideInSearch: true,
            valueType: 'dateTime'
        },
        {
            title: '是否存在异常',
            dataIndex: 'isError',
            hideInSearch: true
        },
        {
            title: '状态',
            dataIndex: 'status',
            valueEnum: {
                0: { text: '未处理', status: 'Default' },
                1: { text: '处理中', status: 'Processing' },
                2: { text: '已确认', status: 'Success' },
                3: { text: '试算中', status: 'Error' },
                4: { text: '试算完成', status: 'Success' },
                5: { text: '已提交', status: 'Error' },
            },
        },
        {
            title: '操作',
            dataIndex: 'option',
            valueType: 'option',
            render: (_: any, record: EPHandoverMessageItem) => (
                <>

                    <Button size="small" icon={<SearchOutlined />} shape="circle" onClick={() => {
                        history.push(
                            {
                                pathname: "/handover/detail",
                                query: {
                                    forecastCode: record.forecastCode,
                                }
                            })
                    }} />
                </>
            ),
        },
    ];
    return (
        <PageHeaderWrapper>
            <ProTable<EPHandoverMessageItem>
                headerTitle="查询表格"
                actionRef={actionRef}
                rowKey="key"
                toolBarRender={(action, { selectedRows }) => [
                    <Button icon={<PlusOutlined />} type="primary" onClick={() => {
                        handleCreateModalVisible(true)
                     }}>
                        新建
          </Button>,
                    <Button icon={<PlusOutlined />} type="primary" onClick={() => { 
                        handleImportModalVisible(true)
                    }}>
                        导入
</Button>,
                    <Button icon={<PlusOutlined />} type="primary" onClick={() => { }}>
                        导出
          </Button>,
                ]}
                request={(params: any) => getEPHandoverMessage(params)}
                columns={columns}
                rowSelection={{}}
                search
            />
            <CreateEpHandoverForm 
            onSubmit={async (value) => {
                const success = await handleAdd(value);
                if (success) {
                  handleCreateModalVisible(false);
                  if (actionRef.current) {
                    actionRef.current.reload();
                  }
                }
              }}
              onCancel={() => handleCreateModalVisible(false)}
              modalVisible={createModalVisible}
            />
            <ImportEpHandoverForm 
             onSubmit={async (value) => {
                const success = await handleAdd(value);
                if (success) {
                  handleImportModalVisible(false);
                  if (actionRef.current) {
                    actionRef.current.reload();
                  }
                }
              }}
              onCancel={() => handleImportModalVisible(false)}
              modalVisible={importModalVisible}
            />
        </PageHeaderWrapper>
    );
};

/**
 * EP交接信息查询表单
 * @author wangzou1995
 * @version 1.0
 */
export default HandoverBasicMessage;
