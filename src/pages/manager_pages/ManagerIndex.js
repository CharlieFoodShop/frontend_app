import React, { useState, useEffect } from 'react';
import { Layout, Menu, message, Spin } from 'antd';
import {
    UserOutlined, CoffeeOutlined,
    CarryOutOutlined, BellOutlined, CalendarOutlined, SettingOutlined
} from '@ant-design/icons';
import axios from 'axios';
import { Route } from 'react-router-dom';

import MANAGER_SERVICE_PATH from '../../config/MANAGER_API_URL';
import Footer from './components/Footer';
import FoodShopList from './components/FoodShopList';
import AddFoodShop from './components/AddFoodShop';
import FoodShopDetail from './components/FoodShopDetail';
import FoodItemDetail from './components/FoodItemDetail';
import AddFoodItem from './components/AddFoodItem';
import AddFoodItemCategory from './components/AddFoodItemCategory';
import EditFoodShop from './components/EditFoodShop';
import EditFoodItem from './components/EditFoodItem';
import SettingAccount from './components/SettingAccount';
import EditProfile from './components/EditProfile';
import CurrentOrders from './components/CurrentOrders';
import OrderHistory from './components/OrderHistory';
import OrderDetail from './components/OrderDetail';
import FoodComments from './components/FoodComments';
import Report from './components/Report';

const ManagerIndex = (props) => {
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!(localStorage.getItem('sessionId') &&
            localStorage.getItem('managerEmail'))) {
            props.history.push('/manager/login');
        }
    }, []);

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
            case '1':
                props.history.push('/manager/');
                break;
            case '2':
                props.history.push('/manager/report');
                break;
            case '3':
                props.history.push('/manager/current_orders');
                break;
            case '4':
                props.history.push('/manager/order_history');
                break;
            case '5':
                props.history.push('/manager/setting_account');
                break;
            case '6':
                props.history.push('/manager/edit_profile');
                break;
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
                            <Menu.Item key="2" icon={<CarryOutOutlined />}>Report</Menu.Item>
                            <Menu.Item key="3" icon={<BellOutlined />}>Current Order</Menu.Item>
                            <Menu.Item key="4" icon={<CalendarOutlined />}>Order History</Menu.Item>
                            <Menu.Item key="5" icon={<SettingOutlined />}>Setting Account</Menu.Item>
                            <Menu.SubMenu title="Account" key="sub1" icon={<UserOutlined />}>
                                <Menu.Item key="6">Edit Profile</Menu.Item>
                                <Menu.Item key="7">Logout</Menu.Item>
                            </Menu.SubMenu>
                        </Menu>
                    </Layout.Sider>
                    <Layout className="site-layout">
                        <Layout.Content style={{ margin: '0 16px' }}>
                            <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
                                <Route path="/manager/" exact component={FoodShopList} />
                                <Route path="/manager/add_food_shop/:manager_id" exact component={AddFoodShop} />
                                <Route path="/manager/food_shop_detail/:food_shop_id" exact component={FoodShopDetail} />
                                <Route path="/manager/food_item_detail/:food_item_id" exact component={FoodItemDetail} />
                                <Route path="/manager/add_food_item/:food_shop_id" exact component={AddFoodItem} />
                                <Route path="/manager/add_food_item_category/:food_shop_id" exact component={AddFoodItemCategory} />
                                <Route path="/manager/edit_food_shop/:food_shop_id" exact component={EditFoodShop} />
                                <Route path="/manager/edit_food_item/:food_item_id" exact component={EditFoodItem} />
                                <Route path="/manager/setting_account" exact component={SettingAccount} />
                                <Route path="/manager/edit_profile" exact component={EditProfile} />
                                <Route path="/manager/current_orders" exact component={CurrentOrders} />
                                <Route path="/manager/order_history" exact component={OrderHistory} />
                                <Route path="/manager/order_detail/:order_id" exact component={OrderDetail} />
                                <Route path="/manager/food_comments/:food_item_id" exact component={FoodComments} />
                                <Route path="/manager/report" exact component={Report} />
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


/*

, Redirect
<Redirect to="/manager/" />
<Menu.Item key="2" icon={<MailOutlined />}>Message</Menu.Item>

*/