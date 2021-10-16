import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, Input, Button, Spin, message, Row, Col, Typography, Form } from 'antd';
import Recaptcha from 'react-google-invisible-recaptcha';
import axios from 'axios';
import 'antd/dist/antd.css';
import '../../static/css/customer_css/register.css'
import Footer from './components/Footer';

import CUSTOMER_SERVICE_PATH from '../../config/CUSTOMER_API_URL';
import KEY from '../../config/KEY';

const CustomerRegister = (props) => {

    const [loading, setLoading] = useState(false);

    const firstName = useRef();
    const lastName = useRef();
    const emailAddress = useRef();
    const phoneNumber = useRef();
    const password = useRef();
    const confirmPassword = useRef();

    let reCAPTCHA_site_key = KEY.reCAPTCHA_site_key;
    let recaptcha = null;

    const handleSubmit = (e) => {
        e.preventDefault();

        if (firstName.current.state.value && lastName.current.state.value &&
            emailAddress.current.state.value && phoneNumber.current.state.value &&
            password.current.state.value && confirmPassword.current.state.value) {

            if (password.current.state.value !== confirmPassword.current.state.value) {
                return message.error("Confirm password is not same as the password you set. Please try again!");
            }

            if (recaptcha) {
                recaptcha.execute(reCAPTCHA_site_key, { action: 'register' })
                    .then((captcha) => {
                        handleRegister(captcha)
                    });
            }
        } else {
            return message.error("Please complete all the information!");
        }
    }

    const handleRegister = (captcha) => {
        setLoading(true);
        let data = {
            first_name: firstName.current.state.value,
            last_name: lastName.current.state.value,
            email_address: emailAddress.current.state.value,
            phone: phoneNumber.current.state.value,
            password: password.current.state.value,
            captcha: captcha
        };

        axios({
            method: 'post',
            url: CUSTOMER_SERVICE_PATH.REGISTER_URL,
            data: data
        })
            .then(res => {
                setLoading(false);
                if (res.data.success) {
                    message.success(res.data.message);
                    return props.history.push('/customer/login');
                } else {
                    return message.error(res.data.message);
                };
            })
            .catch(e => {
                setLoading(false);
                return message.error(e.response.data.message);
            });
    }

    return (
        <div className="register-div">
            <Spin tip="Loading..." spinning={loading}>
                <Card title="Create Your Own Customer Account" style={{ width: 600 }} bordered={true}>
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
                                    ref={firstName}
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
                                    ref={lastName}
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
                                    ref={emailAddress}
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
                                    ref={phoneNumber}
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
                                    ref={password}
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
                                    ref={confirmPassword}
                                    required
                                />
                            </Col>
                        </Row>
                        <br />
                        <Typography.Text type="danger" >
                            Note: Password should be at least 8 characters, with 1 Uppercase, 1 Lowercase, 1 Number and 1 Symbol.
                        </Typography.Text>
                        <br /><br />
                        <Button type="primary" size="large" block htmlType="submit" onClick={handleSubmit}>
                            Submit
                        </Button>
                        <br /><br />
                        <div span={12} style={{ textAlign: 'right' }}>
                            <Link to="/customer/login" >Already have account?</Link>
                        </div>
                    </Form>
                </Card>
                <br /><br />
                <Recaptcha
                    ref={ref => recaptcha = ref}
                    sitekey={reCAPTCHA_site_key}
                    onResolved={() => console.log('Human detected.')}
                />
                <Footer />
            </Spin>
        </div>
    )
}

export default CustomerRegister;
