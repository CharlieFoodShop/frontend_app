import React, { useState, useEffect, useContext } from 'react';
import { message, Row, Col, Typography, Button, Divider, Rate } from 'antd';
import { PlusOutlined, MinusOutlined } from '@ant-design/icons';
import axios from 'axios';
import CUSTOMER_SERVICE_PATH from '../../../config/CUSTOMER_API_URL';

import ShopContext from '../../../context/ShopContext';

const FoodItem = (props) => {

    const context = useContext(ShopContext);

    const [foodItemId, setFoodItemId] = useState(0);
    const [foodShopId, setFoodShopId] = useState(0);
    const [active, setActive] = useState(false);
    const [foodAverageRating, setFoodAverageRating] = useState(null);
    const [foodCategoryName, setFoodCategoryName] = useState('');
    const [foodDescription, setFoodDescription] = useState('');
    const [foodName, setFoodName] = useState('');
    const [foodPrice, setFoodPrice] = useState(0);
    const [imageUrl, setImageUrl] = useState('');

    const [quantity, setQuantity] = useState(0);

    useEffect(async () => {
        try {
            let food_item_detail = await getFoodItemDetail(props.match.params.food_item_id);
            setFoodItemId(food_item_detail.food_item_id);
            setFoodShopId(food_item_detail.food_shop_id);
            setActive(food_item_detail.active);
            setFoodAverageRating(food_item_detail.food_average_rating);
            setFoodCategoryName(food_item_detail.food_category_name);
            setFoodDescription(food_item_detail.food_description);
            setFoodName(food_item_detail.food_name);
            setFoodPrice(food_item_detail.food_price);
            setImageUrl(food_item_detail.image_url);
        } catch (e) {
            return message.error('Sorry, fail to get food item detail!');
        }

    }, []);

    const getFoodItemDetail = async (food_item_id) => {
        let result = await axios({
            method: 'get',
            url: CUSTOMER_SERVICE_PATH.GET_FOOD_ITEM_DETAIL_BY_ID + "?food_item_id=" + food_item_id
        });
        return result.data.data;
    }

    const handleGoBack = () => {
        return props.history.push('/customer/food_shop/' + foodShopId);
    }

    const handleAddItemToCart = () => {
        if (quantity <= 0) {
            return message.error('Sorry, quantity can not be zero!');
        }

        context.addProductToCart({
            food_item_id: foodItemId,
            food_name: foodName,
            food_price: foodPrice,
            quantity: quantity
        });

        return props.history.push('/customer/food_shop/' + foodShopId);
    }

    return (
        <div>
            <Button style={{ float: 'left' }} type="primary" onClick={handleGoBack}>Go Back</Button>
            <br />
            <Divider />
            <Row>
                <Col span={12}>
                    <img
                        alt="food_item"
                        src={imageUrl}
                        style={{ width: '80%' }}
                    />
                </Col>
                <Col span={12}>
                    <Typography.Title level={2}>{foodName}</Typography.Title>
                    <Typography.Text>Description: {foodDescription}</Typography.Text>
                </Col>
            </Row>
            <br /><br />
            <Row>
                <Col span={8}>
                    <Typography.Title level={5}>Price: ${foodPrice}</Typography.Title>
                </Col>
                <Col span={8}>
                    <Typography.Title level={5}>Category: {foodCategoryName}</Typography.Title>
                </Col>
                <Col span={8}>
                    <Typography.Title level={5}>
                        Rating:
                        {foodAverageRating ?
                            <Rate
                                disabled
                                defaultValue={foodAverageRating}
                            /> :
                            '   Not Available'}
                    </Typography.Title>
                </Col>
            </Row>
            <br />
            <Row>
                <Col span={12}>
                    <Typography.Title
                        level={5}
                        style={{ marginTop: '2%', marginRight: '2%', float: 'left' }}>
                        Quantity:
                    </Typography.Title>
                    <Button
                        shape="circle"
                        size="small"
                        icon={<MinusOutlined />}
                        style={{ margin: '2%' }}
                        disabled={active ? false : true}
                        onClick={() => {
                            if (quantity >= 1) {
                                setQuantity(pre => pre - 1);
                            }
                        }}
                    />
                    <Typography.Text>{quantity}</Typography.Text>
                    <Button
                        shape="circle"
                        size="small"
                        icon={<PlusOutlined />}
                        style={{ margin: '2%' }}
                        disabled={active ? false : true}
                        onClick={() => {
                            setQuantity(pre => pre + 1);
                        }}
                    />
                </Col>
                <Col span={12}>
                    <Button
                        type="primary"
                        style={{ width: '80%', float: 'right' }}
                        disabled={active ? false : true}
                        onClick={handleAddItemToCart}
                    >
                        Add to Cart
                    </Button>
                </Col>
            </Row>
        </div>
    )
}

export default FoodItem;
