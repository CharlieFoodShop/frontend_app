import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, Input, Button, Spin, message, Form } from 'antd';
import Recaptcha from 'react-google-invisible-recaptcha';
import axios from 'axios';
import { MailOutlined } from '@ant-design/icons';
import 'antd/dist/antd.css';
import '../../static/css/customer_css/reset_password.css'
import Footer from './components/Footer';

import CUSTOMER_SERVICE_PATH from '../../config/CUSTOMER_API_URL';
import KEY from '../../config/KEY';

const CustomerResetPassword = (props) => {

    const [loading, setLoading] = useState(false);
    const emailAddress = useRef();
    let reCAPTCHA_site_key = KEY.reCAPTCHA_site_key;
    let recaptcha = null;

    const handleSubmit = (e) => {
        e.preventDefault();
        if (emailAddress.current.state.value) {
            if (recaptcha) {
                recaptcha.execute(reCAPTCHA_site_key, { action: 'reset-password' })
                    .then((captcha) => {
                        handleResetPassword(captcha)
                    });
            }
        } else {
            return message.error("Please complete all the information!");
        }
    }

    const handleResetPassword = (captcha) => {

        setLoading(true);
        let data = {
            email_address: emailAddress.current.state.value,
            captcha: captcha
        };

        axios({
            method: 'post',
            url: CUSTOMER_SERVICE_PATH.RESET_PASSWORD,
            data: data
        })
            .then(res => {
                setLoading(false);
                message.success(res.data.message);

                return props.history.push('/customer/login');
            })
            .catch(e => {
                setLoading(false);
                return message.error(e.response.data.message);
            });
    }

    return (
        <div className="reset-password-div">
            <Spin tip="Loading..." spinning={loading}>
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
                            ref={emailAddress}
                            required
                        />
                        <br /><br />
                        <Button type="primary" size="large" block htmlType="submit" onClick={handleSubmit}>Submit</Button>
                        <br /><br />
                        <Link to="/customer/login" >Go Back</Link>
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

export default CustomerResetPassword;
