import React, { useState, useEffect } from 'react';
import { message, Typography, Button, Rate, Divider, Table } from 'antd';
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

            let comment_list = result.comment_list;
            for (let i = 0; i < comment_list.length; i++) {
                comment_list[i].key = i;
            }

            setCommentList(comment_list);
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
        return props.history.push("/customer/food_edit_comment/" + food_comment_id);
    }

    const handleDeleteComment = async (food_comment_id) => {
        console.log("delete " + food_comment_id);
        try {
            let data = {
                food_comment_id: food_comment_id
            };

            let result = await axios({
                method: 'post',
                url: CUSTOMER_SERVICE_PATH.DELETE_COMMENT,
                data: data
            });

            if (result.data.success) {
                message.success('Delete comment successful!');

                let result = await getCommentList(localStorage.getItem('customerEmail'), props.match.params.food_item_id);
                let comment_list = result.comment_list;
                for (let i = 0; i < comment_list.length; i++) {
                    comment_list[i].key = i;
                }
                setCommentList(comment_list);

            } else {
                return message.error('Fail to delete comment, please try again!');
            }

        } catch (e) {
            return message.error('Fail to delete comment, please try again!');
        }
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
            <Table
                bordered
                dataSource={commentList}
                columns={[
                    {
                        title: 'Comment ID',
                        dataIndex: 'food_comment_id'
                    },
                    {
                        title: 'Created At',
                        dataIndex: 'created_at'
                    },
                    {
                        title: 'Rating',
                        dataIndex: 'rating',
                        render: rating => <Rate disabled value={rating} />
                    },
                    {
                        title: 'Comment',
                        dataIndex: 'comment',
                    },
                    {
                        title: 'Action',
                        dataIndex: 'food_comment_id',
                        render: food_comment_id =>
                            <div>
                                <Button type="primary" style={{ marginRight: '5%' }} onClick={() => handleEditComment(food_comment_id)}>Edit</Button>
                                <Button type="primary" onClick={() => handleDeleteComment(food_comment_id)}>Delete</Button>
                            </div>
                    }
                ]}
            />
        </div>
    )
}

export default FoodSeeComments;

/*







*/
