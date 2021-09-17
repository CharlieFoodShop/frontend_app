import React from 'react'
import { Card, Input, Button, Spin, message, Form } from 'antd';
import { MailOutlined } from '@ant-design/icons';
import 'antd/dist/antd.css';
import '../../static/css/manager_css/reset_password.css'
import Footer from './components/Footer';

export default () => {
    return (
        <div className="reset-password-div">
            <Spin tip="Loading..." spinning={false}>
                <Card title="Give your email address to reset password"
                    style={{ width: 400 }}
                    bordered={true}>
                    <Form>
                        <Input
                            id="emailAddress"
                            size="large"
                            type="email"
                            prefix={<MailOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
                            placeholder="Your Email Address"
                            required
                        />
                        <br /><br />
                        <Button type="primary" size="large" block htmlType="submit" >Submit</Button>
                    </Form>
                </Card>
                <br /><br />
                <Footer />
            </Spin>
        </div>
    )
}
