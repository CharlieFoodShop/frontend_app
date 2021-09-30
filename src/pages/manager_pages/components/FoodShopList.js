import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { message, Row, Col, List, Typography, Button, Divider } from 'antd';
import axios from 'axios';
import MANAGER_SERVICE_PATH from '../../../config/MANAGER_API_URL';
import '../../../static/css/manager_css/list.css';

const FoodShopList = (props) => {

    const [helloTitle, setHelloTitle] = useState('');
    const [foodShopList, setFoodShopList] = useState([]);
    const [managerId, setManagerId] = useState(null);

    useEffect(async () => {
        try {
            let managetDetail = await getManagerDetail();

            let first_name = managetDetail.data.data.first_name;
            let last_name = managetDetail.data.data.last_name
            let manager_id = managetDetail.data.data.manager_id;
            setManagerId(manager_id);

            let timeTitle = getTimeTitle();
            setHelloTitle(timeTitle + ", " + first_name + " " + last_name);

            let list_result = await getFoodShopList(manager_id);
            setFoodShopList(list_result.data.data);

            console.log(list_result.data.data);
        } catch (e) {
            return message.error(e.message);
        }
    }, []);

    const handleAddFoodShop = () => {
        if (managerId) {
            return props.history.push('/manager/add_food_shop/' + managerId);
        } else {
            return message.error('Manager ID not exist.');
        }
    }

    const getManagerDetail = async () => {
        let result = await axios({ method: 'get', url: MANAGER_SERVICE_PATH.GET_MANAGER_DETAIL + "?email_address=" + localStorage.getItem('managerEmail') })
        return result;
    }

    const getFoodShopList = async (manager_id) => {
        let results = await axios({ method: 'get', url: MANAGER_SERVICE_PATH.GET_FOOD_SHOP_LIST + "?manager_id=" + manager_id });
        return results;
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

    return (
        <div>
            <Row>
                <Col span={12}>
                    <Typography.Title level={5}>
                        {helloTitle}
                    </Typography.Title>
                </Col>
                <Col span={12}>
                    <Button style={{ float: 'right' }} type="primary" onClick={handleAddFoodShop}>ADD NEW FOOD SHOP</Button>
                </Col>
            </Row>
            <Divider />
            <List
                itemLayout="vertical"
                dataSource={foodShopList}
                renderItem={item => (
                    <List.Item>
                        <Link to={"/manager/food_shop_detail/" + item.food_shop_id} >
                            <div className="list-title">{item.food_shop_name}</div>
                        </Link>
                        <div
                            className="list-context"
                        >
                            <Typography.Title level={5}>{item.food_shop_description}</Typography.Title>
                            <img src={item.image_url} alt="shop_image" />
                        </div>
                    </List.Item>
                )}
            />
        </div>
    )
}

export default FoodShopList;
