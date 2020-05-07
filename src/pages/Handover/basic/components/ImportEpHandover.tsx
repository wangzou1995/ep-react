import React from 'react';
import { Form,  Modal, Upload, Button, } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import { EPHandoverMessageItem } from '../data';

const FormItem = Form.Item;
export interface FormValueType extends EPHandoverMessageItem {

}
const normFile = (e: { fileList: any; }) => {
    console.log('Upload event:', e);
    if (Array.isArray(e)) {
        return e;
    }
    return e && e.fileList;
};
interface ImportEpHandOverProps {
    modalVisible: boolean;
    onSubmit: (fieldsValue: FormValueType) => void;
    onCancel: () => void;
}

const ImportEpHandoverForm: React.FC<ImportEpHandOverProps> = (props) => {
    const [form] = Form.useForm();

    const { modalVisible, onSubmit: handleAdd, onCancel } = props;
    const okHandle = async () => {
        const fieldsValue = await form.validateFields() as FormValueType;
        form.resetFields();
        handleAdd(fieldsValue);
    };
    const footerRender = () => {
        return (
            <div>
                <div >
                    <Button type='primary' style={{float: 'left'}}>下载模版</Button>
                </div>
                <div >
                    <Button  onClick={() => onCancel()}>取消</Button>
                    <Button type='primary' onClick={okHandle} >确认</Button>
                </div>
            </div>
        )
    }
    return (
        <Modal
            destroyOnClose
            title="导入EP交接信息"
            visible={modalVisible}
            onOk={okHandle}
            onCancel={() => onCancel()}
            width={800}
            okText="确认"
            cancelText="取消"
            footer={footerRender()}
        >
            <Form form={form}>
                
                    <FormItem  >
                    <FormItem name="certificate" valuePropName="fileList" getValueFromEvent={normFile} noStyle
                     rules={[{ required: true, message: '必须上传文件才能导入！' }]}>
                        <Upload.Dragger name="certificate" action="/upload.do">
                            <p className="ant-upload-drag-icon">
                                <InboxOutlined />
                            </p>
                            <p className="ant-upload-text">单击或将文件拖到该区域以上传</p>
                            <p className="ant-upload-hint">支持单次或批量上传</p>
                        </Upload.Dragger>
                    </FormItem>
                </FormItem>
                   
                
            </Form>
        </Modal>
    );
};

export default ImportEpHandoverForm;
