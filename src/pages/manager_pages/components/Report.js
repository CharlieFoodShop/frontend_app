import React, { useState, useEffect } from 'react';
import { Col, Row, Typography, Divider, message, Select } from 'antd';
import axios from 'axios';
import MANAGER_SERVICE_PATH from '../../../config/MANAGER_API_URL';

const Report = () => {

    const [recentSalesList, setRecentSalesList] = useState([]);
    const [recentFoodTotal, setRecentFoodTotal] = useState(0);
    const [recentHstTotal, setRecentHstTotal] = useState(0);
    const [recentTotal, setRecentTotal] = useState(0);

    const [mostProlificShop, setMostProlificShop] = useState('');
    const [mostProlificSeller, setMostProlificSeller] = useState('');

    const [timePeriod, setTimePeriod] = useState([
        { start_time: '0:00:00', end_time: '1:00:00' },
        { start_time: '1:00:00', end_time: '2:00:00' },
        { start_time: '2:00:00', end_time: '3:00:00' },
        { start_time: '3:00:00', end_time: '4:00:00' },
        { start_time: '4:00:00', end_time: '5:00:00' },
        { start_time: '5:00:00', end_time: '6:00:00' },
        { start_time: '6:00:00', end_time: '7:00:00' },
        { start_time: '7:00:00', end_time: '8:00:00' },
        { start_time: '8:00:00', end_time: '9:00:00' },
        { start_time: '9:00:00', end_time: '10:00:00' },
        { start_time: '10:00:00', end_time: '11:00:00' },
        { start_time: '11:00:00', end_time: '12:00:00' },
        { start_time: '12:00:00', end_time: '13:00:00' },
        { start_time: '13:00:00', end_time: '14:00:00' },
        { start_time: '14:00:00', end_time: '15:00:00' },
        { start_time: '15:00:00', end_time: '16:00:00' },
        { start_time: '16:00:00', end_time: '17:00:00' },
        { start_time: '17:00:00', end_time: '18:00:00' },
        { start_time: '18:00:00', end_time: '19:00:00' },
        { start_time: '19:00:00', end_time: '20:00:00' },
        { start_time: '20:00:00', end_time: '21:00:00' },
        { start_time: '21:00:00', end_time: '22:00:00' },
        { start_time: '22:00:00', end_time: '23:00:00' },
        { start_time: '23:00:00', end_time: '24:00:00' }
    ]);
    const [regionList, setRegionList] = useState([]);
    const [userList, setUserList] = useState([]);

    const [text1, setText1] = useState('');
    const [text2, setText2] = useState('');
    const [text3, setText3] = useState('');

    useEffect(async () => {
        try {
            let initial_state = await getInitialState(localStorage.getItem('managerEmail'));

            setRecentSalesList(initial_state.recent_sales_list);
            setRecentFoodTotal(initial_state.recent_food_total);
            setRecentHstTotal(initial_state.recent_hst_total);
            setRecentTotal(initial_state.recent_total);

            setMostProlificShop(initial_state.most_prolific_seller.food_shop_name);
            setMostProlificSeller(initial_state.most_prolific_seller.name);

            setRegionList(initial_state.region_list);
            setUserList(initial_state.user_list);
        } catch (e) {
            return message.error('Sorry, error occured!');
        }
    }, []);

    const getInitialState = async (email_address) => {
        let results = await axios({
            method: 'get',
            url: MANAGER_SERVICE_PATH.GET_REPORT_INITIAL_STATE + "?email_address=" + email_address
        });

        return results.data.data;
    }

    const handleTimePeriod = async (index) => {
        try {
            let result = await axios({
                method: 'get',
                url: MANAGER_SERVICE_PATH.GET_SALES_BY_TIME_PERIOD + "?email_address=" + localStorage.getItem('managerEmail')
                    + "&&start_time=" + timePeriod[index].start_time + "&&end_time=" + timePeriod[index].end_time
            });

            let state = result.data.data;
            setText1("Food Total: $ " + state.food_total + ",    HST Total: $ " + state.hst_total + ",    Total: $ " + state.total);
        } catch (e) {
            return message.error('Sorry, action failed!');
        }
    }

    const handleRegion = async (index) => {
        try {
            let result = await axios({
                method: 'get',
                url: MANAGER_SERVICE_PATH.GET_SALES_BY_REGION + "?email_address=" + localStorage.getItem('managerEmail')
                    + "&&region=" + regionList[index].address
            });

            let state = result.data.data
            setText2("Food Total: $ " + state.food_total + ",    HST Total: $ " + state.hst_total + ",    Total: $ " + state.total);
        } catch (e) {
            return message.error('Sorry, action failed!');
        }
    }

    const handleUser = async (index) => {
        try {
            let result = await axios({
                method: 'get',
                url: MANAGER_SERVICE_PATH.GET_SALES_BY_USER_ID + "?email_address=" + localStorage.getItem('managerEmail')
                    + "&&user_id=" + userList[index].customer_id
            });

            let state = result.data.data
            setText3("Food Total: $ " + state.food_total + ",    HST Total: $ " + state.hst_total + ",    Total: $ " + state.total);
        } catch (e) {
            return message.error('Sorry, action failed!');
        }
    }

    return (
        <div>
            <Typography.Title level={3}>Reports and Filters</Typography.Title>
            <Divider />
            <Typography.Title level={4}>Recent Sales (within one week)</Typography.Title>
            <Row>
                <Col span={4}>
                    <Typography.Title level={5}>Order ID</Typography.Title>
                </Col>
                <Col span={5}>
                    <Typography.Title level={5}>Completed At</Typography.Title>
                </Col>
                <Col span={5}>
                    <Typography.Title level={5}>Food Total</Typography.Title>
                </Col>
                <Col span={5}>
                    <Typography.Title level={5}>HST</Typography.Title>
                </Col>
                <Col span={5}>
                    <Typography.Title level={5}>Total</Typography.Title>
                </Col>
            </Row>
            <br />
            {
                recentSalesList.map((item, index) => (
                    <div key={index}>
                        <Row>
                            <Col span={4}>
                                <Typography.Text>{item.order_id}</Typography.Text>
                            </Col>
                            <Col span={5}>
                                <Typography.Text>{item.completed_at}</Typography.Text>
                            </Col>
                            <Col span={5}>
                                <Typography.Text>$ {Math.floor(item.total * 100) / 100}</Typography.Text>
                            </Col>
                            <Col span={5}>
                                <Typography.Text>$ {Math.floor(item.hst * 100) / 100}</Typography.Text>
                            </Col>
                            <Col span={5}>
                                <Typography.Text>$ {Math.floor((item.total + item.hst) * 100) / 100}</Typography.Text>
                            </Col>
                        </Row>
                        <br />
                    </div>
                ))
            }
            <br />
            <Typography.Title level={5}>Recent Food Total: $ {Math.floor(recentFoodTotal * 100) / 100}</Typography.Title>
            <Typography.Title level={5}>Recent HST Total: $ {Math.floor(recentHstTotal * 100) / 100}</Typography.Title>
            <Typography.Title level={4}>Recent Total: $ {Math.floor(recentTotal * 100) / 100}</Typography.Title>
            <Divider />
            <Typography.Title level={4}>Most Prolific Sellers (Food Shop): {mostProlificSeller} ({mostProlificShop})</Typography.Title>
            <Divider />
            <Typography.Title level={4}>Total Sales: </Typography.Title>
            <br />

            <Select
                placeholder="Choose Time Period Here"
                size="large"
                style={{ width: '40%' }}
                onChange={handleTimePeriod}
            >
                {
                    timePeriod.map((item, index) => (
                        <Select.Option value={index} key={index}>
                            {item.start_time} - {item.end_time}
                        </Select.Option>
                    ))
                }
            </Select>
            <br />
            <Typography.Title level={5}>For Time Period: {text1}</Typography.Title>
            <br /><br />

            <Select
                placeholder="Choose Region Here"
                size="large"
                style={{ width: '40%' }}
                onChange={handleRegion}
            >
                {
                    regionList.map((item, index) => (
                        <Select.Option value={index} key={index}>
                            {item.address}
                        </Select.Option>
                    ))
                }
            </Select>
            <br />
            <Typography.Title level={5}>For Region: {text2}</Typography.Title>
            <br /><br />

            <Select
                placeholder="Choose User Name Here"
                size="large"
                style={{ width: '40%' }}
                onChange={handleUser}
            >
                {
                    userList.map((item, index) => (
                        <Select.Option value={index} key={index}>
                            {item.first_name + " " + item.last_name}
                        </Select.Option>
                    ))
                }
            </Select>
            <br />
            <Typography.Title level={5}>For User: {text3}</Typography.Title>
            <br /><br />
        </div>
    )
}

export default Report;