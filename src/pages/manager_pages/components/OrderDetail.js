import React, { useState, useEffect } from 'react';
import { message, Row, Col, Typography, Button, Divider } from 'antd';
import axios from 'axios';
import MANAGER_API_URL from '../../../config/MANAGER_API_URL';

const OrderDetail = (props) => {

    const [address, setAddress] = useState(null);
    const [createdAt, setCreatedAt] = useState(null);
    const [completedAt, setCompletedAt] = useState(null);
    const [firstName, setFirstName] = useState(null);
    const [lastName, setLastName] = useState(null);
    const [hst, setHst] = useState(0);
    const [total, setTotal] = useState(0);
    const [items, setItems] = useState([]);
    const [note, setNote] = useState(null);
    const [orderStatusName, setOrderStatusName] = useState(null);

    useEffect(async () => {
        try {
            let result = await getOrderDetail(props.match.params.order_id);

            setAddress(result.address);
            setCreatedAt(result.created_at);
            setCompletedAt(result.completed_at);
            setFirstName(result.first_name);
            setLastName(result.last_name);
            setHst(result.hst);
            setTotal(result.total);
            setItems(result.items);
            setNote(result.note);
            setOrderStatusName(result.order_status_name)
        } catch (e) {
            return message.error('Sorry, fail to get order detail!');
        }
    }, []);

    const getOrderDetail = async (order_id) => {
        let result = await axios({
            method: 'get',
            url: MANAGER_API_URL.GET_ORDER_DETAIL + "?order_id=" + order_id
        });

        return result.data.data;
    }

    const handleGoBack = () => {
        return props.history.push('/manager/order_history');
    }

    return (
        <div>
            <div>
                <Button type="primary" onClick={handleGoBack}>Go Back</Button>
            </div>
            <Divider />
            <Row>
                <Col span={8}>
                    <Typography.Title level={4}>Customer: {firstName + " " + lastName}</Typography.Title>
                </Col>
                <Col span={8}>
                    <Typography.Title level={4}>Address: {address}</Typography.Title>
                </Col>
                <Col span={8}>
                    <Typography.Title level={4}>Status: {orderStatusName === 'COMPLETE' ? (<span style={{ color: 'green', fontWeight: 'bold' }}>{orderStatusName}</span>) : (<span>{orderStatusName}</span>)}</Typography.Title>
                </Col>
            </Row>
            <br /><br />
            <Typography.Title level={4}>Created At: {createdAt}</Typography.Title>
            <Typography.Title level={4}>Completed At: {completedAt ? completedAt : 'Not Available'}</Typography.Title>
            <br /><br />
            <Typography.Text>Note: {note}</Typography.Text>
            <br /><br />
            <div style={{ border: '1px solid black', padding: '3%' }}>
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
                    items.map((item, item_index) => (
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
            <Typography.Title level={5}>Food Total: $ {Math.floor(total * 100) / 100}</Typography.Title>
            <Typography.Title level={5}>HST: $ {Math.floor(hst * 100) / 100}</Typography.Title>
            <Typography.Title level={4}>Total: $ {Math.floor((total + hst) * 100) / 100}</Typography.Title>
        </div>
    )
}

export default OrderDetail;
