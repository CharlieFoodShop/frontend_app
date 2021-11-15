import React, { useState, useEffect } from 'react';
import { Button, message, Table } from 'antd';
import axios from 'axios';
import MANAGER_API_URL from '../../../config/MANAGER_API_URL';

const OrderHistory = (props) => {

    const [orderList, setOrderList] = useState([]);

    useEffect(async () => {
        try {
            let results = await getOrderHistory(localStorage.getItem('managerEmail'));
            for (let i = 0; i < results.length; i++) {
                results[i].key = i;
            }

            setOrderList(results);
        } catch (e) {
            return message.error('Sorry, fail to get order history!');
        }
    }, []);

    const getOrderHistory = async (email_address) => {
        let results = await axios({
            method: 'get',
            url: MANAGER_API_URL.GET_ORDER_HISTORY + "?email_address=" + email_address
        });

        return results.data.data;
    }

    const handleSeeDetail = (order_id) => {
        return props.history.push('/manager/order_detail/' + order_id);
    }

    return (
        <div>
            <Table
                bordered
                dataSource={orderList}
                columns={[
                    {
                        title: 'Customer',
                        dataIndex: 'customer_name'
                    },
                    {
                        title: 'Time',
                        dataIndex: 'created_at'
                    },
                    {
                        title: 'Status',
                        dataIndex: 'order_status_name',
                        render: order_status_name => (
                            order_status_name === 'COMPLETE' ?
                                <span style={{ color: 'green', fontWeight: 'bold' }}>{order_status_name}</span> :
                                <span>{order_status_name}</span>
                        )
                    },
                    {
                        title: 'Action',
                        dataIndex: 'order_id',
                        render: order_id => <Button type="primary" onClick={() => handleSeeDetail(order_id)}>See Detail</Button>
                    }
                ]}
            />
        </div>
    )
}

export default OrderHistory;