import React, { useState, useEffect } from 'react';
import { Col, Row, Button, Typography, Divider, message, Rate } from 'antd';
import axios from 'axios';
import MANAGER_SERVICE_PATH from '../../../config/MANAGER_API_URL';

const FoodItemDetail = (props) => {

    const [createdAt, setCreatedAt] = useState('');
    const [updatedAt, setUpdatedAt] = useState('');
    const [foodAverageRating, setFoodAverageRating] = useState(0);
    const [foodCategoryName, setFoodCategoryName] = useState('');
    const [foodDescription, setFoodDescription] = useState('');
    const [foodName, setFoodName] = useState('');
    const [foodPrice, setFoodPrice] = useState(0);
    const [foodShopId, setFoodShopId] = useState(0);
    const [imageUrl, setImageUrl] = useState('');

    useEffect(async () => {
        try {
            let result = await getFoodItemDetail(props.match.params.food_item_id);

            setCreatedAt(result.created_at);
            setUpdatedAt(result.updated_at);
            setFoodAverageRating(result.food_average_rating);
            setFoodCategoryName(result.food_category_name);
            setFoodDescription(result.food_description);
            setFoodName(result.food_name);
            setFoodPrice(result.food_price);
            setFoodShopId(result.food_shop_id);
            setImageUrl(result.image_url);
        } catch (e) {
            return message.error(e.message);
        }
    }, []);

    const getFoodItemDetail = async (food_item_id) => {
        let result = await axios({ method: 'get', url: MANAGER_SERVICE_PATH.GET_FOOD_ITEM_DETAIL + "?food_item_id=" + food_item_id });
        return result.data.data;
    }

    const handleGoBack = () => {
        return props.history.push('/manager/food_shop_detail/' + foodShopId);
    }

    return (
        <div>
            <div>
                <Button type="primary" style={{ float: 'left' }} onClick={handleGoBack}>Go Back</Button>
            </div>
            <br /><br />
            <Typography.Title level={4}>{foodName}</Typography.Title>
            <Divider />
            <Row>
                <Col span={12}>
                    <img
                        alt="food_image"
                        src={imageUrl}
                        style={{ width: '80%' }}
                    />
                </Col>
                <Col span={12}>
                    <Typography.Text>
                        Description: {foodDescription}
                    </Typography.Text>
                </Col>
            </Row>
            <br /><br />
            <Row>
                <Col span={8}>
                    <Typography.Title level={5}>
                        Food Category: {foodCategoryName}
                    </Typography.Title>
                </Col>
                <Col span={8}>
                    <Typography.Title level={5}>
                        Created At: {createdAt}
                    </Typography.Title>
                </Col>
                <Col span={8}>
                    <Typography.Title level={5}>
                        Last Updated At: {updatedAt ? updatedAt : 'Not Available'}
                    </Typography.Title>
                </Col>
            </Row>
            <Divider />
            <Row>
                <Col span={12}>
                    <Typography.Title level={5}>
                        Price: ${foodPrice}
                    </Typography.Title>
                </Col>
                <Col span={12}>
                    <div
                        style={{ float: 'right' }}
                    >
                        <Typography.Title level={5}>
                            Rating: {foodAverageRating ? foodAverageRating : 'Not Available'}
                            <Rate
                                disabled
                                defaultValue={foodAverageRating ? foodAverageRating : 0}
                            />
                        </Typography.Title>
                    </div>
                </Col>
            </Row>
            <br /><br />
            <Row>
                <Col span={12}>
                    <Button type="primary">See Comments</Button>
                </Col>
                <Col span={12}>
                    <div style={{ float: 'right' }}>
                        <Button type="primary">Edit Food Profile</Button>
                    </div>
                </Col>
            </Row>
        </div>
    )
}

export default FoodItemDetail;
