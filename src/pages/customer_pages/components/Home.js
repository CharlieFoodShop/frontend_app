import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { message, Card } from 'antd';
import { StarOutlined } from '@ant-design/icons';
import axios from 'axios';
import CUSTOMER_SERVICE_PATH from '../../../config/CUSTOMER_API_URL';

import '../../../static/css/customer_css/card.css';

const Home = () => {

    const [foodShopList, setFoodShopList] = useState([]);

    useEffect(async () => {
        try {
            let result = await getRandomFoodShops(localStorage.getItem('customerEmail'));
            setFoodShopList(result);
        } catch (e) {
            return message.error('Sorry, could not get food shops!');
        }
    }, []);

    const getRandomFoodShops = async (email_address) => {
        let results = await axios({ method: 'get', url: CUSTOMER_SERVICE_PATH.RANDOM_FOOD_SHOP_POP_UP + "?email_address=" + email_address });
        return results.data.data;
    }

    return (
        <div>
            {
                foodShopList.map((item, index) => (
                    <div className='customize-card' key={index}>
                        <Link to={"/customer/food_shop/" + item.food_shop_id} >
                            <Card
                                hoverable
                                style={{ height: 400 }}
                                cover={<img style={{ height: 200 }} alt="food_shop" src={item.image_url} />}
                                bordered={false}>
                                <Card.Meta title={item.food_shop_name} description={
                                    <div>
                                        <p>{item.working_address}</p>
                                        <p>{item.food_shop_category_name}
                                            {
                                                item.on_favourite ?
                                                    <span style={{ float: 'right' }}><StarOutlined /></span> :
                                                    <></>
                                            }
                                        </p>

                                    </div>
                                } />
                            </Card>
                        </Link>
                    </div>
                ))
            }
        </div>
    )
}

export default Home;
