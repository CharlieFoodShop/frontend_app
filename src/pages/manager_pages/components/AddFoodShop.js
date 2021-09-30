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
    const foodShopName = useRef();
    const description = useRef();

    useEffect(async () => {
        try {
            let category_list = await getShopCategory();
            setShopCategory(category_list.data.data);
        } catch (e) {
            return message.error(e.message);
        }
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            if (foodShopName.current.state.value &&
                description.current.resizableTextArea.props.value &&
                shopCategoryId &&
                imageFile &&
                workingAddress &&
                openTime &&
                closeTime) {

                let coord = await getCoord(workingAddress);
                if (!coord.success) {
                    return message.error('Address is ambiguous not exist, please check it.');
                } else {

                    let data = {
                        manager_id: props.match.params.manager_id,
                        food_shop_category_id: shopCategoryId,
                        food_shop_name: foodShopName.current.state.value,
                        food_shop_description: description.current.resizableTextArea.props.value,
                        working_address: workingAddress,
                        lat: coord.lat,
                        lon: coord.lon,
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

                }
            } else {
                return message.error('Please complete all the information!');
            }
        } catch (e) {
            return message.error('Something wrong happened, please try again!');
        }
    }

    const getShopCategory = async () => {
        let results = await axios({ method: 'get', url: MANAGER_SERVICE_PATH.GET_FOOD_SHOP_CATEGORY_LIST });
        return results;
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
                    data.push({ value: _results[i].name })
                }
                setPossibleAddressList(data);
            }

        } catch (e) {
            return;
        }
    }

    const getCoord = async (address) => {
        try {
            if (address[address.length - 1] === ' ' || address === '') {
                return { success: false };
            } else {
                let _address = address.replace(' ', '%20');
                let results = await axios({ method: 'get', url: 'http://dev.virtualearth.net/REST/v1/Locations/' + _address + "?key=" + KEY.BingMap_key });
                let _results = results.data.resourceSets[0].resources;

                if (_results.length === 1) {
                    let data = {
                        success: true,
                        lat: _results[0].point.coordinates[0],
                        lon: _results[0].point.coordinates[1]
                    };
                    return data;
                } else {
                    return { success: false }
                }
            }
        } catch (e) {
            return { success: false }
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
                    <Col span={8}>
                        <Typography.Title level={5} style={{ marginLeft: '5px' }}>
                            Working Address
                        </Typography.Title>
                        <AutoComplete
                            size="large"
                            style={{ width: '80%' }}
                            id="workingAddress"
                            options={possibleAddressList}
                            onSearch={getPossibleAddressList}
                            onChange={value => setWorkingAddress(value)}
                            onSelect={value => setWorkingAddress(value)}
                            required
                        />
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