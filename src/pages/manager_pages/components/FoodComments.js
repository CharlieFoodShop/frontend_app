import React, { useState, useEffect } from 'react';
import { Row, Col, Button, Typography, message, Card, Avatar, Rate } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import axios from 'axios';
import MANAGER_API_URL from '../../../config/MANAGER_API_URL';

const FoodComments = (props) => {

    const [commentList, setCommentList] = useState([]);

    useEffect(async () => {
        try {
            let results = await getComments(props.match.params.food_item_id);
            setCommentList(results);
        } catch (e) {
            return message.error('Sorry, fail to get comment list!');
        }
    }, []);

    const getComments = async (food_item_id) => {
        let results = await axios({
            method: 'get',
            url: MANAGER_API_URL.GET_COMMENT_LIST + "?food_item_id=" + food_item_id
        });

        return results.data.data;
    }

    const handleGoBack = () => {
        return props.history.push('/manager/food_item_detail/' + props.match.params.food_item_id);
    }

    return (
        <div>
            <div>
                <Button type="primary" style={{ float: 'left' }} onClick={handleGoBack}>Go Back</Button>
            </div>
            <br /><br />
            {
                commentList.map((item, index) => (
                    <div key={index}>
                        <Card style={{ width: '80%' }}>
                            <Row>
                                <Col span={6}>
                                    {
                                        item.avatar_url ?
                                            <Avatar style={{ marginLeft: '5%' }} size={64} src={item.avatar_url} /> :
                                            <Avatar style={{ marginLeft: '5%' }} size={64} icon={<UserOutlined />} />
                                    }
                                    <br /><br />
                                    <Typography.Title level={5}>{item.first_name + " " + item.last_name}</Typography.Title>
                                </Col>
                                <Col span={18}>
                                    <Typography.Text>{item.created_at}</Typography.Text>
                                    <br />
                                    <Rate disabled value={item.rating} />
                                    <br /><br />
                                    <Typography.Text>Comment: {item.comment ? item.comment : 'No Comment'}</Typography.Text>
                                </Col>
                            </Row>
                            <br />

                        </Card>
                        <br /><br />
                    </div>
                ))
            }
        </div>
    )
}

export default FoodComments;
