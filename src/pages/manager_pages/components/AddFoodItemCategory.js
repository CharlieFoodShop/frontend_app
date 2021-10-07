import React, { useState } from 'react';
import { Col, Row, Button, Typography, Divider, message, AutoComplete } from 'antd';
import axios from 'axios';
import MANAGER_SERVICE_PATH from '../../../config/MANAGER_API_URL';

const AddFoodItemCategory = (props) => {

    const [categoryList, setCategoryList] = useState([]);
    const [text, setText] = useState('');

    const getCategoryList = async (text) => {
        try {
            if (text) {
                let results = await axios({ method: 'get', url: MANAGER_SERVICE_PATH.GET_ALL_MATCH_FOOD_CATEGORY + "?content=" + text });
                let _results = results.data.data;

                let data = [];
                for (let i = 0; i < _results.length; i++) {
                    data.push({ value: _results[i].food_category_example_name, key: i });
                }
                setCategoryList(data);
            }
        } catch (e) {
            return;
        }
    }

    const handleGoBack = () => {
        return props.history.push('/manager/food_shop_detail/' + props.match.params.food_shop_id);
    }

    const handleAdd = async () => {
        console.log(text);
        try {
            if (text) {
                let result = await axios({
                    method: 'post',
                    url: MANAGER_SERVICE_PATH.ADD_FOOD_CATEGORY,
                    data: {
                        food_shop_id: props.match.params.food_shop_id,
                        food_category_name: text
                    }
                });

                if (result.data.success) {
                    message.success('Add food category successful!');
                    return props.history.push("/manager/food_shop_detail/" + props.match.params.food_shop_id);
                } else {
                    return message.error('Fail to add item category, please try again');
                }
            } else {
                return message.error('Please complete the information');
            }
        } catch (e) {
            return message.error('Fail to add item category, please try again');
        }
    }

    return (
        <div>
            <div>
                <Button type="primary" style={{ float: 'left' }} onClick={handleGoBack}>Go Back</Button>
            </div>
            <br /><br />
            <Typography.Title level={4}>Add New Food Category</Typography.Title>
            <Divider />
            <Row>
                <Col span={12}>
                    <AutoComplete
                        style={{ width: '80%' }}
                        id="categoryText"
                        options={categoryList}
                        onSearch={getCategoryList}
                        onChange={(text) => setText(text)}
                        onSelect={(text) => setText(text)}
                    />
                </Col>
                <Col span={12}>
                    <Button
                        style={{ width: '50%' }}
                        type="primary"
                        onClick={handleAdd}
                    >
                        Add
                    </Button>
                </Col>
            </Row>
        </div>
    )
}

export default AddFoodItemCategory;
