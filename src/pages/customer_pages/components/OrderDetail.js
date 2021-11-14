import React, { useState, useEffect } from 'react';
import { message, Row, Col, Typography, Button, Divider } from 'antd';
import axios from 'axios';
import CUSTOMER_SERVICE_PATH from '../../../config/CUSTOMER_API_URL';

const OrderDetail = (props) => {

    const [completedAt, setCompletedAt] = useState(null);
    const [createdAt, setCreatedAt] = useState(null);
    const [hst, setHst] = useState(0);
    const [note, setNote] = useState('');
    const [total, setTotal] = useState(0);

    const [orderId, setOrderId] = useState(0);
    const [orderItems, setOrderItems] = useState([]);
    const [orderStatusName, setOrderStatusName] = useState(null);

    useEffect(async () => {
        try {
            let result = await getOrderDetail(props.match.params.order_id);

            setCompletedAt(result.completed_at);
            setCreatedAt(result.created_at);
            setHst(result.hst);
            setNote(result.note);
            setTotal(result.total);

            setOrderId(result.order_id);
            setOrderItems(result.order_items);
            setOrderStatusName(result.order_status_name);
        } catch (e) {
            message.error('Sorry, fail to get order detail!');
            return props.history.push('/customer/');
        }
    }, []);

    const getOrderDetail = async (order_id) => {
        let result = await axios({ method: 'get', url: CUSTOMER_SERVICE_PATH.GET_ORDER_DETAIL + "?order_id=" + order_id });
        return result.data.data;
    }

    const handleSeeComments = (food_item_id) => {
        return props.history.push("/customer/food_see_comments/" + food_item_id);
    }

    const handleAddComment = (food_item_id) => {
        return props.history.push('/customer/food_add_comment/' + food_item_id);
    }

    return (
        <div>
            <Typography.Title level={2}>Order ID: {orderId}</Typography.Title>
            <Typography.Title level={4}>Created At: {createdAt}</Typography.Title>
            <Typography.Title level={4}>Completed At: {completedAt ? completedAt : 'Not Available'}</Typography.Title>
            <Typography.Title level={4}>Status: {orderStatusName}</Typography.Title>
            <br />
            <Typography.Text>Note: {note}</Typography.Text>
            <Divider />
            <Row>
                <Col span={4}>
                    <Typography.Title level={4}>Food Name</Typography.Title>
                </Col>
                <Col span={4}>
                    <Typography.Title level={4}>Food Price</Typography.Title>
                </Col>
                <Col span={4}>
                    <Typography.Title level={4}>Quantity</Typography.Title>
                </Col>
                <Col span={4}>
                    <Typography.Title level={4}>Sub Total</Typography.Title>
                </Col>
                <Col span={8}>
                    <Typography.Title level={4} style={{ paddingLeft: '30%' }}>Action</Typography.Title>
                </Col>
            </Row>
            <br />
            {
                orderItems.map((item, index) => (
                    <div key={index}>
                        <Row>
                            <Col span={4}>
                                <Typography.Text>{item.food_name}</Typography.Text>
                            </Col>
                            <Col span={4}>
                                <Typography.Text>$ {Math.floor(item.food_price * 100) / 100}</Typography.Text>
                            </Col>
                            <Col span={4}>
                                <Typography.Text>{item.quantity}</Typography.Text>
                            </Col>
                            <Col span={4}>
                                <Typography.Text>$ {Math.floor(item.sub_total * 100) / 100}</Typography.Text>
                            </Col>
                            <Col span={8}>
                                <Button style={{ marginRight: '3%' }} type="primary" onClick={() => handleSeeComments(item.food_item_id)}>See My Comments</Button>
                                <Button type="primary" onClick={() => handleAddComment(item.food_item_id)}>Add New Comment</Button>
                            </Col>
                        </Row>
                        <br />
                    </div>
                ))
            }
            <Divider />
            <Typography.Title level={5}>Food Total: $ {Math.floor(total * 100) / 100}</Typography.Title>
            <Typography.Title level={5}>HST: $ {Math.floor(hst * 100) / 100}</Typography.Title>
            <Typography.Title level={4}>Total: $ {Math.floor((total + hst) * 100) / 100}</Typography.Title>
        </div>
    )
}

export default OrderDetail;