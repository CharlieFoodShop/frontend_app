import React, { useEffect, useState } from 'react';
import { Input, Button, Typography, Form, Divider, message } from 'antd';
import axios from 'axios';
import MANAGER_SERVICE_PATH from '../../../config/MANAGER_API_URL';

const SettingAccount = () => {

    const [clientId, setClientId] = useState(null);
    const [clientSecret, setClientSecret] = useState(null);
    const [managerId, setManagerId] = useState(null);

    useEffect(async () => {
        try {
            let managetDetail = await getManagerDetail();

            setClientId(managetDetail.client_id);
            setClientSecret(managetDetail.client_secret);
            setManagerId(managetDetail.manager_id);

        } catch (e) {
            return message.error(e.message);
        }
    }, []);

    const getManagerDetail = async () => {
        let result = await axios({ method: 'get', url: MANAGER_SERVICE_PATH.GET_MANAGER_DETAIL + "?email_address=" + localStorage.getItem('managerEmail') })
        return result.data.data;
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {

            if (
                clientId &&
                clientSecret &&
                managerId
            ) {

                let data = {
                    client_id: clientId,
                    client_secret: clientSecret,
                    manager_id: managerId
                };

                let result = await axios({ method: 'post', url: MANAGER_SERVICE_PATH.UPDATE_MANAGER_ACCOUNT, data: data });
                if (result.data.success) {
                    message.success('Update account successful!');
                } else {
                    return message.error('Update fail, pleaes try again!');
                }

            } else {
                return message.error('Please complete information!');
            }

        } catch (e) {
            return message.error('Something wrong happened, please try again!');
        }
    }

    return (
        <div>
            <Typography.Title level={5}>Edit Your Paypal Detail Here</Typography.Title>
            <Divider />
            <Form>
                <Typography.Title level={5} style={{ marginLeft: '5px' }}>
                    Client ID
                </Typography.Title>
                <Input
                    size="large"
                    style={{ width: '80%' }}
                    id="clientId"
                    value={clientId}
                    onChange={e => setClientId(e.target.value)}
                    required
                />
                <br /><br />
                <Typography.Title level={5} style={{ marginLeft: '5px' }}>
                    Client Secret
                </Typography.Title>
                <Input.TextArea
                    id="clientSecret"
                    rows={5}
                    value={clientSecret}
                    onChange={e => setClientSecret(e.target.value)}
                    required
                />
                <br /><br />
                <Button
                    type="primary"
                    size="large"
                    block
                    htmlType="submit"
                    onClick={handleSubmit}>
                    Submit
                </Button>
            </Form>
        </div>
    )
}

export default SettingAccount;
