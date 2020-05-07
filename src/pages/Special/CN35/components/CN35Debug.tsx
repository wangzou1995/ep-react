import React, { CSSProperties } from 'react';
import { Card, Form, Input,List,Typography } from 'antd'
interface CN35DebugProps {
    style?: CSSProperties
}
const CN35Debug: React.FC<CN35DebugProps> = (props) => {
    const { style } = props
    const data = [
        ' 单号【212453352】系统存在此大包的批次信息，但是上传的CN文件中没有. 建议操作：【1删除发运明细重新操作】【2.请补录cn标签文件】',
        ' 单号【212453352】系统存在此大包的批次信息，但是上传的CN文件中没有. 建议操作：【1删除发运明细重新操作】【2.请补录cn标签文件】',
        ' 单号【212453352】系统存在此大包的批次信息，但是上传的CN文件中没有. 建议操作：【1删除发运明细重新操作】【2.请补录cn标签文件】',
        ' 单号【212453352】系统存在此大包的批次信息，但是上传的CN文件中没有. 建议操作：【1删除发运明细重新操作】【2.请补录cn标签文件】',
        ' 单号【212453352】系统存在此大包的批次信息，但是上传的CN文件中没有. 建议操作：【1删除发运明细重新操作】【2.请补录cn标签文件】',
        ' 单号【212453352】系统存在此大包的批次信息，但是上传的CN文件中没有. 建议操作：【1删除发运明细重新操作】【2.请补录cn标签文件】',
        ' 单号【212453352】系统存在此大包的批次信息，但是上传的CN文件中没有. 建议操作：【1删除发运明细重新操作】【2.请补录cn标签文件】',
        ' 单号【212453352】系统存在此大包的批次信息，但是上传的CN文件中没有. 建议操作：【1删除发运明细重新操作】【2.请补录cn标签文件】',
        ' 单号【212453352】系统存在此大包的批次信息，但是上传的CN文件中没有. 建议操作：【1删除发运明细重新操作】【2.请补录cn标签文件】',
        ' 单号【212453352】系统存在此大包的批次信息，但是上传的CN文件中没有. 建议操作：【1删除发运明细重新操作】【2.请补录cn标签文件】',
    ]
    return (
        <div style={style}>
            <div style={{ width: '100%', float: 'left' }}>
                <Card title="返回信息" style={{ marginBottom: 24, color: 'red' }} bordered={false} >
                    <List
                     pagination={{
                        onChange: page => {
                          console.log(page);
                        },
                        pageSize: 3,
                      }}
                        bordered
                        dataSource={data}    
                        renderItem={item => (
                            <List.Item>
                              {item}
                            </List.Item>
                          )}                
                    />

                </Card>
            </div>
            <div style={{ width: '100%', float: 'left' }}>
                <Card title=" 扫描包号出签" style={{ marginBottom: 24 }} bordered={false}>
                    <Form>
                        <Form.Item label='大包号' name='bigNumber'>
                            <Input />
                        </Form.Item>
                    </Form>
                </Card>
            </div>
        </div>
    )
}

export default CN35Debug