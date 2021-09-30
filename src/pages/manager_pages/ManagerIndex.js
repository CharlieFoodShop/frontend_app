import React, { useState, useEffect } from 'react';
import { Layout, Menu, message, Spin } from 'antd';
import {
    UserOutlined, CoffeeOutlined,
    MailOutlined, BellOutlined, CalendarOutlined, SettingOutlined
} from '@ant-design/icons';
import axios from 'axios';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';

import MANAGER_SERVICE_PATH from '../../config/MANAGER_API_URL';
import Footer from './components/Footer';
import FoodShopList from './components/FoodShopList';
import AddFoodShop from './components/AddFoodShop';

const ManagerIndex = (props) => {
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!(localStorage.getItem('sessionId') &&
            localStorage.getItem('managerEmail'))) {
            props.history.push('/manager/login');
        }
    }, [])

    const handleLogout = () => {
        setLoading(true);

        axios({
            method: 'post',
            url: MANAGER_SERVICE_PATH.LOGOUT_URL,
            withCredentials: true
        }).then(res => {
            setLoading(false);
            if (res.data.success) {
                localStorage.removeItem('sessionId');
                localStorage.removeItem('managerEmail');
                message.success(res.data.message);
                return props.history.push('/manager/login');
            } else {
                return message.error(res.data.message);
            }

        }).catch(e => {
            setLoading(false);
            return message.error(e.response.data.message);
        });

    }

    const handleMenuClick = (e) => {
        switch (e.key) {
            case '7':
                handleLogout();
                break;
        }
    }

    return (
        <div>
            <Spin tip="Loading..." spinning={loading}>
                <Layout style={{ minHeight: '100vh' }}>
                    <Layout.Sider collapsible>
                        <Menu mode="inline" theme="dark" onClick={handleMenuClick}>
                            <Menu.Item key="1" icon={<CoffeeOutlined />}>Food Shops</Menu.Item>
                            <Menu.Item key="2" icon={<MailOutlined />}>Message</Menu.Item>
                            <Menu.Item key="3" icon={<BellOutlined />}>Current Order</Menu.Item>
                            <Menu.Item key="4" icon={<CalendarOutlined />}>Order History</Menu.Item>
                            <Menu.Item key="5" icon={<SettingOutlined />}>Setting</Menu.Item>
                            <Menu.SubMenu title="Account" key="sub1" icon={<UserOutlined />}>
                                <Menu.Item key="6">Edit Account</Menu.Item>
                                <Menu.Item key="7">Logout</Menu.Item>
                            </Menu.SubMenu>
                        </Menu>
                    </Layout.Sider>
                    <Layout className="site-layout">
                        <Layout.Content style={{ margin: '0 16px' }}>
                            <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
                                <Router>
                                    <Switch>
                                        <Route path="/manager/" exact component={FoodShopList} />
                                        <Route path="/manager/add_food_shop/:manager_id" exact component={AddFoodShop} />
                                        <Redirect to="/manager/" />
                                    </Switch>
                                </Router>
                            </div>
                        </Layout.Content>
                        <Footer />
                    </Layout>
                </Layout>
            </Spin>
        </div>
    )
}

export default ManagerIndex;