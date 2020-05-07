import React from 'react';
import { Form, Input, Modal, Select, DatePicker, InputNumber, Switch, Upload, Button, Row, Col } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import { EPHandoverMessageItem } from '../../basic/data';





const { TextArea } = Input;
const FormItem = Form.Item;
export interface UpdateFormValueType extends EPHandoverMessageItem {

}
const normFile = (e: { fileList: any; }) => {
    console.log('Upload event:', e);
    if (Array.isArray(e)) {
        return e;
    }
    return e && e.fileList;
};

interface CreateEpHandoverFormProps {
    modalVisible: boolean;
    onSubmit: (fieldsValue: UpdateFormValueType) => void;
    onCancel: () => void;
    handoverMessage: Partial<EPHandoverMessageItem>;
}

const CreateEpHandoverByCodeForm: React.FC<CreateEpHandoverFormProps> = (props) => {


   
    const { modalVisible, onSubmit: handUpdate, onCancel, handoverMessage } = props;


    const [form] = Form.useForm();
   
    const okHandle = async () => {
        const fieldsValue = await form.validateFields() as UpdateFormValueType;
        handUpdate(fieldsValue);
    };
    return (
        <Modal
            destroyOnClose
            title="修改EP交接信息"
            visible={modalVisible}
            onOk={okHandle}
            onCancel={() => onCancel()}
            width={800}
            okText="确认"
            cancelText="取消"
            afterClose={() => onCancel()}
        >
            <Form form={form} initialValues={handoverMessage}>
                <Row gutter={24}>
                    <Col span={12}>
                        <FormItem
                            labelCol={{ span: 5 }}
                            wrapperCol={{ span: 15 }}
                            label="预报编号"
                            name="forecastCode"
                        >
                            <Input disabled={true} placeholder="请输入" />

                        </FormItem>
                    </Col>
                    <Col span={12}>
                        <FormItem
                            labelCol={{ span: 5 }}
                            wrapperCol={{ span: 15 }}
                            label="交接时间"
                            name="handoverTime"
                            rules={[{ required: true, message: '请输入EP交接时间' }]}
                        >
                            <DatePicker
                     
                                style={{ width: '100%' }}
                                placeholder="EP交接时间"
                                showTime
                                format='YYYY-MM-DD HH:mm:ss'
                            />
                        </FormItem>

                    </Col>
                </Row>
                <Row gutter={24}>
                    <Col span={12}>

                        <FormItem
                            labelCol={{ span: 5 }}
                            wrapperCol={{ span: 15 }}
                            label="业务编号"
                            name="businessCode"
                            rules={[{ required: true, message: '请输入业务编号' }]}
                        >
                            <Input placeholder="请选择" />
                        </FormItem>

                    </Col>
                    <Col span={12}>
                        <FormItem
                            labelCol={{ span: 5 }}
                            wrapperCol={{ span: 15 }}
                            label="业务类型"
                            name="businessType"
                            rules={[{ required: true, message: '请选择业务类型' }]}
                        >
                            <Select placeholder="请选择" />
                        </FormItem>
                    </Col>
                </Row>
                <Row gutter={24}>
                    <Col span={12}>
                        <FormItem
                            labelCol={{ span: 5 }}
                            wrapperCol={{ span: 15 }}
                            label="主单毛重"
                            name="mainGrossWeight"
                            rules={[{ required: true, message: '请输入主单毛重' }]}
                        >
                            <Input placeholder="主单毛重" addonAfter="KG" />
                        </FormItem>
                    </Col>
                    <Col span={12}>
                        <FormItem
                            labelCol={{ span: 5 }}
                            wrapperCol={{ span: 15 }}
                            label="主单净重"
                            name="mainNessWeight"

                        >
                            <Input placeholder="主单净重" addonAfter="KG" />
                        </FormItem>
                    </Col>
                </Row>
                <Row gutter={24}>
                    <Col span={12}>
                        <FormItem
                            labelCol={{ span: 5 }}
                            wrapperCol={{ span: 15 }}
                            label="大包数量"
                            name="bigPackageCount"
                            rules={[{ required: true, message: '请选择业务类型' }]}
                        >
                            <InputNumber placeholder="输入" style={{ width: '100%' }} />
                        </FormItem>
                    </Col>
                    <Col span={12}>
                        <FormItem
                            labelCol={{ span: 5 }}
                            wrapperCol={{ span: 15 }}
                            label="小件数量"
                            name="pics"
                        >
                            <InputNumber placeholder="输入" style={{ width: '100%' }} />
                        </FormItem>
                    </Col>
                </Row>

                <Row gutter={24}>
                    <Col span={12}>
                        <FormItem
                            labelCol={{ span: 5 }}
                            wrapperCol={{ span: 15 }}
                            label="是否异常"
                            name="isError"
                            rules={[{ required: true }]}
                            valuePropName="checked"
                        >
                            <Switch  />
                        </FormItem>
                    </Col>
                    <Col span={12}>
                        <FormItem
                            labelCol={{ span: 5 }}
                            wrapperCol={{ span: 15 }}
                            label="备注"
                            name="remark"
                        >
                            <TextArea rows={3} />
                        </FormItem>

                    </Col>
                </Row>
                <Row gutter={24}>
                    <Col span={22}>
                        <FormItem label="凭证上传">
                            <FormItem name="certificate" valuePropName="certificate" getValueFromEvent={normFile} noStyle>
                                <Upload.Dragger name="certificate" action="/upload.do">
                                    <p className="ant-upload-drag-icon">
                                        <InboxOutlined />
                                    </p>
                                    <p className="ant-upload-text">单击或将文件拖到该区域以上传</p>
                                    <p className="ant-upload-hint">支持单次或批量上传</p>
                                </Upload.Dragger>
                            </FormItem>
                        </FormItem>
                    </Col>
                </Row>

            </Form>
        </Modal>
    );
};

export default CreateEpHandoverByCodeForm;
