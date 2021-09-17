import React from 'react'
import { Link } from 'react-router-dom';
import { Card, Input, Button, Spin, message, Row, Col, Form } from 'antd';
import { UserOutlined, KeyOutlined } from '@ant-design/icons';
import 'antd/dist/antd.css';
import '../../static/css/manager_css/login.css'
import Footer from './components/Footer';


export default () => {
    return (
        <div className="login-div">
            <Spin tip="Loading..." spinning={false}>
                <Card title="Welcome to Charlie's Food Shop for Managers" style={{ width: 400 }} bordered={true}>
                    <Form>
                        <Input
                            id="emailAddress"
                            size="large"
                            type="email"
                            prefix={<UserOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
                            placeholder="Enter Your Email Address"
                            autoFocus
                            required
                        />
                        <br /><br />
                        <Input.Password
                            id="password"
                            size="large"
                            placeholder="Enter Your Password"
                            required
                            prefix={<KeyOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
                        />
                        <br /><br />
                        <Button type="primary" size="large" block htmlType="submit" >LOG IN</Button>
                        <br /><br />
                        <Row>
                            <Col span={12}>
                                <Link to="/manager/register" >Do not have account?</Link>
                            </Col>
                            <Col span={12} style={{ textAlign: 'right' }}>
                                <Link to="/manager/reset-password" >Forget password?</Link>
                            </Col>
                        </Row>
                    </Form>
                </Card>
                <br /><br />
                <Footer />
            </Spin>
        </div>
    )
}
