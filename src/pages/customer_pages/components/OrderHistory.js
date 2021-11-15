import React, { useState, useEffect } from 'react';
import { Row, Col, Button, Typography, message } from 'antd';
import axios from 'axios';
import CUSTOMER_SERVICE_PATH from '../../../config/CUSTOMER_API_URL';

const OrderHistory = (props) => {

    const [orderList, setOrderList] = useState([]);

    useEffect(async () => {
        try {
            let results = await getOrderHistory(localStorage.getItem('customerEmail'));
            setOrderList(results);
        } catch (e) {
            return message.error('Sorry, fail to get order history!');
        }
    }, []);

    const getOrderHistory = async (email_address) => {
        let results = await axios({ method: 'get', url: CUSTOMER_SERVICE_PATH.GET_ORDER_HISTORY + "?email_address=" + email_address });
        return results.data.data;
    }

    const handleSeeDetail = (order_id) => {
        return props.history.push('/customer/order_detail/' + order_id);
    }

    return (
        <div>
            {
                orderList.length === 0 ?
                    <Typography.Title level={3}>You have no orders in history</Typography.Title> :
                    <div>
                        <Row>
                            <Col span={6}>
                                <Typography.Title level={4}>Order ID</Typography.Title>
                            </Col>
                            <Col span={6}>
                                <Typography.Title level={4}>Created At</Typography.Title>
                            </Col>
                            <Col span={6}>
                                <Typography.Title level={4}>Status</Typography.Title>
                            </Col>
                            <Col span={6}>
                                <Typography.Title level={4}>Action</Typography.Title>
                            </Col>
                        </Row>
                        <br />
                        {
                            orderList.map((item, index) => (
                                <div key={index}>
                                    <Row>
                                        <Col span={6}>
                                            <Typography.Text style={{ paddingLeft: '10%' }}>{item.order_id}</Typography.Text>
                                        </Col>
                                        <Col span={6}>
                                            <Typography.Text>{item.created_at}</Typography.Text>
                                        </Col>
                                        <Col span={6}>
                                            {
                                                item.order_status_name === 'COMPLETE' ?
                                                    <Typography.Text style={{ color: 'green', fontWeight: 'bold' }}>{item.order_status_name}</Typography.Text> :
                                                    <Typography.Text>{item.order_status_name}</Typography.Text>
                                            }
                                        </Col>
                                        <Col span={6}>
                                            <Button type="primary" onClick={() => handleSeeDetail(item.order_id)}>See Detail</Button>
                                        </Col>
                                    </Row>
                                    <br />
                                </div>
                            ))
                        }
                    </div>
            }
        </div>
    )
}

export default OrderHistory;
