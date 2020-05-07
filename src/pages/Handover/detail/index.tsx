import { PlusOutlined } from '@ant-design/icons';
import { Button, Card, Descriptions, Steps, Table, DatePicker, Collapse, message, Modal, notification } from 'antd';
import React, { useState, useMemo } from 'react';
import { PageHeaderWrapper, GridContent, RouteContext } from '@ant-design/pro-layout';
import ProTable, { ProColumns } from '@ant-design/pro-table';
import { getEPHandoverDetailMessage, getTrialData, updateEpMessage } from './service';
import { HandoverDetailMessage } from '@/pages/Handover/detail/data';
import { history } from 'umi'
import CreateEpHandoverByCodeForm , { AddFormValueType }from './components/CreateEpHandover';
import UpdateEpHandoverByCodeForm , { UpdateFormValueType }from './components/UpdateEpHandover';
import { addEpMessage } from '../basic/service';
import { EPHandoverMessageItem } from '../basic/data';
import moment from 'moment';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import TrialCalcTable from './components/TrialCalcTable';
import { TrialCalculation } from './data';



const { Step } = Steps
const { Panel } = Collapse
const outMessageColumns = [
    {
        title: '大包数量',
        dataIndex: 'bigPackageCount',
    },
    {
        title: '小件件数',
        dataIndex: 'pics',
    },
    {
        title: '主单毛重（kg）',
        dataIndex: 'mainGrossWeight',
    },
    {
        title: '主单净重（kg）',
        dataIndex: 'mainNessWeight',
    },
    {
        title: '大包号',
        dataIndex: 'bigPackageNum',
    },
]
const handoverColumns:  ProColumns<EPHandoverMessageItem>[] = [
    {
        title: 'EP交接时间',
        dataIndex: 'handoverTime',
        valueType: 'dateTime'
    },
    {
        title: '大包数量',
        dataIndex: 'bigPackageCount',
    },
    {
        title: '小件件数',
        dataIndex: 'pics',
    },
    {
        title: '主单毛重（kg）',
        dataIndex: 'mainGrossWeight',
    },
    {
        title: '主单净重（kg）',
        dataIndex: 'mainNessWeight',
    },
    {
        title: '大包号',
        dataIndex: 'bigPackageNum',
    },
    {
        title: '交接是否存在异常',
        dataIndex: 'isError',
    },
    {
        title: '交接凭证',
        dataIndex: 'certificate',
    },
]
const handoverRecordColumns:  ProColumns<EPHandoverMessageItem>[] = [
    {
        title: 'EP交接时间',
        dataIndex: 'handoverTime',
        valueType: 'dateTime'
    },
    {
        title: '大包数量',
        dataIndex: 'bigPackageCount',
    },
    {
        title: '小件件数',
        dataIndex: 'pics',
    },
    {
        title: '主单毛重（kg）',
        dataIndex: 'mainGrossWeight',
    },
    {
        title: '主单净重（kg）',
        dataIndex: 'mainNessWeight',
        render: (text) => {
        return <span style={{color: 'red'}}>{text}</span>
        }
    },
    {
        title: '大包号',
        dataIndex: 'bigPackageNum',
    },
    {
        title: '交接是否存在异常',
        dataIndex: 'isError',
    },
    {
        title: '交接凭证',
        dataIndex: 'certificate',
    },
]
/**
 * 添加节点
 * @param fields
 */
const handleAdd = async (fields: AddFormValueType) => {
    const hide = message.loading('正在添加');
    try {
        await addEpMessage({...fields});
        hide();
        message.success('添加成功');
        return true;
    } catch (error) {
        hide();
        message.error('添加失败请重试！');
        return false;
    }
};

/**
 * 编辑节点
 * @param fields
 */
const handleUpdate = async (fields: UpdateFormValueType) => {
    const hide = message.loading('正在修改');
    try {
        await updateEpMessage({...fields});
        hide();
        message.success('修改成功');
        return true;
    } catch (error) {
        hide();
        message.error('修改失败请重试！');
        return false;
    }
};

const { confirm } = Modal;

function showConfirm() {
    confirm({
        title: '请再次确认是否进行试算?',
        icon: <ExclamationCircleOutlined />,
        content: '开始试算后将不允许修改交接信息',

        okType: 'danger',

        onOk() {
            console.log('OK');
        },
        onCancel() {
            console.log('Cancel');
        },
    });
}
// 暂且放在这里 全局提示
const openNotificationWithIcon = (type: React.ReactText, nessage: string, description: string) => {
    //@ts-ignore
    notification[type]({
        message: nessage,
        description:
            description,
    });
};

const TableList: React.FC<{}> = () => {
    const location = history.location;
    const forecastCode: string = location.search.split('=')[1]
    const [handoverDetailMessage, handleHandoverDetailMessage] = useState<HandoverDetailMessage>({});
    const [createHandoverByCodeMessage, handleCreateHandoverByCodeMessage] = useState<boolean>(false);
    const [updateHandoverByCodeMessage, handleUpdateHandoverByCodeMessage] = useState<boolean>(false);
    const [updateHandover,handleUpdateHandover] = useState({})
    const [trialDataModal, handleTrialDataModal] = useState<boolean>(false);
    const [trialData, handleTrialData] = useState<TrialCalculation[]>([]);
    const [trialDate, handleTrialDate] = useState<string | null>(null);
    useMemo((): any => {
        if (forecastCode !== undefined) {
            // 获取基本信息
            getEPHandoverDetailMessage(forecastCode).then(
                resp => {


                    if (resp.success) {
                        handleHandoverDetailMessage(resp.data as HandoverDetailMessage)
                    } else {
                        openNotificationWithIcon('info', '试算提醒', '正在试算中，请稍后查询')
                        return
                    }

                }
            ).catch(
                err => {
                    console.log(err)
                }
            )
        }

    }, [])
    // 编辑交接信息表格初始化
    function getInitialValue(handoverMessage: EPHandoverMessageItem): EPHandoverMessageItem {
        let temp = handoverMessage
        temp.handoverTime = moment(handoverMessage.handoverTime, 'yyyy-MM-dd HH:mm:ss')
        return temp
    }
    return (
        <PageHeaderWrapper title="EP交接详细信息">
            <GridContent>
                {/* 基本信息 */}
                <Card title="基本信息" style={{ marginBottom: 24 }} bordered={false}>
                    {
                        handoverDetailMessage.basicMesage &&
                        <Descriptions style={{ marginBottom: 24 }}>
                            <Descriptions.Item label="EP服务">{handoverDetailMessage.basicMesage.serviceCode + '-' + handoverDetailMessage.basicMesage.serviceName}</Descriptions.Item>
                            <Descriptions.Item label="预报编号">{handoverDetailMessage.basicMesage.forecastCode}</Descriptions.Item>
                            <Descriptions.Item label="业务类型">{handoverDetailMessage.basicMesage.businessType}</Descriptions.Item>
                            <Descriptions.Item label="EP供应商">{handoverDetailMessage.basicMesage.supplierCode + '-' + handoverDetailMessage.basicMesage.supplierName}</Descriptions.Item>
                            <Descriptions.Item label="预报发出时间">
                                {handoverDetailMessage.basicMesage.epSendTime}
                            </Descriptions.Item>
                            <Descriptions.Item label="业务编号">
                                {handoverDetailMessage.basicMesage.serviceCode}
                            </Descriptions.Item>
                        </Descriptions>
                    }
                </Card>
                {/* 流程进度 */}
                <Card title="流程进度" style={{ marginBottom: 24 }} bordered={false}>
                    {
                        <RouteContext.Consumer>
                            {({ isMobile }) => (

                                handoverDetailMessage.processMessage &&
                                <Steps size="small" progressDot
                                    direction={isMobile ? 'vertical' : 'horizontal'}
                                    current={handoverDetailMessage.processMessage.length - 1}
                                >
                                    <Step title="未处理" description={handoverDetailMessage.processMessage[0] && handoverDetailMessage.processMessage[0].date} />
                                    <Step title="处理中" description={handoverDetailMessage.processMessage[1] && handoverDetailMessage.processMessage[1].date} />
                                    <Step title="已确认" description={handoverDetailMessage.processMessage[2] && handoverDetailMessage.processMessage[2].date} />
                                    <Step title="试算中" description={handoverDetailMessage.processMessage[3] && handoverDetailMessage.processMessage[3].date} />
                                    <Step title="试算完成" description={handoverDetailMessage.processMessage[4] && handoverDetailMessage.processMessage[4].date} />
                                    <Step title="已提交" description={handoverDetailMessage.processMessage[5] && handoverDetailMessage.processMessage[5].date} />
                                </Steps>
                            )}
                        </RouteContext.Consumer>
                    }

                </Card>

                <Card title="出库信息" style={{ marginBottom: 24 }} bordered={false}>
                    <Table
                        rowKey="id"
                        pagination={false}
                        //   loading={loading}
                        //   dataSource={advancedOperation1}
                        columns={outMessageColumns}
                        dataSource={handoverDetailMessage.outMessage}
                    />
                </Card>
                <Card title="交接信息" style={{ marginBottom: 24 }} bordered={false}>
                    <ProTable<EPHandoverMessageItem>
                        type="cardList"
                        columns={handoverColumns}
                        dataSource={handoverDetailMessage.handoverMessage}
                        search={false}
                        rowKey="key"
                        toolBarRender={(action, { selectedRows }) => {
                            let process = handoverDetailMessage.processMessage ? handoverDetailMessage.processMessage.length : 0
                            return [
                                process === 1 && handoverDetailMessage.processMessage && <Button style={{ float: 'left' }} icon={<PlusOutlined />} type="primary" onClick={() => {
                                    handleCreateHandoverByCodeMessage(true)
                                }}>
                                    填写交接信息
                  </Button>,
                                process < 4 && process > 1 && <Button style={{ float: 'left' }} icon={<PlusOutlined />} type="primary" onClick={() => {
                                    if (handoverDetailMessage&&handoverDetailMessage.handoverMessage){
                                        handleUpdateHandover(getInitialValue(handoverDetailMessage.handoverMessage[0]))
                                        handleUpdateHandoverByCodeMessage(true);
                                    }
                                 
                                }}>
                                    修改
                  </Button>,
                                process < 4 && process > 1 && <Button style={{ float: 'left' }} icon={<PlusOutlined />} type="primary" onClick={() => {

                                }}>
                                    确认交接
                   </Button>,

                                (process >= 3) && <DatePicker

                                    format="YYYY-MM-DD HH:mm:ss"
                                    showTime
                                    placeholder="计费时间"
                                    value={trialDate === null ? null : moment(trialDate, 'YYYY-MM-DD HH:mm:ss')}
                                    onChange={(val) => {
                                        console.log(val)
                                        handleTrialDate(val === null ? null : val.format('YYYY-MM-DD HH:mm:ss'))
                                    }}

                                />,
                                (process >= 3 && process <= 5) && <Button style={{ float: 'left' }} icon={<PlusOutlined />} type="primary" onClick={
                                    () => {
                                        if (trialDate !== null) {
                                            showConfirm()
                                        } else {
                                            openNotificationWithIcon('info', '试算提醒', '请选择计费时间')
                                        }
                                    }
                                }>
                                    试算
                  </Button>,
                                (process >= 4) && <Button style={{ float: 'left' }} type="link" onClick={() => {
                                    // 查询

                                    getTrialData(forecastCode).then(
                                        resp => {
                                            if (resp.success) {
                                                handleTrialData(resp.data)
                                                handleTrialDataModal(true)
                                            }

                                        }
                                    ).catch(
                                        err => {
                                            console.log(err)

                                        }
                                    )
                                    // 显示
                                }}>
                                    查看试算结果
                  </Button>,
                                (process === 4 || process == 5) && <Button icon={<PlusOutlined />} type="primary" onClick={() => { }}>
                                    确认提交
                  </Button>,]
                        }
                        }
                        pagination={false}
                    ></ProTable>
                    <Collapse defaultActiveKey={['1']} >
                        <Panel header="改动记录" key="1">
                            <div className="table-title">
                                <p>XXXX 修改了记录 2000-10-01 22:22:11</p>
                            </div>
                            <ProTable<EPHandoverMessageItem>
                                search={false}
                                toolBarRender={false}
                                rowKey="key"
                                pagination={false}
                                //   loading={loading}
                                //   dataSource={advancedOperation1}
                                columns={handoverRecordColumns}
                                dataSource={handoverDetailMessage.handoverMessage}


                            />
                        </Panel>

                    </Collapse>
                </Card>
            </GridContent>
            {/* 新建交接信息 */}
            <CreateEpHandoverByCodeForm forecastCode={forecastCode}
                onSubmit={async (value) => {
                    const success = await handleAdd(value);
                    if (success) {
                        handleCreateHandoverByCodeMessage(false);
                    }
                }}
                onCancel={() => handleCreateHandoverByCodeMessage(false)}
                modalVisible={createHandoverByCodeMessage}
            />
            {/* 更新交接信息 */}
            {
                updateHandover && Object.keys(updateHandover).length ?
                <UpdateEpHandoverByCodeForm
                    handoverMessage={updateHandover}
                    onSubmit={async (value) => {
                        const success = await handleUpdate(value);
                        if (success) {
                            handleUpdateHandoverByCodeMessage(false);
                            handleUpdateHandover({});
                        }
                    }}
                    onCancel={() => {
                        handleUpdateHandoverByCodeMessage(false)
                        handleUpdateHandover({});
                        }
                    }
                    modalVisible={updateHandoverByCodeMessage}
                />
                : null
            }
            {/* 查询试算结果 */}
            <TrialCalcTable
                onSubmit={async () => {
                    handleTrialDataModal(false);
                }}
                onCancel={() => handleTrialDataModal(false)}
                modalVisible={trialDataModal}
                trialCalcData={trialData}
            />
        </PageHeaderWrapper>
    ) ;
};

export default TableList;
