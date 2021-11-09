import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { message, Card, Typography } from 'antd';
import { StarOutlined } from '@ant-design/icons';
import axios from 'axios';
import CUSTOMER_SERVICE_PATH from '../../../config/CUSTOMER_API_URL';

const SearchResults = (props) => {

    const [foodShopList, setFoodShopList] = useState([]);

    useEffect(async () => {
        try {
            let result = await getSearchResults(props.match.params.text, localStorage.getItem('customerEmail'));
            setFoodShopList(result);
        } catch (e) {
            return message.error('Sorry, could not get search reaults!');
        }
    }, [props.match.params.text]);

    const getSearchResults = async (text, email_address) => {
        let results = await axios({
            method: 'get',
            url: CUSTOMER_SERVICE_PATH.GET_SEARCH_RESULTS + "?text=" + text + "&&email_address=" + email_address
        });

        return results.data.data;
    }


    return (
        <div>
            {
                foodShopList.length === 0 ?
                    <Typography.Title level={3}>No result found</Typography.Title> :
                    <></>
            }
            {
                foodShopList.map((item, index) => (
                    <div style={{ width: 220, float: 'left', margin: '2%' }} key={index}>
                        <Link to={"/customer/food_shop/" + item.food_shop_id} >
                            <Card
                                hoverable
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

export default SearchResults;
