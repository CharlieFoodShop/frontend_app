import React, { useEffect, useState } from 'react';
import { Col, Row, Input, Button, Typography, Form, Divider, message, Avatar, AutoComplete } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import axios from 'axios';
import CUSTOMER_SERVICE_PATH from '../../../config/CUSTOMER_API_URL';
import KEY from '../../../config/KEY';


const EditProfile = () => {

    const [firstName, setFirstName] = useState(null);
    const [lastName, setLastName] = useState(null);

    const [oldEmailAddress, setOldEmailAddress] = useState(null);
    const [newEmailAddress, setNewEmailAddress] = useState(null);

    const [oldPhone, setOldPhone] = useState(null);
    const [newPhone, setNewPhone] = useState(null);

    const [newPassword, setNewPassword] = useState(null);
    const [confirmNewPassword, setConfirmNewPassword] = useState(null);

    const [address, setAddress] = useState(null);
    const [lat, setLat] = useState(null);
    const [lon, setLon] = useState(null);

    const [customerId, setCustomerId] = useState(null);
    const [avatarUrl, setAvatarUrl] = useState(null);

    const [possibleAddressList, setPossibleAddressList] = useState([]);

    useEffect(async () => {
        try {
            let customerDetail = await getCustomerDetail(localStorage.getItem('customerEmail'));

            setFirstName(customerDetail.first_name);
            setLastName(customerDetail.last_name);

            setOldEmailAddress(customerDetail.email_address);
            setNewEmailAddress(customerDetail.email_address);

            setOldPhone(customerDetail.phone);
            setNewPhone(customerDetail.phone);

            setCustomerId(customerDetail.customer_id);
            setAvatarUrl(customerDetail.avatar_url);

            setAddress(customerDetail.address);
            setLat(customerDetail.lat);
            setLon(customerDetail.lon);

        } catch (e) {
            return message.error(e.message);
        }

    }, []);

    const getCustomerDetail = async (email_address) => {
        let result = await axios({ method: 'get', url: CUSTOMER_SERVICE_PATH.GET_CUSTOMER_DETAIL + "?email_address=" + email_address });
        return result.data.data;
    }

    const getPossibleAddressList = async (text) => {

        try {
            if (text[text.length - 1] === ' ' || text === '') {
                return;
            } else {
                let _text = text.replace(' ', '%20');
                let results = await axios({ method: 'get', url: 'http://dev.virtualearth.net/REST/v1/Locations/' + _text + "?key=" + KEY.BingMap_key });
                let _results = results.data.resourceSets[0].resources;

                let data = [];
                for (let i = 0; i < _results.length; i++) {
                    data.push({ value: _results[i].name, key: i })
                }
                setPossibleAddressList(data);
            }
        } catch (e) {
            return;
        }
    }

    const updateCoord = async (address) => {
        try {
            if (address[address.length - 1] === ' ' || address === '') {
                return;
            } else {
                let _address = address.replace(' ', '%20');
                let results = await axios({ method: 'get', url: 'http://dev.virtualearth.net/REST/v1/Locations/' + _address + "?key=" + KEY.BingMap_key });
                let _results = results.data.resourceSets[0].resources;

                if (_results.length === 1) {
                    setAddress(address);
                    setLat(_results[0].point.coordinates[0]);
                    setLon(_results[0].point.coordinates[1]);

                } else {
                    return;
                }
            }
        } catch (e) {
            return;
        }
    }

    const handleChangeAvatar = async (e) => {
        try {
            let file = e.target.files[0];
            let formdata = new FormData();
            formdata.append('image', file);

            let result = await axios({
                method: 'post',
                url: CUSTOMER_SERVICE_PATH.CUSTOMER_UPLOAD_AVATAR + "?id=" + customerId,
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

    const handleSubmit = async () => {
        try {
            if (firstName &&
                lastName &&
                oldEmailAddress &&
                newEmailAddress &&
                oldPhone &&
                newPhone &&
                newPassword &&
                confirmNewPassword &&
                customerId &&
                address &&
                lat &&
                lon) {

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
                        customer_id: customerId,
                        address: address,
                        lat: lat,
                        lon: lon,
                        avatar_url: avatarUrl
                    };

                    let result = await axios({
                        method: 'post',
                        url: CUSTOMER_SERVICE_PATH.UPDATE_CUSTOMER_PROFILE,
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
            <div >
                <div style={{ marginLeft: '40%' }}>
                    {
                        avatarUrl ?
                            <Avatar size={128} src={avatarUrl} /> :
                            <Avatar size={128} icon={<UserOutlined />} />
                    }
                </div>
                <br /><br />
                <Input
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
                    />
                </Col>
            </Row>
            <Divider />
            <Typography.Title level={5} >
                Configure Your Address for Shopping Here
            </Typography.Title>
            <br />
            <Row>
                <Col span={12}>
                    {
                        lat && lon &&
                        <img
                            style={{ width: '90%' }}
                            src={`https://dev.virtualearth.net/REST/v1/Imagery/Map/Road/${lat},${lon}/15?mapSize=500,300&format=png&pushpin=${lat},${lon};64;&key=${KEY.BingMap_key}`}
                            alt="map"
                        />
                    }
                </Col>
                <Col span={12}>
                    <AutoComplete
                        size="large"
                        style={{ width: '80%' }}
                        id="addressText"
                        options={possibleAddressList}
                        onSearch={getPossibleAddressList}
                        onSelect={updateCoord}
                        required
                    />
                    <br /><br />
                    <Typography.Title level={5} style={{ marginLeft: '20px' }}>Address: {address ? address : ''}</Typography.Title>
                    <Typography.Title level={5} style={{ marginLeft: '20px' }}>Latitude: {lat ? lat : ''}</Typography.Title>
                    <Typography.Title level={5} style={{ marginLeft: '20px' }}>Longitude: {lon ? lon : ''}</Typography.Title>
                </Col>
            </Row>
            <br /><br />
            <Button type="primary" size="large" block onClick={handleSubmit}>
                Edit Profile
            </Button>
        </div>
    )
}

export default EditProfile;
