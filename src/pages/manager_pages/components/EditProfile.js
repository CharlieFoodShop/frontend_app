import React, { useEffect, useState } from 'react';
import { Col, Row, Input, Button, Typography, Form, Divider, message, Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import axios from 'axios';
import MANAGER_SERVICE_PATH from '../../../config/MANAGER_API_URL';

const EditProfile = () => {

    const [firstName, setFirstName] = useState(null);
    const [lastName, setLastName] = useState(null);

    const [oldEmailAddress, setOldEmailAddress] = useState(null);
    const [newEmailAddress, setNewEmailAddress] = useState(null);

    const [oldPhone, setOldPhone] = useState(null);
    const [newPhone, setNewPhone] = useState(null);

    const [newPassword, setNewPassword] = useState(null);
    const [confirmNewPassword, setConfirmNewPassword] = useState(null);

    const [managerId, setManagerId] = useState(null);
    const [avatarUrl, setAvatarUrl] = useState(null);

    useEffect(async () => {
        try {
            let managerDetail = await getManagerDetail();

            setFirstName(managerDetail.first_name);
            setLastName(managerDetail.last_name);

            setOldEmailAddress(managerDetail.email_address);
            setNewEmailAddress(managerDetail.email_address);

            setOldPhone(managerDetail.phone);
            setNewPhone(managerDetail.phone);

            setManagerId(managerDetail.manager_id);
            setAvatarUrl(managerDetail.avatar_url);

        } catch (e) {
            return message.error(e.message);
        }
    }, []);

    const getManagerDetail = async () => {
        let result = await axios({ method: 'get', url: MANAGER_SERVICE_PATH.GET_MANAGER_DETAIL + "?email_address=" + localStorage.getItem('managerEmail') })
        return result.data.data;
    }

    const handleChangeAvatar = async (e) => {
        try {
            let file = e.target.files[0];
            let formdata = new FormData();
            formdata.append('image', file);

            let result = await axios({
                method: 'post',
                url: MANAGER_SERVICE_PATH.MANAGER_UPLOAD_AVATAR + "?id=" + managerId,
                data: formdata,
                headers: { 'Content-Type': 'multipart/form-data;charset=UTF-8' }
            });

            if (result.data.success) {
                message.success('Upload Avatar Successful');
                return setAvatarUrl(result.data.message);
            } else {
                return message.error('Upload Avatar fail, please try again!');
            }

        } catch (e) {
            return message.error('Something wrong happened, please try again!');
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            if (
                firstName &&
                lastName &&
                oldEmailAddress &&
                newEmailAddress &&
                oldPhone &&
                newPhone &&
                newPassword &&
                confirmNewPassword &&
                managerId
            ) {
                if (newPassword !== confirmNewPassword) {
                    return message.error("Confirm password is not same as the new password you set. Please try again!");
                } else {

                    let data = {
                        first_name: firstName,
                        last_name: lastName,
                        old_email_address: oldEmailAddress,
                        new_email_address: newEmailAddress,
                        old_phone: oldPhone,
                        new_phone: newPhone,
                        password: newPassword,
                        manager_id: managerId,
                        avatar_url: avatarUrl
                    }

                    let result = await axios({
                        method: 'post',
                        url: MANAGER_SERVICE_PATH.UPDATE_MANAGER_PROFILE,
                        data: data
                    });
                    if (result.data.success) {
                        return message.success('Update profile successful!');
                    } else {
                        return message.error('Update fail, pleaes try again!');
                    }

                }
            } else {
                return message.error('Please complete information!');
            }
        } catch (e) {
            return message.error(e.response.data.message);
        }
    }

    return (
        <div>
            <Typography.Title level={5}>Edit Your Profile Here</Typography.Title>
            <Divider />
            <Form>
                <Typography.Title level={5}>Set Avatar</Typography.Title>
                <div style={{ textAlign: 'center' }}>

                    {
                        avatarUrl ?
                            <Avatar size={128} src={avatarUrl} /> :
                            <Avatar size={128} icon={<UserOutlined />} />
                    }
                    <br /><br />
                    <Input
                        required
                        size="large"
                        style={{ width: '90%' }}
                        type="file"
                        accept="image/jpeg,image/jpg,image/png"
                        id="imageFile"
                        onChange={handleChangeAvatar}
                    />

                </div>
                <br /><br />
                <Row>
                    <Col span={12}>
                        <Typography.Title level={5} style={{ marginLeft: '5px' }}>First Name</Typography.Title>
                        <Input
                            size="large"
                            type="text"
                            id="firstName"
                            style={{ width: '80%' }}
                            onChange={e => setFirstName(e.target.value)}
                            value={firstName}
                            required
                        />
                    </Col>
                    <Col span={12}>
                        <Typography.Title level={5} style={{ marginLeft: '5px' }}>Last Name</Typography.Title>
                        <Input
                            size="large"
                            type="text"
                            id="lastName"
                            style={{ width: '80%' }}
                            onChange={e => setLastName(e.target.value)}
                            value={lastName}
                            required
                        />
                    </Col>
                </Row>
                <br /><br />
                <Row>
                    <Col span={12}>
                        <Typography.Title level={5} style={{ marginLeft: '5px' }}>Email Address</Typography.Title>
                        <Input
                            size="large"
                            type="email"
                            placeholder="abc@abc.com"
                            id="emailAddress"
                            style={{ width: '80%' }}
                            onChange={e => setNewEmailAddress(e.target.value)}
                            value={newEmailAddress}
                            required
                        />
                    </Col>
                    <Col span={12}>
                        <Typography.Title level={5} style={{ marginLeft: '5px' }}>Phone Number</Typography.Title>
                        <Input
                            size="large"
                            type="tel"
                            pattern="\([0-9]{3}\) [0-9]{3}-[0-9]{4}"
                            placeholder="(111) 111-1111"
                            id="phone"
                            style={{ width: '80%' }}
                            onChange={e => setNewPhone(e.target.value)}
                            value={newPhone}
                            required
                        />
                    </Col>
                </Row>
                <br /><br />
                <Row>
                    <Col span={12}>
                        <Typography.Title level={5} style={{ marginLeft: '5px' }}>
                            New Password
                        </Typography.Title>
                        <Input.Password
                            size="large"
                            style={{ width: '80%' }}
                            id="newPassword"
                            placeholder="New Password"
                            value={newPassword}
                            onChange={e => setNewPassword(e.target.value)}
                            required
                        />
                    </Col>
                    <Col span={12}>
                        <Typography.Title level={5} style={{ marginLeft: '5px' }}>
                            Confirm Your Password
                        </Typography.Title>
                        <Input
                            size="large"
                            style={{ width: '80%' }}
                            type="password"
                            id="confirmNewPassword"
                            placeholder="Confirm New Password"
                            value={confirmNewPassword}
                            onChange={e => setConfirmNewPassword(e.target.value)}
                            required
                        />
                    </Col>
                </Row>
                <br /><br />
                <Button type="primary" size="large" block htmlType="submit" onClick={handleSubmit}>
                    Submit
                </Button>
            </Form>
        </div>
    )
}

export default EditProfile;
