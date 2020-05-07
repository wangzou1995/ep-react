import React from 'react';
import { TrialCalculation } from '../data';
import { Table,Modal } from 'antd';
interface TrialCalculationProps {
    modalVisible: boolean;
    onSubmit: () => void;
    onCancel: () => void;
    trialCalcData: TrialCalculation []
}

const TrialCalcTable: React.FC<TrialCalculationProps> = (props) => {
    const {modalVisible,onSubmit,onCancel,trialCalcData} = props
    const columns = [
        {
            title: '国家',
            dataIndex: 'countryName',
        },
        {
            title: '小件件数',
            dataIndex: 'pics',
        },
        {
            title: '小件总重量（应付出库 ）',
            dataIndex: 'weight',
        },
        {
            title: 'E值',
            dataIndex: 'eValue',
        },
    ]
    return (
        <Modal
        destroyOnClose
        title="试算结果明细"
        visible={modalVisible}
        onOk={onSubmit}
        onCancel={() => onCancel()}
        width={800}
        okText="确认"
        cancelText="取消"
    >
        <Table rowKey="id" columns={columns} dataSource={trialCalcData} />
        </Modal>
    )
}
export default TrialCalcTable



