import React, { useState, useEffect } from 'react';
import { Col, Row, Button, Typography, Divider, message, Switch, Radio, Table, Rate } from 'antd';
import axios from 'axios';
import MANAGER_SERVICE_PATH from '../../../config/MANAGER_API_URL';

const FoodShopDetail = (props) => {

    const [foodCategoryList, setFoodCategoryList] = useState([]);
    const [itemDataList, setItemDataList] = useState([]);

    const [active, setActive] = useState(false);
    const [closeTime, setCloseTime] = useState('');
    const [openTime, setOpenTime] = useState('');
    const [createdAt, setCreatedAt] = useState('');
    const [updatedAt, setUpdatedAt] = useState('');
    const [foodShopCategory, setFoodShopCategory] = useState('');
    const [foodShopDescription, setFoodShopDescription] = useState('');
    const [foodShopName, setFoodShopName] = useState('');
    const [foodShopRating, setFoodShopRating] = useState(null);
    const [imageUrl, setImageUrl] = useState('');
    const [workingAddress, setWorkingAddress] = useState('');

    useEffect(async () => {
        try {
            let result = await getFoodShopDetail(props.match.params.food_shop_id);
            let listResult = await getFoodCategoryList(props.match.params.food_shop_id)

            setImageUrl(result.image_url);
            setActive(result.active);
            setCloseTime(result.close_time);
            setOpenTime(result.open_time);
            setCreatedAt(result.created_at);
            setUpdatedAt(result.updated_at);
            setFoodShopCategory(result.food_shop_category_name);
            setFoodShopDescription(result.food_shop_description);
            setFoodShopName(result.food_shop_name);
            setFoodShopRating(result.food_shop_rating);
            setWorkingAddress(result.working_address);
            setFoodCategoryList(listResult);

        } catch (e) {
            return message.error(e.message);
        }
    }, []);

    const getFoodShopDetail = async (food_shop_id) => {
        let result = await axios({ method: 'get', url: MANAGER_SERVICE_PATH.GET_FOOD_SHOP_DETAIL + "?food_shop_id=" + food_shop_id })
        return result.data.data;
    }

    const getFoodCategoryList = async (food_shop_id) => {
        let result = await axios({ method: 'get', url: MANAGER_SERVICE_PATH.GET_FOOD_ITEM_CATEGORY_LIST + "?food_shop_id=" + food_shop_id });
        return result.data.data;
    }

    const handleFoodItemTableChange = async (food_category_id) => {
        let result = await axios({ method: 'get', url: MANAGER_SERVICE_PATH.GET_FOOD_ITEM_LIST + "?food_category_id=" + food_category_id });
        let _result = result.data.data;

        let data = [];
        for (let i = 0; i < _result.length; i++) {
            data.push({
                key: i,
                food_name: _result[i].food_name,
                food_description: _result[i].food_description,
                food_item_id: _result[i].food_item_id,
                image_url: _result[i].image_url
            });
        }
        return setItemDataList(data);
    }

    const handleOnActiveChange = async (checked) => {
        try {
            await axios({
                method: 'post',
                url: MANAGER_SERVICE_PATH.UPDATE_FOOD_SHOP_ACTIVE,
                data: {
                    food_shop_id: props.match.params.food_shop_id,
                    active: checked
                }
            });
        } catch (e) {
            return message.error('Sorry, fail to update active status');
        }
    }

    const handleGoBack = () => {
        return props.history.push('/manager/');
    }

    const handleAddItemCategory = () => {
        return props.history.push('/manager/add_food_item_category/' + props.match.params.food_shop_id);
    }

    const handleAddFoodItem = () => {
        return props.history.push('/manager/add_food_item/' + props.match.params.food_shop_id);
    }

    const handleFoodItemDetail = (food_item_id) => {
        return props.history.push('/manager/food_item_detail/' + food_item_id);
    }

    const handleEditFoodShop = () => {
        return props.history.push('/manager/edit_food_shop/' + props.match.params.food_shop_id);
    }

    return (
        <div>
            <div>
                <Button type="primary" style={{ float: 'left' }} onClick={handleGoBack}>Go Back</Button>
            </div>
            <br /><br />
            <div style={{ width: '100%', height: '150px', overflow: 'hidden' }}>
                <img alt="shop-image" src={imageUrl} style={{ width: '100%', marginTop: '-50%' }} />
            </div>
            <br />
            <Row>
                <Col span={12}>
                    <Typography.Title level={3} >{foodShopName}</Typography.Title>
                </Col>
                <Col span={12}>
                    <Typography.Title level={4} >{workingAddress}</Typography.Title>
                </Col>
            </Row>

            <Divider />
            <Typography.Text>
                Description: {foodShopDescription}
            </Typography.Text>
            <br /><br />
            <Row>
                <Col span={8}>
                    <Typography.Title level={5} >Open At: {openTime}</Typography.Title>
                </Col>
                <Col span={8}>
                    <Typography.Title level={5} >Close At: {closeTime}</Typography.Title>
                </Col>
                <Col span={8}>
                    <Typography.Title level={5}>
                        On Active:
                        <Switch key={foodShopName} style={{ marginLeft: '5%' }} defaultChecked={active} onChange={handleOnActiveChange} />
                    </Typography.Title>
                </Col>
            </Row>
            <br /><br />
            <Row>
                <Col span={8}>
                    <Typography.Title level={5} >Created At: {createdAt}</Typography.Title>
                </Col>
                <Col span={8}>
                    <Typography.Title level={5} >Updated At: {updatedAt ? updatedAt : 'No Updation Record'}</Typography.Title>
                </Col>
                <Col span={8}>
                    <Typography.Title level={5} >Rating: {foodShopRating ? foodShopRating : 'Not Available'}</Typography.Title>
                    <Rate
                        disabled
                        defaultValue={foodShopRating ? foodShopRating : 0}
                    />
                </Col>
            </Row>
            <br /><br />
            <Row>
                <Col span={12}>
                    <Typography.Title level={5} >Shop Category: {foodShopCategory}</Typography.Title>
                </Col>
                <Col span={12}>
                    <div style={{ float: 'right' }}>
                        <Button type="primary" onClick={handleEditFoodShop}>Edit Food Shop Profile</Button>
                    </div>
                </Col>
            </Row>
            <Divider />
            <Row>
                <Col span={12}>
                    <Button type="primary" onClick={handleAddItemCategory}>Add Item Category</Button>
                </Col>
                <Col span={12}>
                    <div style={{ float: 'right' }}>
                        <Button type="primary" onClick={handleAddFoodItem}>Add New Food Item</Button>
                    </div>
                </Col>
            </Row>
            <br /><br />
            <div>
                <Typography.Text>Food Item Category: </Typography.Text>
                <Radio.Group
                    onChange={e => handleFoodItemTableChange(e.target.value)}
                >
                    {
                        foodCategoryList.map((item, index) => (
                            <Radio.Button
                                value={item.food_category_id}
                                key={index}
                            >
                                {item.food_category_name}
                            </Radio.Button>
                        ))
                    }
                </Radio.Group>
                <br />
                <Table
                    bordered
                    columns={[
                        {
                            title: 'Food Name',
                            dataIndex: 'food_name'
                        },
                        {
                            title: 'Food Description',
                            dataIndex: 'food_description'
                        },
                        {
                            title: 'Food Image',
                            dataIndex: 'image_url',
                            render: image_url => <img alt="food_img" src={image_url} style={{ width: '100px' }} />
                        },
                        {
                            title: 'Action',
                            dataIndex: 'food_item_id',
                            render: food_item_id => <Button type="primary" onClick={() => handleFoodItemDetail(food_item_id)}>Detail</Button>
                        }
                    ]}
                    dataSource={itemDataList}
                />
            </div>
        </div>
    )
}

export default FoodShopDetail;
