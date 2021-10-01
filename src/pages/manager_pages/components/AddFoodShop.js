import React, { useState, useEffect, useRef } from 'react';
import { Col, Row, Input, Button, Typography, Form, Divider, message, Select, TimePicker, AutoComplete } from 'antd';
import axios from 'axios';
import MANAGER_SERVICE_PATH from '../../../config/MANAGER_API_URL';
import KEY from '../../../config/KEY';

const AddFoodShop = (props) => {
    // Info List
    const [shopCategory, setShopCategory] = useState([]);
    const [possibleAddressList, setPossibleAddressList] = useState([]);

    // Variable need to submit
    const [shopCategoryId, setShopCategoryId] = useState(1);
    const [imageFile, setImageFile] = useState(null);
    const [openTime, setOpenTime] = useState(null);
    const [closeTime, setCloseTime] = useState(null);
    const [workingAddress, setWorkingAddress] = useState(null);
    const [lat, setLat] = useState(null);
    const [lon, setLon] = useState(null);
    const foodShopName = useRef();
    const description = useRef();

    useEffect(async () => {
        try {
            let category_list = await getShopCategory();
            setShopCategory(category_list.data.data);

            getLocation();
        } catch (e) {
            return message.error(e.message);
        }
    }, []);

    const getLocation = () => {
        if (navigator.geolocation) {
            try {
                navigator.geolocation.getCurrentPosition(position => {
                    setLat(position.coords.latitude);
                    setLon(position.coords.longitude);
                    updateAddressByCoord(position.coords.latitude, position.coords.longitude);
                }, e => {
                    return message.error(e.message);
                });
            } catch (e) {
                return message.error('Sorry, something wrong happened when getting location.');
            }
        } else {
            return message.error('Sorry, your location can not be get.');
        }
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

    const updateAddressByCoord = async (lat, lon) => {
        try {
            let results = await axios({ method: 'get', url: `http://dev.virtualearth.net/REST/v1/Locations/${lat},${lon}?key=${KEY.BingMap_key}` });
            let _results = results.data.resourceSets[0].resources;
            if (_results.length === 1) {
                setWorkingAddress(_results[0].name);
            } else {
                return;
            }
        } catch (e) {
            return;
        }
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

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            if (foodShopName.current.state.value &&
                description.current.resizableTextArea.props.value &&
                shopCategoryId &&
                imageFile &&
                workingAddress &&
                lat &&
                lon &&
                openTime &&
                closeTime) {

                let data = {
                    manager_id: props.match.params.manager_id,
                    food_shop_category_id: shopCategoryId,
                    food_shop_name: foodShopName.current.state.value,
                    food_shop_description: description.current.resizableTextArea.props.value,
                    working_address: workingAddress,
                    lat: lat,
                    lon: lon,
                    open_time: openTime,
                    close_time: closeTime
                };

                let axios_1 = await axios({ method: 'post', url: MANAGER_SERVICE_PATH.ADD_FOOD_SHOP_URL, data: data });
                let axios_2 = await axios({
                    method: 'post',
                    url: MANAGER_SERVICE_PATH.UPLOAD_FOOD_SHOP_IMAGE + "?id=" + axios_1.data.food_shop_id,
                    data: imageFile,
                    headers: { 'Content-Type': 'multipart/form-data;charset=UTF-8' }
                });

                if (axios_2.data.success) {
                    message.success('Add Food Shop Successful!');
                    return props.history.push('/manager/');
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

    const handleImageUpload = (e) => {
        let file = e.target.files[0];
        let formdata = new FormData();
        formdata.append('image', file);
        setImageFile(formdata);
    }

    return (
        <div>
            <Typography.Title level={5}>Please Add New Food Shop Here</Typography.Title>
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
                            ref={foodShopName}
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
                            defaultValue={1}
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
                        ref={description}
                        required
                    />
                </Row>
                <br /><br />
                <Row>
                    <Col span={8}>
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

export default AddFoodShop;