import React, { useState, useEffect } from 'react';
import { Layout, Menu, message, Spin, Input, Avatar, Row, Col, Divider } from 'antd';
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

    useEffect(() => {
        if (!(localStorage.getItem('customerSessionId') &&
            localStorage.getItem('customerEmail'))) {
            props.history.push('/customer/login');
        }
    }, []);

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
                                <Avatar
                                    size="large"
                                    icon={<UserOutlined />}
                                />
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
