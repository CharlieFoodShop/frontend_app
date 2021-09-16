import React from 'react'
import { Card, Input, Button, Spin, message, Form } from 'antd';
import '../../static/css/manager_css/login.css'
import Footer from './components/Footer';


export default () => {
    return (
        <div className="login-div">
            <Spin tip="Loading..." spinning={false}>
                <Form title="Welcome to Charlie's Food Shop for Managers" style={{ width: 400 }}>
                    <Input />
                </Form>
                <br />
                <Footer />
            </Spin>
        </div>
    )
}
