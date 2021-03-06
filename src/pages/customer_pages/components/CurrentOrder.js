import React, { useState, useEffect } from 'react';
import { Row, Col, Button, Typography, message } from 'antd';
import axios from 'axios';
import CUSTOMER_SERVICE_PATH from '../../../config/CUSTOMER_API_URL';

const CurrentOrder = (props) => {

    const [orderList, setOrderList] = useState([]);

    useEffect(async () => {
        try {
            let results = await getCurrentOrders(localStorage.getItem('customerEmail'));
            setOrderList(results);
        } catch (e) {
            return message.error('Sorry, fail to get current orders!');
        }
    }, []);

    const getCurrentOrders = async (email_address) => {
        let results = await axios({ method: 'get', url: CUSTOMER_SERVICE_PATH.GET_CURRENT_ORDERS + "?email_address=" + email_address });
        return results.data.data;
    }

    const handleSeeDetail = (order_id) => {
        return props.history.push('/customer/order_detail/' + order_id);
    }

    return (
        <div>
            {
                orderList.length === 0 ?
                    <Typography.Title level={3}>You have no current orders yet</Typography.Title> :
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
                                            <Typography.Text>{item.order_status_name}</Typography.Text>
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

export default CurrentOrder;
