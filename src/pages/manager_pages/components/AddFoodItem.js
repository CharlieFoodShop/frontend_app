import React, { useState, useEffect } from 'react'
import { Col, Row, Input, Button, Typography, Form, Divider, message, Select } from 'antd';
import axios from 'axios';
import MANAGER_SERVICE_PATH from '../../../config/MANAGER_API_URL';

const AddFoodItem = (props) => {

    const [itemCategoryList, setItemCategoryList] = useState([]);

    const [foodCategoryId, setFoodCategoryId] = useState(null);
    const [foodName, setFoodName] = useState('');
    const [foodPrice, setFoodPrice] = useState(0);
    const [foodDescription, setFoodDescription] = useState('');
    const [imageFile, setImageFile] = useState(null);

    useEffect(async () => {
        let resultList = await getItemCategoryList(props.match.params.food_shop_id);
        setItemCategoryList(resultList);
    }, []);

    const getItemCategoryList = async (food_shop_id) => {
        try {
            let results = await axios({ method: 'get', url: MANAGER_SERVICE_PATH.GET_FOOD_ITEM_CATEGORY_LIST + "?food_shop_id=" + food_shop_id });
            return results.data.data;
        } catch (e) {
            return [];
        }
    }

    const handleImageUpload = (e) => {
        let file = e.target.files[0];
        let formdata = new FormData();
        formdata.append('image', file);
        setImageFile(formdata);
    }

    const handleGoBack = () => {
        return props.history.push('/manager/food_shop_detail/' + props.match.params.food_shop_id);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            if (
                foodCategoryId &&
                foodName &&
                foodPrice &&
                foodDescription &&
                imageFile
            ) {
                let data = {
                    food_category_id: foodCategoryId,
                    food_name: foodName,
                    food_price: foodPrice,
                    food_description: foodDescription
                };

                let axios_1 = await axios({ method: 'post', url: MANAGER_SERVICE_PATH.ADD_FOOD_ITEM_URL, data: data });
                let axios_2 = await axios({
                    method: 'post',
                    url: MANAGER_SERVICE_PATH.UPLOAD_FOOD_ITEM_IMAGE + "?id=" + axios_1.data.food_item_id,
                    data: imageFile,
                    headers: { 'Content-Type': 'multipart/form-data;charset=UTF-8' }
                });

                if (axios_2.data.success) {
                    message.success('Add Food Item Successful!');
                    return props.history.push('/manager/food_shop_detail/' + props.match.params.food_shop_id);
                } else {
                    return message.error('Something wrong happened, please try again!');
                }
            } else {
                return message.error('Please complete all the information!');
            }
        } catch (e) {
            return message.error('Something wrong happened, please try again!');
        }
    }

    return (
        <div>
            <div>
                <Button type="primary" style={{ float: 'left' }} onClick={handleGoBack}>Go Back</Button>
            </div>
            <br /><br />
            <Typography.Title level={3}>Add New Food Item</Typography.Title>
            <Divider />
            <Form>
                <Row>
                    <Col span={8}>
                        <Typography.Title level={5} style={{ marginLeft: '5px' }}>Food Name</Typography.Title>
                        <Input
                            size="large"
                            type="text"
                            id="foodName"
                            style={{ width: '80%' }}
                            onChange={e => setFoodName(e.target.value)}
                            required
                        />
                    </Col>
                    <Col span={8}>
                        <Typography.Title level={5} style={{ marginLeft: '5px' }}>Food Price</Typography.Title>
                        <Input
                            size="large"
                            prefix="$"
                            type="number"
                            id="foodPrice"
                            style={{ width: '80%', textAlign: 'right' }}
                            onChange={e => setFoodPrice(e.target.value)}
                            required
                        />
                    </Col>
                    <Col span={8}>
                        <Typography.Title level={5} style={{ marginLeft: '5px' }}>Category</Typography.Title>
                        <Select
                            size="large"
                            style={{ width: '80%' }}
                            id="itemCategoryId"
                            onChange={value => setFoodCategoryId(value)}
                            required
                        >
                            {
                                itemCategoryList.map((item, index) => (
                                    <Select.Option value={item.food_category_id} key={index}>
                                        {item.food_category_name}
                                    </Select.Option>
                                ))
                            }
                        </Select>
                    </Col>
                </Row>
            </Form>
            <br /><br />
            <Typography.Title level={5} style={{ marginLeft: '5px' }}>Food Description</Typography.Title>
            <Input.TextArea
                id="foodDescription"
                rows={5}
                onChange={e => setFoodDescription(e.target.value)}
                required
            />
            <br /><br />
            <Row>
                <Col span={8}>
                    <Input
                        required
                        size="large"
                        style={{ width: '80%' }}
                        type="file"
                        accept="image/jpeg,image/jpg,image/png"
                        id="imageFile"
                        onChange={handleImageUpload}
                    />
                </Col>
            </Row>
            <br /><br />
            <Button
                type="primary"
                size="large"
                block
                htmlType="submit"
                onClick={handleSubmit}
            >
                Add New Food Item
            </Button>
        </div>
    )
}

export default AddFoodItem;
