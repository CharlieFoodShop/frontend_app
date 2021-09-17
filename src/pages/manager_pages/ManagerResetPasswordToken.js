import React from 'react'
import { Card, Input, Button, Spin, message, Form } from 'antd';
import 'antd/dist/antd.css';
import '../../static/css/manager_css/reset_password.css'
import Footer from './components/Footer';

export default () => {
    return (
        <div className="reset-password-div">
            <Spin tip="Loading..." spinning={false}>
                <Card title="Reset your password" style={{ width: 400 }} bordered={true}>
                    <Form>
                        <Input.Password
                            id="resetPassword"
                            size="large"
                            placeholder="New Password Here"
                            required
                        />
                        <br /><br />
                        <Input
                            id="confirmResetPassword"
                            size="large"
                            type="password"
                            placeholder="Confirm Password"
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
