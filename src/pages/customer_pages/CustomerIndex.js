import React, { useState, useEffect, useContext } from 'react';
import { Layout, message, Spin, Input, Avatar, Row, Col, Divider, Menu, Dropdown, Badge } from 'antd';
import { ShoppingCartOutlined, UserOutlined } from '@ant-design/icons';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Route } from 'react-router-dom';

import CUSTOMER_SERVICE_PATH from '../../config/CUSTOMER_API_URL';
import '../../static/css/customer_css/header.css';
import '../../static/css/customer_css/content.css';

import Footer from './components/Footer';
import Home from './components/Home';
import FoodShop from './components/FoodShop';
import FoodItem from './components/FoodItem';
import Cart from './components/Cart';
import EditProfile from './components/EditProfile';
import MyFavourite from './components/MyFavourite';
import SearchResults from './components/SearchResults';
import CurrentOrder from './components/CurrentOrder';
import OrderHistory from './components/OrderHistory';
import OrderDetail from './components/OrderDetail';
import FoodAddComment from './components/FoodAddComment';
import FoodSeeComments from './components/FoodSeeComments';
import FoodEditComment from './components/FoodEditComment';
import Help from './components/Help';

import ShopContext from '../../context/ShopContext';

const CustomerIndex = (props) => {

    const context = useContext(ShopContext);

    const [loading, setLoading] = useState(false);
    const [helloTitle, setHelloTitle] = useState('');

    const [avatarUrl, setAvatarUrl] = useState(null);

    useEffect(async () => {
        try {
            if (!(localStorage.getItem('customerSessionId') &&
                localStorage.getItem('customerEmail'))) {
                return props.history.push('/customer/login');
            }

            let customerDetail = await getCustomerDetail(localStorage.getItem('customerEmail'));
            setAvatarUrl(customerDetail.avatar_url);

            let timeTitle = getTimeTitle();
            setHelloTitle(timeTitle + ", " + customerDetail.first_name + " " + customerDetail.last_name);

        } catch (e) {
            return message.error(e.message);
        }
    }, []);

    const getCustomerDetail = async (email_address) => {
        let result = await axios({ method: 'get', url: CUSTOMER_SERVICE_PATH.GET_CUSTOMER_DETAIL + "?email_address=" + email_address });
        return result.data.data;
    }

    const getTimeTitle = () => {
        let hour = (new Date()).getHours();

        if (hour >= 6 && hour <= 12) {
            return "Good Morning";
        } else if (hour > 12 && hour <= 18) {
            return "Good Afternoon";
        } else {
            return "Good Night";
        }
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

                context.clearCart();
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
        if (!text) {
            return message.warn('Search text can not be blank!');
        }
        return props.history.push('/customer/search_results/' + text);
    }

    const handleCartOnclick = () => {
        return props.history.push('/customer/cart');
    }

    const handleMenuClick = (e) => {
        switch (e.key) {
            case '1':
                props.history.push('/customer/current_order');
                break;
            case '2':
                props.history.push('/customer/order_history');
                break;
            case '3':
                props.history.push('/customer/edit_profile');
                break;
            case '4':
                props.history.push('/customer/my_favourite');
                break;
            case '6':
                props.history.push('/customer/help');
                break;
            case '7':
                handleLogout();
                break;
        }
    }

    const menu = (
        <Menu onClick={handleMenuClick}>
            <Menu.Item key="1" style={{ borderBottom: '1px solid black' }}>Current Order</Menu.Item>
            <Menu.Item key="2">Order History</Menu.Item>
            <Menu.Item key="3">Profile</Menu.Item>
            <Menu.Item key="4">My Favourite</Menu.Item>
            <Menu.Item key="6">Help</Menu.Item>
            <Menu.Item key="7">Log Out</Menu.Item>
        </Menu>
    );

    return (
        <div>
            <Spin tip="Loading..." spinning={loading}>
                <div className="header">
                    <Row type="flex" justify="center">
                        <Col xs={24} sm={24} md={8} lg={12} xl={12}>
                            <Link to="/customer/">
                                <span className="header-logo">{helloTitle}</span>
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
                                <Badge count={context.cart.length}>
                                    <Avatar
                                        size="large"
                                        icon={<ShoppingCartOutlined />}
                                    />
                                </Badge>
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
                            <Route path="/customer/" exact component={Home} />
                            <Route path="/customer/food_shop/:food_shop_id" exact component={FoodShop} />
                            <Route path="/customer/food_item/:food_item_id" exact component={FoodItem} />
                            <Route path="/customer/cart" exact component={Cart} />
                            <Route path="/customer/edit_profile" exact component={EditProfile} />
                            <Route path="/customer/my_favourite" exact component={MyFavourite} />
                            <Route path="/customer/search_results/:text" exact component={SearchResults} />
                            <Route path="/customer/current_order" exact component={CurrentOrder} />
                            <Route path="/customer/order_history" exact component={OrderHistory} />
                            <Route path="/customer/order_detail/:order_id" exact component={OrderDetail} />
                            <Route path="/customer/food_add_comment/:food_item_id" exact component={FoodAddComment} />
                            <Route path="/customer/food_see_comments/:food_item_id" exact component={FoodSeeComments} />
                            <Route path="/customer/food_edit_comment/:food_comment_id" exact component={FoodEditComment} />
                            <Route path="/customer/help" exact component={Help} />
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

, Redirect

<Menu.Item key="5">Message</Menu.Item>

*/
