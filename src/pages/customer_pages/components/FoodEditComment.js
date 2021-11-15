import React, { useState, useEffect } from 'react';
import { message, Row, Col, Typography, Button, Rate, Input } from 'antd';
import axios from 'axios';
import CUSTOMER_SERVICE_PATH from '../../../config/CUSTOMER_API_URL';

const FoodEditComment = (props) => {

    const [foodCommentId, setFoodCommentId] = useState(0);
    const [foodName, setFoodName] = useState('');
    const [comment, setComment] = useState('');
    const [imageUrl, setImageUrl] = useState(null);
    const [rating, setRating] = useState(null);

    useEffect(async () => {
        try {
            let result = await getCommentDetail(props.match.params.food_comment_id);

            setFoodCommentId(result.food_comment_id);
            setFoodName(result.food_name);
            setComment(result.comment);
            setImageUrl(result.image_url);
            setRating(result.rating);

        } catch (e) {
            return message.error('Sorry, fail to get comment detail!');
        }
    }, []);

    const getCommentDetail = async (food_comment_id) => {
        let result = await axios({ method: 'get', url: CUSTOMER_SERVICE_PATH.GET_COMMENT_DETAIL + "?food_comment_id=" + food_comment_id });
        return result.data.data;
    }

    const handleEdit = async () => {
        try {

            let data = {
                comment: comment,
                rating: rating,
                food_comment_id: foodCommentId
            };

            let result = await axios({
                method: 'post',
                url: CUSTOMER_SERVICE_PATH.EDIT_COMMENT,
                data: data
            });

            if (result.data.success) {
                message.success('Edit feedback successful!');
                return props.history.push('/customer/');
            } else {
                return message.error('Sorry, fail to edit comment, please try again!');
            }

        } catch (e) {
            return message.error('Sorry, fail to edit comment!');
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
                    <Typography.Title level={5}>Edit your rating here</Typography.Title>
                    <Rate
                        style={{ backgroundColor: 'white', padding: '1%' }}
                        value={rating ? rating : 0}
                        onChange={(value) => setRating(value)}
                    />
                    <br /><br />

                    <Typography.Title level={5}>Edit your comment here</Typography.Title>
                    <Input.TextArea
                        rows={5}
                        value={comment}
                        onChange={e => setComment(e.target.value)}
                    />
                    <br /><br />
                    <Button type="primary" block onClick={handleEdit}>Edit</Button>
                </Col>
            </Row>
        </div>
    )
}

export default FoodEditComment;
