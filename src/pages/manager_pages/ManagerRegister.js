import React from 'react'
import { Link } from 'react-router-dom';
import { Card, Input, Button, Spin, message, Row, Col, Typography, Form } from 'antd';
import 'antd/dist/antd.css';
import '../../static/css/manager_css/register.css'
import Footer from './components/Footer';

export default () => {
    return (
        <div className="register-div">
            <Spin tip="Loading..." spinning={false}>
                <Card title="Create Your Own Manager Account" style={{ width: 600 }} bordered={true}>
                    <Form>
                        <Row>
                            <Col span={12}>
                                <Typography.Title level={5} style={{ marginLeft: '5px' }}>
                                    First Name
                                </Typography.Title>
                                <Input
                                    size="large"
                                    style={{ width: '90%' }}
                                    type="text"
                                    id="firstName"
                                    placeholder="Java"
                                    required
                                />
                            </Col>
                            <Col span={12}>
                                <Typography.Title level={5} style={{ marginLeft: '5px' }}>
                                    Last Name
                                </Typography.Title>
                                <Input
                                    size="large"
                                    style={{ width: '90%' }}
                                    type="text"
                                    id="lastName"
                                    placeholder="JavaScript"
                                    required
                                />
                            </Col>
                        </Row>
                        <br />
                        <Row>
                            <Col span={12}>
                                <Typography.Title level={5} style={{ marginLeft: '5px' }}>
                                    Email Address
                                </Typography.Title>
                                <Input
                                    size="large"
                                    style={{ width: '90%' }}
                                    type="email"
                                    id="emailAddress"
                                    placeholder="abc@abc.com"
                                    required
                                />
                            </Col>
                            <Col span={12}>
                                <Typography.Title level={5} style={{ marginLeft: '5px' }}>
                                    Phone Number
                                </Typography.Title>
                                <Input
                                    size="large"
                                    style={{ width: '90%' }}
                                    type="tel"
                                    pattern="\([0-9]{3}\) [0-9]{3}-[0-9]{4}"
                                    id="phone"
                                    placeholder="(111) 111-1111"
                                    required
                                />
                            </Col>
                        </Row>
                        <br />
                        <Row>
                            <Col span={12}>
                                <Typography.Title level={5} style={{ marginLeft: '5px' }}>
                                    Password
                                </Typography.Title>
                                <Input.Password
                                    size="large"
                                    style={{ width: '90%' }}
                                    id="password"
                                    placeholder="Password"
                                    required
                                />
                            </Col>
                            <Col span={12}>
                                <Typography.Title level={5} style={{ marginLeft: '5px' }}>
                                    Confirm Your Password
                                </Typography.Title>
                                <Input
                                    size="large"
                                    style={{ width: '90%' }}
                                    type="password"
                                    id="confirmPassword"
                                    placeholder="Confirm Password"
                                    required
                                />
                            </Col>
                        </Row>
                        <br />
                        <Typography.Text type="danger" >
                            Note: Password should be at least 8 characters, with 1 Uppercase, 1 Lowercase, 1 Number and 1 Symbol.
                        </Typography.Text>
                        <br /><br />
                        <Button type="primary" size="large" block htmlType="submit" >Submit</Button>
                        <br /><br />
                        <div span={12} style={{ textAlign: 'right' }}>
                            <Link to="/manager/login" >Already have account?</Link>
                        </div>
                    </Form>
                </Card>
                <br /><br />
                <Footer />
            </Spin>
        </div>
    )
}
