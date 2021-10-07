import React, { useState, useEffect } from 'react'
import { Col, Row, Input, Button, Typography, Form, Divider, message, Select } from 'antd';
import axios from 'axios';
import MANAGER_SERVICE_PATH from '../../../config/MANAGER_API_URL';

const EditFoodItem = (props) => {

    const [itemCategoryList, setItemCategoryList] = useState([]);

    const [foodCategoryId, setFoodCategoryId] = useState(null);
    const [foodName, setFoodName] = useState('');
    const [foodPrice, setFoodPrice] = useState(0);
    const [foodDescription, setFoodDescription] = useState('');
    const [imageUrl, setImageUrl] = useState('');

    useEffect(async () => {
        try {
            let result = await getOldDate(props.match.params.food_item_id);

            setFoodCategoryId(result.food_category_id);
            setFoodName(result.food_name);
            setFoodPrice(result.food_price);
            setFoodDescription(result.food_description);
            setImageUrl(result.image_url);

            let listResult = await getItemCategoryList(result.food_shop_id);
            setItemCategoryList(listResult);
        } catch (e) {
            return message.error(e.message);
        }
    }, []);

    const getItemCategoryList = async (food_shop_id) => {
        try {
            let results = await axios({ method: 'get', url: MANAGER_SERVICE_PATH.GET_FOOD_ITEM_CATEGORY_LIST + "?food_shop_id=" + food_shop_id });
            return results.data.data;
        } catch (e) {
            return [];
        }
    }

    const getOldDate = async (food_item_id) => {
        let result = await axios({ method: 'get', url: MANAGER_SERVICE_PATH.GET_FOOD_ITEM_DETAIL + "?food_item_id=" + food_item_id });
        return result.data.data;
    }

    const handleGoBack = () => {
        return props.history.push('/manager/food_item_detail/' + props.match.params.food_item_id);
    }

    const handleImageUpload = async (e) => {
        try {
            let file = e.target.files[0];
            let formdata = new FormData();
            formdata.append('image', file);

            let result = await axios({
                method: 'post',
                url: MANAGER_SERVICE_PATH.UPLOAD_FOOD_ITEM_IMAGE + "?id=" + props.match.params.food_item_id,
                data: formdata,
                headers: { 'Content-Type': 'multipart/form-data;charset=UTF-8' }
            });

            if (result.data.success) {
                message.success('Upload Image Successful');
                return setImageUrl(result.data.message);
            } else {
                return message.error('Upload Image fail, please try again!');
            }
        } catch (e) {
            return message.error('Something wrong happened, please try again!');
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            if (foodCategoryId &&
                foodName &&
                foodPrice &&
                foodDescription &&
                imageUrl
            ) {

                let data = {
                    food_item_id: props.match.params.food_item_id,
                    food_category_id: foodCategoryId,
                    food_name: foodName,
                    food_price: foodPrice,
                    food_description: foodDescription,
                    image_url: imageUrl
                };

                let result = await axios({ method: 'post', url: MANAGER_SERVICE_PATH.UPDATE_FOOD_ITEM, data: data });
                if (result.data.success) {
                    message.success('Update food item successful!');
                    return props.history.push('/manager/food_item_detail/' + props.match.params.food_item_id);
                } else {
                    return message.error('Update fail, pleaes try again!');
                }

            } else {
                return message.error('Please complete information!');
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
            <Typography.Title level={3}>Edit Food Item Profile</Typography.Title>
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
                            value={foodName}
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
                            value={foodPrice}
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
                            value={foodCategoryId}
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
                <br /><br />
                <Typography.Title level={5} style={{ marginLeft: '5px' }}>Food Description</Typography.Title>
                <Input.TextArea
                    id="foodDescription"
                    rows={5}
                    onChange={e => setFoodDescription(e.target.value)}
                    value={foodDescription}
                    required
                />
                <br /><br />
                <Row>
                    <Col span={8}>
                        <img src={imageUrl} alt="img" style={{ width: '60%' }} />
                        <Typography.Title level={5}>Food Image</Typography.Title>
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
                    Edit Food Item
                </Button>
            </Form>
        </div>
    )
}

export default EditFoodItem;
