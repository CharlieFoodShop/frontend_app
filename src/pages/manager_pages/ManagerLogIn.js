import React, { useRef, useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import { Card, Input, Button, Spin, message, Row, Col, Form, Checkbox } from 'antd';
import Recaptcha from 'react-google-invisible-recaptcha';
import axios from 'axios';
import { UserOutlined, KeyOutlined } from '@ant-design/icons';
import 'antd/dist/antd.css';
import '../../static/css/manager_css/login.css'
import Footer from './components/Footer';

import MANAGER_SERVICE_PATH from '../../config/MANAGER_API_URL';
import KEY from '../../config/KEY';

const ManagerLogIn = (props) => {

    const [loading, setLoading] = useState(false);

    const emailAddress = useRef();
    const password = useRef();
    const rememberMe = useRef();

    let reCAPTCHA_site_key = KEY.reCAPTCHA_site_key;
    let recaptcha = null;

    useEffect(() => {
        if (localStorage.getItem('sessionId')) {
            return props.history.push('/manager');
        }
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (emailAddress.current.state.value && password.current.state.value) {

            if (recaptcha) {
                recaptcha.execute(reCAPTCHA_site_key, { action: 'login' })
                    .then((captcha) => {
                        handleLogin(captcha)
                    });
            }
        } else {
            return message.error("Please complete all the information!");
        }
    }

    const handleLogin = (captcha) => {

        setLoading(true);
        let data = {
            email_address: emailAddress.current.state.value,
            password: password.current.state.value,
            captcha: captcha
        };

        axios({
            method: 'post',
            url: MANAGER_SERVICE_PATH.LOGIN_URL,
            data: data,
            withCredentials: true
        })
            .then(res => {
                setLoading(false);
                if (res.data.success) {
                    if (rememberMe.current.state.checked) {
                        localStorage.setItem('rememberEmail', emailAddress.current.state.value);
                        localStorage.setItem('rememberPass', password.current.state.value);
                    };
                    localStorage.setItem('sessionId', res.data.sessionId);
                    localStorage.setItem('managerEmail', emailAddress.current.state.value);
                    message.success(res.data.message);

                    return props.history.push('/manager');
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
        <div className="login-div">
            <Spin tip="Loading..." spinning={loading}>
                <Card title="Welcome to Charlie's Food Shop for Managers" style={{ width: 400 }} bordered={true}>
                    <Form>
                        <Input
                            id="emailAddress"
                            size="large"
                            type="email"
                            prefix={<UserOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
                            placeholder="Enter Your Email Address"
                            autoFocus
                            defaultValue={localStorage.getItem('rememberEmail') ? localStorage.getItem('rememberEmail') : null}
                            ref={emailAddress}
                            required
                        />
                        <br /><br />
                        <Input.Password
                            id="password"
                            size="large"
                            placeholder="Enter Your Password"
                            required
                            defaultValue={localStorage.getItem('rememberPass') ? localStorage.getItem('rememberPass') : null}
                            ref={password}
                            prefix={<KeyOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
                        />
                        <br /><br />
                        <Checkbox ref={rememberMe}>Remember me</Checkbox>
                        <br /><br />
                        <Button type="primary" size="large" block htmlType="submit" onClick={handleSubmit}>LOG IN</Button>
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

export default ManagerLogIn;