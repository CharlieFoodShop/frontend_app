import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { message, Row, Col, Card, Typography, Button, Divider } from 'antd';
import axios from 'axios';
import CUSTOMER_SERVICE_PATH from '../../../config/CUSTOMER_API_URL';

const Home = () => {

    const [foodShopList, setFoodShopList] = useState([]);

    useEffect(async () => {
        try {
            let result = await getRandomFoodShops();
            console.log(result);
            setFoodShopList(result);
        } catch (e) {
            return;
        }
    }, []);

    const getRandomFoodShops = async () => {
        let results = await axios({ method: 'get', url: CUSTOMER_SERVICE_PATH.RANDOM_FOOD_SHOP_POP_UP });
        return results.data.data;
    }

    return (
        <div>
            {
                foodShopList.map((item, index) => (
                    <div style={{ width: 220, float: 'left', margin: '2%' }} key={index}>
                        <Link to={"/customer/food_shop/" + item.food_shop_id} >
                            <Card
                                hoverable
                                cover={<img style={{ height: 200 }} alt="food_shop" src={item.image_url} />}
                                bordered={false}>
                                <Card.Meta title={item.food_shop_name} description={item.working_address + "\n" + item.food_shop_category_name} />
                            </Card>
                        </Link>
                    </div>
                ))
            }
        </div>
    )
}

export default Home;
