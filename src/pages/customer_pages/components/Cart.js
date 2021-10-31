import React, { useState, useEffect, useContext } from 'react';
import { message, Input, Row, Col, Divider, Button, Select, Typography, AutoComplete, Card, Avatar } from 'antd';
import { PlusOutlined, MinusOutlined } from '@ant-design/icons';
import axios from 'axios';
import CUSTOMER_SERVICE_PATH from '../../../config/CUSTOMER_API_URL';
import KEY from '../../../config/KEY';
import Paypal from './Paypal';

import ShopContext from '../../../context/ShopContext';

const Cart = () => {

    const context = useContext(ShopContext);

    const [driverList, setDriverList] = useState([]);
    const [possibleAddressList, setPossibleAddressList] = useState([]);
    const [address, setAddress] = useState(null);
    const [lat, setLat] = useState(null);
    const [lon, setLon] = useState(null);

    const [selectDriver, setSelectDriver] = useState(-1);
    const [note, setNote] = useState('');

    const [foodTotal, setFoodTotal] = useState(0);
    const [driverTotal, setDriverTotal] = useState(0);

    const [checkout, setCheckout] = useState(false);

    useEffect(async () => {
        let data = await getDriverList();
        setDriverList(data);
    }, []);

    useEffect(() => {
        setFoodTotal(getFoodTotal());
    }, [context.cart]);

    const getDriverList = async () => {
        let results = await axios({ method: 'get', url: CUSTOMER_SERVICE_PATH.GET_ALL_DRIVER_DETAIL });
        return results.data.data;
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

    const getFoodTotal = () => {
        let total = 0;
        for (let i = 0; i < context.cart.length; i++) {
            total += context.cart[i].food_price * context.cart[i].quantity;
        }
        return total;
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
                    setAddress(address);
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

    const handleItemDecrement = (product) => {
        context.deleteProductFromCartByOne(product);
    }

    const handleItemIncrement = (product) => {
        context.addProductToCartByOne(product);
    }

    const handleRemoveItem = (product) => {
        context.removeProductFromCart(product);
    }

    const handleSwitchDriver = (index) => {
        setSelectDriver(index);
        setDriverTotal(driverList[index].cost);
    }

    const handlePurchase = () => {
        if (!address)
            return message.error("Please provide the address for receiving order");

        if (selectDriver === -1)
            return message.error("Please select the delivering driver for order");

        setCheckout(true);
    }

    return (
        <div>
            {
                context.cart.length === 0 ?
                    <Typography.Title level={3}>Nothing in the cart</Typography.Title> :
                    <div>
                        <Row>
                            <Col span={5}>
                                <Typography.Title level={4}>Quantity</Typography.Title>
                            </Col>
                            <Col span={5}>
                                <Typography.Title level={4}>Name</Typography.Title>
                            </Col>
                            <Col span={5}>
                                <Typography.Title level={4}>Price</Typography.Title>
                            </Col>
                            <Col span={5}>
                                <Typography.Title level={4}>Sub Total</Typography.Title>
                            </Col>
                            <Col span={4}>
                                <Typography.Title level={4}>Action</Typography.Title>
                            </Col>
                        </Row>
                        <br />
                        {
                            context.cart.map((item, index) => (
                                <div key={index}>
                                    <Row>
                                        <Col span={5}>
                                            <Button
                                                shape="circle"
                                                size="small"
                                                icon={<MinusOutlined />}
                                                style={{ margin: '2%' }}
                                                onClick={() => handleItemDecrement(item)}
                                            />
                                            <Typography.Text>{item.quantity}</Typography.Text>
                                            <Button
                                                shape="circle"
                                                size="small"
                                                icon={<PlusOutlined />}
                                                style={{ margin: '2%' }}
                                                onClick={() => handleItemIncrement(item)}
                                            />
                                        </Col>
                                        <Col span={5}>
                                            <Typography.Text>{item.food_name}</Typography.Text>
                                        </Col>
                                        <Col span={5}>
                                            <Typography.Text>${item.food_price}</Typography.Text>
                                        </Col>
                                        <Col span={5}>
                                            <Typography.Text>${item.food_price * item.quantity}</Typography.Text>
                                        </Col>
                                        <Col span={4}>
                                            <Button
                                                danger
                                                onClick={() => handleRemoveItem(item)}
                                            >
                                                Delete
                                            </Button>
                                        </Col>
                                    </Row>
                                    <br />
                                </div>
                            ))
                        }
                        <Divider />
                        <Typography.Title level={5} >
                            Please Provide Your Address
                        </Typography.Title>
                        <br />
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
                                    id="addressText"
                                    options={possibleAddressList}
                                    onSearch={getPossibleAddressList}
                                    onSelect={updateCoord}
                                />
                                <br /><br />
                                <Typography.Title level={5} style={{ marginLeft: '20px' }}>Delivery Address: {address ? address : ''}</Typography.Title>
                                <Typography.Title level={5} style={{ marginLeft: '20px' }}>Latitude: {lat ? lat : ''}</Typography.Title>
                                <Typography.Title level={5} style={{ marginLeft: '20px' }}>Longitude: {lon ? lon : ''}</Typography.Title>
                            </Col>
                        </Row>
                        <Divider />
                        <Typography.Title level={5} >
                            Please Select Delivery Driver
                        </Typography.Title>
                        <br />
                        <Row>
                            <Col span={12}>
                                {
                                    selectDriver === -1 ?
                                        <></> :
                                        <Card
                                            style={{ width: '80%' }}
                                        >
                                            <Card.Meta
                                                avatar={<Avatar src={driverList[selectDriver].avatar_url} />}
                                                title={driverList[selectDriver].first_name + " " + driverList[selectDriver].last_name}
                                                description={
                                                    <div>
                                                        <p>Cost: ${driverList[selectDriver].cost}</p>
                                                        <p>Speed: {driverList[selectDriver].speed} km/h</p>
                                                    </div>
                                                }
                                            />
                                        </Card>
                                }
                            </Col>
                            <Col span={12}>
                                <Select
                                    size="large"
                                    style={{ width: '80%' }}
                                    placeholder="Please select the delivery driver"
                                    onChange={handleSwitchDriver}
                                >
                                    {
                                        driverList.map((item, index) => (
                                            <Select.Option key={index} value={index}>
                                                {item.first_name + " " + item.last_name}
                                            </Select.Option>
                                        ))
                                    }
                                </Select>

                            </Col>
                        </Row>
                        <Divider />
                        <Typography.Title level={5} >
                            Please add note for your order
                        </Typography.Title>
                        <br />
                        <Input.TextArea
                            rows={5}
                            value={note}
                            onChange={e => setNote(e.target.value)}
                            placeholder="eg. please add ketchup"
                        />
                        <Divider />
                        <div>
                            {
                                checkout ?
                                    <Paypal
                                        address={address}
                                        lat={lat}
                                        lon={lon}
                                        note={note}
                                        driverId={driverList[selectDriver].deliver_driver_id}
                                    /> :
                                    <></>
                            }
                        </div>
                        <Row>
                            <Col span={12}>
                                <Typography.Title level={5}
                                    style={{ float: 'left' }}
                                >
                                    Total: ${
                                        Math.floor((foodTotal + driverTotal) * 100) / 100
                                    }
                                </Typography.Title>
                            </Col>
                            <Col span={12}>
                                <Button
                                    onClick={handlePurchase}
                                    type="primary"
                                    style={{ float: 'right' }}
                                >
                                    Purchase
                                </Button>
                            </Col>
                        </Row>
                    </div>
            }
        </div>
    )
}

export default Cart;
