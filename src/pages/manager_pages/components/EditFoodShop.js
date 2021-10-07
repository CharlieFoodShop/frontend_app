import React, { useState, useEffect } from 'react';
import { Col, Row, Input, Button, Typography, Form, Divider, message, Select, TimePicker, AutoComplete } from 'antd';
import axios from 'axios';
import moment from 'moment';
import MANAGER_SERVICE_PATH from '../../../config/MANAGER_API_URL';
import KEY from '../../../config/KEY';

const EditFoodShop = (props) => {

    // Info List
    const [shopCategory, setShopCategory] = useState([]);
    const [possibleAddressList, setPossibleAddressList] = useState([]);

    // Variable need to submit
    const [shopCategoryId, setShopCategoryId] = useState(1);
    const [openTime, setOpenTime] = useState(null);
    const [closeTime, setCloseTime] = useState(null);
    const [workingAddress, setWorkingAddress] = useState(null);
    const [lat, setLat] = useState(null);
    const [lon, setLon] = useState(null);
    const [foodShopName, setFoodShopName] = useState('');
    const [description, setDescription] = useState('');
    const [imageUrl, setImageUrl] = useState('');

    useEffect(async () => {
        try {
            let result = await getOldData(props.match.params.food_shop_id);
            let category_list = await getShopCategory();
            setShopCategory(category_list.data.data);

            setShopCategoryId(result.food_shop_category_id);
            setImageUrl(result.image_url);
            setOpenTime(result.open_time);
            setCloseTime(result.close_time);
            setWorkingAddress(result.working_address);
            setLat(result.lat);
            setLon(result.lon);
            setFoodShopName(result.food_shop_name);
            setDescription(result.food_shop_description);


        } catch (e) {
            return message.error(e.message);
        }
    }, []);

    const getOldData = async (food_shop_id) => {
        let result = await axios({ method: 'get', url: MANAGER_SERVICE_PATH.GET_FOOD_SHOP_DETAIL + "?food_shop_id=" + food_shop_id })
        return result.data.data;
    }

    const getPossibleAddressList = async (text) => {

        try {
            if (text[text.length - 1] === ' ' || text === '') {
                return;
            } else {
                let _text = text.replace(' ', '%20');
                let results = await axios({ method: 'get', url: 'http://dev.virtualearth.net/REST/v1/Locations/' + _text + "?key=" + KEY.BingMap_key });
                let _results = results.data.resourceSets[0].resources;

                let data = [];
                for (let i = 0; i < _results.length; i++) {
                    data.push({ value: _results[i].name, key: i })
                }
                setPossibleAddressList(data);
            }
        } catch (e) {
            return;
        }
    }

    const getShopCategory = async () => {
        let results = await axios({ method: 'get', url: MANAGER_SERVICE_PATH.GET_FOOD_SHOP_CATEGORY_LIST });
        return results;
    }

    const updateCoord = async (address) => {
        try {
            if (address[address.length - 1] === ' ' || address === '') {
                return;
            } else {
                let _address = address.replace(' ', '%20');
                let results = await axios({ method: 'get', url: 'http://dev.virtualearth.net/REST/v1/Locations/' + _address + "?key=" + KEY.BingMap_key });
                let _results = results.data.resourceSets[0].resources;

                if (_results.length === 1) {
                    setWorkingAddress(address);
                    setLat(_results[0].point.coordinates[0]);
                    setLon(_results[0].point.coordinates[1]);

                } else {
                    return;
                }
            }
        } catch (e) {
            return;
        }
    }

    const handleGoBack = () => {
        return props.history.push('/manager/food_shop_detail/' + props.match.params.food_shop_id);
    }

    const handleImageUpload = async (e) => {
        try {
            let file = e.target.files[0];
            let formdata = new FormData();
            formdata.append('image', file);

            let result = await axios({
                method: 'post',
                url: MANAGER_SERVICE_PATH.UPLOAD_FOOD_SHOP_IMAGE + "?id=" + props.match.params.food_shop_id,
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
            return message.error(e.message);
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            if (
                shopCategoryId &&
                foodShopName &&
                description &&
                workingAddress &&
                lat &&
                lon &&
                openTime &&
                closeTime &&
                imageUrl
            ) {

                let data = {
                    food_shop_id: props.match.params.food_shop_id,
                    food_shop_category_id: shopCategoryId,
                    food_shop_name: foodShopName,
                    food_shop_description: description,
                    working_address: workingAddress,
                    lat: lat,
                    lon: lon,
                    open_time: openTime,
                    close_time: closeTime,
                    image_url: imageUrl
                };

                let result = await axios({ method: 'post', url: MANAGER_SERVICE_PATH.UPDATE_FOOD_SHOP, data: data });
                if (result.data.success) {
                    message.success('Update food shop successful!');
                    return props.history.push('/manager/food_shop_detail/' + props.match.params.food_shop_id);
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
            <Typography.Title level={5}>Edit Food Shop</Typography.Title>
            <Divider />
            <Form>
                <Row>
                    <Col span={8}>
                        <Typography.Title level={5} style={{ marginLeft: '5px' }}>
                            Food Shop Name
                        </Typography.Title>
                        <Input
                            size="large"
                            style={{ width: '80%' }}
                            id="foodShopName"
                            value={foodShopName}
                            onChange={e => setFoodShopName(e.target.value)}
                            required
                        />
                    </Col>
                    <Col span={7}></Col>
                    <Col span={8}>
                        <Typography.Title level={5} style={{ marginLeft: '5px' }}>
                            Food Shop Category
                        </Typography.Title>
                        <Select
                            size="large"
                            style={{ width: '80%' }}
                            id="shopCategoryId"
                            onChange={value => setShopCategoryId(value)}
                            value={shopCategoryId}
                            required
                        >
                            {
                                shopCategory.map((item, index) => (
                                    <Select.Option value={item.food_shop_category_id} key={index}>
                                        {item.food_shop_category_name}
                                    </Select.Option>
                                ))
                            }
                        </Select>
                    </Col>
                </Row>
                <br /><br />
                <Typography.Title level={5} style={{ marginLeft: '5px' }}>
                    Please Select Your Working Address
                </Typography.Title>
                <Row>
                    <Col span={12}>
                        {
                            lat && lon &&
                            <img
                                style={{ width: '90%' }}
                                src={`https://dev.virtualearth.net/REST/v1/Imagery/Map/Road/${lat},${lon}/15?mapSize=500,300&format=png&pushpin=${lat},${lon};64;&key=${KEY.BingMap_key}`}
                                alt="map"
                            />
                        }
                    </Col>
                    <Col span={12}>
                        <AutoComplete
                            size="large"
                            style={{ width: '80%' }}
                            id="workingAddressText"
                            options={possibleAddressList}
                            onSearch={getPossibleAddressList}
                            onSelect={updateCoord}
                            required
                        />
                        <br /><br />
                        <Typography.Title level={5} style={{ marginLeft: '20px' }}>Working Address: {workingAddress ? workingAddress : ''}</Typography.Title>
                        <Typography.Title level={5} style={{ marginLeft: '20px' }}>Latitude: {lat ? lat : ''}</Typography.Title>
                        <Typography.Title level={5} style={{ marginLeft: '20px' }}>Longitude: {lon ? lon : ''}</Typography.Title>
                    </Col>
                </Row>
                <br /><br />
                <Row>
                    <Typography.Title level={5} style={{ marginLeft: '5px' }}>
                        Food Shop Description
                    </Typography.Title>
                    <Input.TextArea
                        id="description"
                        rows={5}
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                        required
                    />
                </Row>
                <br /><br />
                <Row>
                    <Col span={8}>
                        <img alt="img" src={imageUrl} style={{ width: '60%' }} />
                        <Typography.Title level={5} style={{ marginLeft: '5px' }}>
                            Food Shop Image
                        </Typography.Title>
                        <Input
                            required
                            size="large"
                            style={{ width: '80%' }}
                            type="file"
                            accept="image/jpeg,image/jpg,image/png"
                            id="imageFile"
                            onChange={handleImageUpload}
                        />
                    </ Col>
                    <Col span={8}>
                        <Typography.Title level={5} style={{ marginLeft: '5px' }}>
                            Open Time
                        </Typography.Title>
                        <TimePicker
                            required
                            size="large"
                            style={{ width: '80%' }}
                            id="openTime"
                            value={moment(openTime, 'HH:mm:ss')}
                            onChange={(time, timeString) => setOpenTime(timeString)}
                        />
                    </ Col>
                    <Col span={8}>
                        <Typography.Title level={5} style={{ marginLeft: '5px' }}>
                            Close Time
                        </Typography.Title>
                        <TimePicker
                            required
                            size="large"
                            style={{ width: '80%' }}
                            id="closeTime"
                            value={moment(closeTime, 'HH:mm:ss')}
                            onChange={(time, timeString) => setCloseTime(timeString)}
                        />
                    </ Col>
                </Row>
                <br /><br />
                <Button
                    type="primary"
                    size="large"
                    block
                    htmlType="submit"
                    onClick={handleSubmit}>
                    Submit
                </Button>
            </Form>
        </div>
    )
}

export default EditFoodShop;
