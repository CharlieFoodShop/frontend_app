import React, { useState, useEffect } from 'react';
import { message, Row, Col, Typography, Button, Rate, Input, Divider } from 'antd';
import axios from 'axios';
import CUSTOMER_SERVICE_PATH from '../../../config/CUSTOMER_API_URL';

const FoodSeeComments = (props) => {

    const [foodName, setFoodName] = useState('');
    const [imageUrl, setImageUrl] = useState(null);
    const [commentList, setCommentList] = useState([]);

    useEffect(async () => {
        try {
            let result = await getCommentList(localStorage.getItem('customerEmail'), props.match.params.food_item_id);

            setFoodName(result.food_name);
            setImageUrl(result.image_url);
            setCommentList(result.comment_list);
        } catch (e) {
            return message.error('Sorry, fail to get comment list!');
        }
    }, []);

    const getCommentList = async (email_address, food_item_id) => {
        let result = await axios({
            method: 'get',
            url: CUSTOMER_SERVICE_PATH.GET_COMMENT_LIST + "?email_address=" + email_address + "&&food_item_id=" + food_item_id
        });

        return result.data.data;
    }

    const handleEditComment = (food_comment_id) => {

    }

    const handleDeleteComment = (food_comment_id) => {

    }

    return (
        <div>
            {
                imageUrl &&
                <div style={{ width: '100%', height: '150px', overflow: 'hidden' }}>
                    <img alt="food" src={imageUrl} style={{ width: '100%', marginTop: '-50%' }} />
                </div>
            }
            <br />
            <Typography.Title level={3}>Your Comments for {foodName}</Typography.Title>
            <Divider />
        </div>
    )
}

export default FoodSeeComments;
