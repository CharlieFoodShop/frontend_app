import React, { useState, useEffect } from 'react';
import { Layout, message, Spin, Input, Avatar, Row, Col, Divider, Menu, Dropdown } from 'antd';
import { ShoppingCartOutlined, UserOutlined } from '@ant-design/icons';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Route, Redirect } from 'react-router-dom';

import CUSTOMER_SERVICE_PATH from '../../config/CUSTOMER_API_URL';
import '../../static/css/customer_css/header.css';
import '../../static/css/customer_css/content.css';

import Footer from './components/Footer';

const CustomerIndex = (props) => {

    const [loading, setLoading] = useState(false);

    const [customerId, setCustomerId] = useState(null);
    const [firstName, setFirstName] = useState(null);
    const [lastName, setLastName] = useState(null);
    const [emailAddress, setEmailAddress] = useState(null);
    const [phone, setPhone] = useState(null);
    const [avatarUrl, setAvatarUrl] = useState(null);
    const [createdAt, setCreatedAt] = useState(null);
    const [updatedAt, setUpdatedAt] = useState(null);


    useEffect(async () => {
        try {
            if (!(localStorage.getItem('customerSessionId') &&
                localStorage.getItem('customerEmail'))) {
                props.history.push('/customer/login');
            }

            let customerDetail = await getCustomerDetail(localStorage.getItem('customerEmail'));
            setCustomerId(customerDetail.customer_id);
            setFirstName(customerDetail.first_name);
            setLastName(customerDetail.last_name);
            setEmailAddress(customerDetail.email_address);
            setPhone(customerDetail.phone);
            setAvatarUrl(customerDetail.avatar_url);
            setCreatedAt(customerDetail.created_at);
            setUpdatedAt(customerDetail.updated_at);

        } catch (e) {
            return message.error(e.message);
        }
    }, []);

    const getCustomerDetail = async (email_address) => {
        let result = await axios({ method: 'get', url: CUSTOMER_SERVICE_PATH.GET_CUSTOMER_DETAIL + "?email_address=" + email_address });
        return result.data.data;
    }

    const handleLogout = () => {
        setLoading(true);

        axios({
            method: 'post',
            url: CUSTOMER_SERVICE_PATH.LOGOUT_URL,
            withCredentials: true
        }).then(res => {
            setLoading(false);
            if (res.data.success) {
                localStorage.removeItem('customerSessionId');
                localStorage.removeItem('customerEmail');
                message.success(res.data.message);
                return props.history.push('/customer/login');
            } else {
                return message.error(res.data.message);
            }

        }).catch(e => {
            setLoading(false);
            return message.error(e.response.data.message);
        });

    }

    const handleSearch = (text) => {
        console.log(text);
    }

    const handleCartOnclick = () => {
        console.log('Cart clicked');
    }
    const handleMenuClick = (e) => {
        console.log(e.key);
    }

    const menu = (
        <Menu onClick={handleMenuClick}>
            <Menu.Item key="1" style={{ borderBottom: '1px solid black' }}>Current Order</Menu.Item>
            <Menu.Item key="2">Order History</Menu.Item>
            <Menu.Item key="3">Profile</Menu.Item>
            <Menu.Item key="4">My Favourite</Menu.Item>
            <Menu.Item key="5">Message</Menu.Item>
            <Menu.Item key="6">Help</Menu.Item>
        </Menu>
    );

    return (
        <div>
            <Spin tip="Loading..." spinning={loading}>
                <div className="header">
                    <Row type="flex" justify="center">
                        <Col xs={24} sm={24} md={8} lg={12} xl={12}>
                            <Link to="/customer/">
                                <span className="header-logo">Welcome to Online Food Shop</span>
                            </Link>
                        </Col>
                        <Col xs={0} sm={0} md={16} lg={10} xl={8}>
                            <Input.Search
                                allowClear
                                enterButton
                                style={{ width: '60%', margin: '1% auto' }}
                                placeholder="Search what you want"
                                onSearch={handleSearch}
                            />
                            <span
                                onClick={handleCartOnclick}
                                style={{ cursor: 'pointer', margin: '3%' }}
                            >
                                <Avatar
                                    size="large"
                                    icon={<ShoppingCartOutlined />}

                                />
                            </span>
                            <span
                                style={{ cursor: 'pointer' }}
                            >
                                <Dropdown
                                    overlay={menu}
                                    placement="bottomCenter"
                                >
                                    {
                                        avatarUrl ?
                                            <Avatar size="large" src={avatarUrl} /> :
                                            <Avatar size="large" icon={<UserOutlined />} />
                                    }
                                </Dropdown>
                            </span>
                        </Col>
                    </Row>
                </div>
                <Layout className="comm-main">
                    <Layout.Content style={{ margin: '10px 5%' }}>
                        <div style={{ padding: 24, minHeight: 360 }}>
                            here
                        </div>
                    </Layout.Content>
                </Layout>
                <Divider />
                <Footer />
            </Spin>
        </div>
    )
}

export default CustomerIndex;

/*

</span>



*/
