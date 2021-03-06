import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { message, Row, Col, Card, Typography, Button, Divider, Rate, Radio, Input } from 'antd';
import axios from 'axios';
import CUSTOMER_SERVICE_PATH from '../../../config/CUSTOMER_API_URL';

import '../../../static/css/customer_css/card.css';


const FoodShop = (props) => {

    const [foodShopId, setFoodShopId] = useState(0);
    const [foodShopName, setFoodShopName] = useState('');
    const [foodShopCategoryName, setFoodShopCategoryName] = useState('');
    const [foodShopDescription, setFoodShopDescription] = useState('');
    const [foodShopRating, setFoodShopRating] = useState(null);
    const [imageUrl, setImageUrl] = useState('');
    const [active, setActive] = useState(false);
    const [onFavourite, setOnFavourite] = useState(false);
    const [openTime, setOpenTime] = useState('');
    const [workingAddress, setWorkingAddress] = useState('');

    const [foodCategoryList, setFoodCategoryList] = useState([]);
    const [foodItemList, setFoodItemList] = useState([]);

    const [rating, setRating] = useState(0);
    const [ratingDisabled, setRatingDisabled] = useState(false);

    useEffect(async () => {
        try {
            let food_shop_detail = await getFoodShopDetail(localStorage.getItem('customerEmail'), props.match.params.food_shop_id);
            setFoodShopId(food_shop_detail.food_shop_id);
            setFoodShopName(food_shop_detail.food_shop_name);
            setFoodShopCategoryName(food_shop_detail.food_shop_category_name);
            setFoodShopDescription(food_shop_detail.food_shop_description);
            setFoodShopRating(food_shop_detail.food_shop_rating);
            setImageUrl(food_shop_detail.image_url);
            setActive(food_shop_detail.active);
            setOnFavourite(food_shop_detail.on_favourite);
            setOpenTime(food_shop_detail.open_time);
            setWorkingAddress(food_shop_detail.working_address);

            let food_category_list = await getFoodCategories(props.match.params.food_shop_id);
            setFoodCategoryList(food_category_list);

            let food_item_list = await getFoodItemByShopId(props.match.params.food_shop_id);
            setFoodItemList(food_item_list);

        } catch (e) {
            return message.error('Sorry, fail to get food shop detail!');
        }
    }, []);

    const getFoodShopDetail = async (email_address, food_shop_id) => {
        let result = await axios({
            method: 'get',
            url: CUSTOMER_SERVICE_PATH.GET_FOOD_SHOP_DETAIL + "?email_address=" + email_address + "&&food_shop_id=" + food_shop_id
        });
        return result.data.data;
    }

    const getFoodCategories = async (food_shop_id) => {
        let results = await axios({
            method: 'get',
            url: CUSTOMER_SERVICE_PATH.GET_FOOD_CATEGORIES + "?food_shop_id=" + food_shop_id
        });
        return results.data.data;
    }

    const getFoodItemByShopId = async (food_shop_id) => {
        let results = await axios({
            method: 'get',
            url: CUSTOMER_SERVICE_PATH.GET_FOOD_ITEMS_BY_SHOP_ID + "?food_shop_id=" + food_shop_id
        });
        return results.data.data;
    }

    const getFoodItemByCategoryId = async (food_category_id) => {
        let results = await axios({
            method: 'get',
            url: CUSTOMER_SERVICE_PATH.GET_FOOD_ITEMS_BY_CATEGORY_ID + "?food_category_id=" + food_category_id
        });
        return results.data.data;
    }

    const handleFoodItemListChange = async (food_category_id) => {
        try {
            let food_item_list = await getFoodItemByCategoryId(food_category_id);
            setFoodItemList(food_item_list);
        } catch (e) {
            return message.error('Sorry, fail to get food list');
        }
    }

    const handleGoBack = () => {
        return props.history.push('/customer/');
    }

    const handleEditMyFavourite = async () => {
        try {
            let result = await axios({
                method: 'post',
                url: CUSTOMER_SERVICE_PATH.UPDATE_FAVOURITE_FOOD_SHOP,
                data: {
                    email_address: localStorage.getItem('customerEmail'),
                    food_shop_id: foodShopId,
                    on_favourite: onFavourite
                }
            });

            if (result.data.success) {
                setOnFavourite(pre => !pre);
            } else {
                return message.error('Error occured, please try again');
            }
        } catch (e) {
            return message.error('Error occured, please try again');
        }
    }

    const handleAddRating = async () => {
        try {
            if (!rating)
                return message.warn('Sorry, rating can not be blank!');


            let data = {
                food_shop_id: props.match.params.food_shop_id,
                rating: rating
            };

            let result = await axios({
                method: 'post',
                url: CUSTOMER_SERVICE_PATH.ADD_RATING_FOR_FOOD_SHOP,
                data: data
            });

            if (result.data.success) {
                message.success('Thanks for your feedback!');
                return setRatingDisabled(true);
            } else {
                return message.error('Action failed, please try again!');
            }

        } catch (e) {
            return message.error('Action failed, please try again!');
        }
    }

    const handleSearch = async (text) => {
        try {
            if (!text) {
                return message.warn('Search text can not be blank!');
            }

            let result = await axios({
                method: 'get',
                url: CUSTOMER_SERVICE_PATH.GET_FOOD_ITEMS_BY_SEARCH_TEXT
                    + "?food_shop_id=" + props.match.params.food_shop_id + "&&search_text=" + text
            });

            if (result.data.success) {
                return setFoodItemList(result.data.data);
            } else {
                return message.error('Action failed, please try again!');
            }
        } catch (e) {
            return message.error('Action Failed, please try again!');
        }
    }

    return (
        <div>
            <div style={{ width: '100%', height: '150px', overflow: 'hidden' }}>
                <img alt="shop-image" src={imageUrl} style={{ width: '100%', marginTop: '-50%' }} />
            </div>
            <br />
            <Row>
                <Col span={12}>
                    <Button style={{ float: 'left' }} type="primary" onClick={handleGoBack}>Go Back</Button>
                </Col>
                <Col span={12}>
                    <Button style={{ float: 'right' }} type="primary" onClick={handleEditMyFavourite}>
                        {
                            onFavourite ?
                                'Remove from My Favoruite' :
                                'Add to My Favoruite'
                        }
                    </Button>
                </Col>
            </Row>
            <Divider />
            <Typography.Title level={2}>{foodShopName}</Typography.Title>
            <Row>
                <Col span={8}>
                    <Typography.Title level={5} >Type: {foodShopCategoryName}</Typography.Title>
                </Col>
                <Col span={8}>
                    <Typography.Title level={5}>
                        Rating:
                        {foodShopRating ?
                            <Rate
                                disabled
                                defaultValue={foodShopRating}
                            /> :
                            '   Not Available'}

                    </Typography.Title>
                </Col>
                <Col span={8}>
                    <Typography.Title level={5}>Address: {workingAddress}</Typography.Title>
                </Col>
            </Row>
            <Typography.Text>Description: {foodShopDescription}</Typography.Text>
            <br /><br />
            <Typography.Title level={5}>
                Status:
                {
                    active ?
                        <span style={{ color: 'green' }}>   Opening</span> :
                        <span>
                            <span style={{ color: 'red' }}>    Closed</span>
                            (Will be open at {openTime})
                        </span>
                }
            </Typography.Title>
            <Divider />
            <br />
            <Rate
                style={{ backgroundColor: 'white', padding: '1%' }}
                onChange={value => setRating(value)}
                disabled={ratingDisabled}
                value={rating}
            />
            <br /><br />
            <Button type="primary" onClick={handleAddRating} disabled={ratingDisabled}>Add Rate For Food Shop</Button>
            <br />
            <Divider />
            <Input.Search
                allowClear
                enterButton
                style={{ width: '50%' }}
                placeholder="Search for food"
                onSearch={handleSearch}
            />
            <br /><br />
            <div>
                <Typography.Text>Category Filter: </Typography.Text>
                <Radio.Group
                    onChange={e => handleFoodItemListChange(e.target.value)}
                >
                    {
                        foodCategoryList.map((item, index) => (
                            <Radio.Button
                                value={item.food_category_id}
                                key={index}
                            >
                                {item.food_category_name}
                            </Radio.Button>
                        ))
                    }
                </Radio.Group>
            </div>
            <br />
            <div>
                {
                    foodItemList.length === 0 ?
                        <Typography.Title level={3}>Sorry, no food items found</Typography.Title> :
                        <></>
                }
                {
                    foodItemList.map((item, index) => (
                        <div className='customize-card' key={index}>
                            <Link to={"/customer/food_item/" + item.food_item_id} >
                                <Card
                                    hoverable
                                    style={{ height: 400 }}
                                    cover={<img style={{ height: 200 }} alt="food_item" src={item.image_url} />}
                                    bordered={false}>
                                    <Card.Meta title={item.food_name} description={
                                        <div>
                                            <p>{item.food_category_name}</p>
                                            <p>$ {item.food_price}</p>
                                            {
                                                item.food_average_rating ?
                                                    <Rate disabled defaultValue={item.food_average_rating} /> :
                                                    <Rate disabled defaultValue={0} />
                                            }
                                        </div>
                                    } />
                                </Card>
                            </Link>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default FoodShop;
