import React, { useRef, useState } from 'react'
import { Card, Input, Button, Spin, message, Form } from 'antd';
import Recaptcha from 'react-google-invisible-recaptcha';
import axios from 'axios';
import 'antd/dist/antd.css';
import '../../static/css/manager_css/reset_password.css'
import Footer from './components/Footer';

import MANAGER_SERVICE_PATH from '../../config/MANAGER_API_URL';
import KEY from '../../config/KEY';

const ManagerResetPasswordToken = (props) => {

    const [loading, setLoading] = useState(false);

    const password = useRef();
    const confirmPassword = useRef();

    let reCAPTCHA_site_key = KEY.reCAPTCHA_site_key;
    let recaptcha = null;

    const handleSubmit = (e) => {
        e.preventDefault();

        if (password.current.state.value && confirmPassword.current.state.value) {
            if (password.current.state.value === confirmPassword.current.state.value) {
                if (recaptcha) {
                    recaptcha.execute(reCAPTCHA_site_key, { action: 'reset-password-final' })
                        .then((captcha) => {
                            handleResetPasswordFinal(captcha)
                        });
                }
            } else {
                return message.error("Confirm password is not same to the password you reset, please try again.");
            }
        } else {
            return message.error("Please complete all the information!");
        }
    }

    const handleResetPasswordFinal = (captcha) => {
        setLoading(true);
        let data = {
            password: password.current.state.value,
            captcha: captcha
        }
        axios({
            method: 'post',
            url: MANAGER_SERVICE_PATH.RESET_PASSWORD + props.match.params.token,
            data: data
        })
            .then(res => {
                setLoading(false);
                message.success(res.data.message);
                return props.history.push('/manager/login');
            })
            .catch(e => {
                setLoading(false);
                if (e.response.data.message === 'Invalid link or expired') {
                    message.error(e.response.data.message);
                    return props.history.push('/manager/login');
                } else {
                    return message.error(e.response.data.message);
                }
            })
    }

    return (
        <div className="reset-password-div">
            <Spin tip="Loading..." spinning={loading}>
                <Card title="Reset your password" style={{ width: 400 }} bordered={true}>
                    <Form>
                        <Input.Password
                            id="resetPassword"
                            size="large"
                            placeholder="New Password Here"
                            ref={password}
                            required
                        />
                        <br /><br />
                        <Input
                            id="confirmResetPassword"
                            size="large"
                            type="password"
                            placeholder="Confirm Password"
                            ref={confirmPassword}
                            required
                        />
                        <br /><br />
                        <Button type="primary" size="large" block htmlType="submit" onClick={handleSubmit}>Submit</Button>
                    </Form>
                </Card>
                <br /><br />
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

export default ManagerResetPasswordToken;
