import React, { useState, useEffect } from 'react';
import { Row, Col, Button, Typography, message, Divider } from 'antd';
import axios from 'axios';
import MANAGER_API_URL from '../../../config/MANAGER_API_URL';

const CurrentOrders = (props) => {

    const [orderList, setOrderList] = useState([]);

    useEffect(async () => {
        try {
            let results = await getCurrentOrders(localStorage.getItem('managerEmail'));
            setOrderList(results);
        } catch (e) {
            return message.error('Sorry, fail to get current orders!');
        }
    }, []);

    const getCurrentOrders = async (email_address) => {
        let results = await axios({
            method: 'get',
            url: MANAGER_API_URL.GET_CURRENT_ORDERS + "?email_address=" + email_address
        });

        return results.data.data;
    }

    const handleSendMessage = () => {
        console.log("send message")
    }

    const handleCompleteOrder = async (order_id) => {
        try {

            let data = {
                order_id: order_id
            };

            let result = await axios({
                method: 'post',
                url: MANAGER_API_URL.COMPLETE_ORDER,
                data: data
            });

            if (result.data.success) {
                let results = await getCurrentOrders(localStorage.getItem('managerEmail'));
                setOrderList(results);

                return message.success('Complete order successful!');
            } else {
                return message.error('Action failed, please try again!');
            }
        } catch (e) {
            return message.error('Action failed, please try again!');
        }
    }

    return (
        <div>
            {
                orderList.length === 0 ?
                    <Typography.Title level={3}>You don't have new orders yet</Typography.Title> :
                    <div>
                        {
                            orderList.map((order_detail, order_index) => (
                                <div key={order_index}>
                                    <Typography.Title level={4}>Customer: {order_detail.first_name + " " + order_detail.last_name}</Typography.Title>
                                    <Typography.Title level={4}>Address: {order_detail.address}</Typography.Title>
                                    <Typography.Title level={4}>Created At: {order_detail.created_at}</Typography.Title>
                                    <br />
                                    <Typography.Text>Note: {order_detail.note}</Typography.Text>
                                    <br /><br />
                                    <div style={{ border: '1px solid black', padding: '2%' }}>
                                        <Row>
                                            <Col span={6}>
                                                <Typography.Title level={4}>Food Name</Typography.Title>
                                            </Col>
                                            <Col span={6}>
                                                <Typography.Title level={4}>Food Price</Typography.Title>
                                            </Col>
                                            <Col span={6}>
                                                <Typography.Title level={4}>Quantity</Typography.Title>
                                            </Col>
                                            <Col span={6}>
                                                <Typography.Title level={4}>Sub Total</Typography.Title>
                                            </Col>
                                        </Row>
                                        <br />
                                        {
                                            order_detail.items.map((item, item_index) => (
                                                <div key={item_index}>
                                                    <Row>
                                                        <Col span={6}>
                                                            <Typography.Text>{item.food_name}</Typography.Text>
                                                        </Col>
                                                        <Col span={6}>
                                                            <Typography.Text>$ {Math.floor(item.food_price * 100) / 100}</Typography.Text>
                                                        </Col>
                                                        <Col span={6}>
                                                            <Typography.Text>{item.quantity}</Typography.Text>
                                                        </Col>
                                                        <Col span={6}>
                                                            <Typography.Text>$ {Math.floor(item.sub_total * 100) / 100}</Typography.Text>
                                                        </Col>
                                                    </Row>
                                                    <br />
                                                </div>
                                            ))
                                        }
                                    </div>
                                    <br />
                                    <Typography.Title level={5}>Food Total: $ {Math.floor(order_detail.total * 100) / 100}</Typography.Title>
                                    <Typography.Title level={5}>HST: $ {Math.floor(order_detail.hst * 100) / 100}</Typography.Title>
                                    <Typography.Title level={4}>Total: $ {Math.floor((order_detail.total + order_detail.hst) * 100) / 100}</Typography.Title>
                                    <br />
                                    <Button type="primary" onClick={handleSendMessage}>Send Message</Button>
                                    <Button style={{ float: 'right' }} type="primary" onClick={() => handleCompleteOrder(order_detail.order_id)}>Complete Order</Button>
                                    <Divider />
                                </div>
                            ))
                        }
                    </div>
            }
        </div>
    )
}

export default CurrentOrders;
