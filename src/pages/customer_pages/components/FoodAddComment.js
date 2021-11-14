import React, { useState, useEffect } from 'react';
import { message, Row, Col, Typography, Button, Rate, Input } from 'antd';
import axios from 'axios';
import CUSTOMER_SERVICE_PATH from '../../../config/CUSTOMER_API_URL';

const FoodAddComment = (props) => {

    const [foodItemId, setFoodItemId] = useState(0);
    const [foodName, setFoodName] = useState('');
    const [imageUrl, setImageUrl] = useState(null);

    const [rating, setRating] = useState(null);
    const [comment, setComment] = useState('');

    useEffect(async () => {
        try {
            let food_item_detail = await getFoodItemDetail(props.match.params.food_item_id);

            setFoodItemId(food_item_detail.food_item_id);
            setFoodName(food_item_detail.food_name);
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

    const handleSubmit = async () => {
        try {
            if (!rating) {
                return message.error('You must provide your rating!');
            }

            let data = {
                food_item_id: foodItemId,
                email_address: localStorage.getItem('customerEmail'),
                comment: comment,
                rating: rating
            };

            let result = await axios({
                method: 'post',
                url: CUSTOMER_SERVICE_PATH.ADD_NEW_COMMENT,
                data: data
            });

            if (result.data.success) {
                message.success('Thank you for your feedback!');
                return props.history.push('/customer/');
            } else {
                return message.error('Sorry, fail to add comment, please try again!');
            }

        } catch (e) {
            return message.error('Sorry, fail to submit comment!');
        }
    }

    return (
        <div>
            <Row>
                <Col span={12}>
                    {
                        imageUrl && <img src={imageUrl} alt="food" style={{ width: '70%' }} />
                    }
                </Col>
                <Col span={12}>
                    <Typography.Title level={3}>{foodName}</Typography.Title>
                    <br />
                    <Typography.Title level={5}>Provide your rating here</Typography.Title>
                    <Rate
                        style={{ backgroundColor: 'white', padding: '1%' }}
                        value={rating}
                        onChange={(value) => setRating(value)}
                    />
                    <br /><br />
                    <Typography.Title level={5}>Provide your comment here (Optional)</Typography.Title>
                    <Input.TextArea
                        rows={5}
                        value={comment}
                        onChange={e => setComment(e.target.value)}
                    />
                    <br /><br />
                    <Button type="primary" block onClick={handleSubmit}>Submit</Button>
                </Col>
            </Row>
        </div>
    )
}

export default FoodAddComment;
