import React, { useState, useEffect, useContext } from 'react';
import { Input, Row, Col, Divider, Button, Typography } from 'antd';
import { PlusOutlined, MinusOutlined } from '@ant-design/icons';
import Paypal from './Paypal';

import ShopContext from '../../../context/ShopContext';

const Cart = () => {

    const context = useContext(ShopContext);

    const [note, setNote] = useState('');
    const [foodTotal, setFoodTotal] = useState(0);
    const [hst, setHst] = useState(0);
    const [checkout, setCheckout] = useState(false);


    useEffect(() => {
        let totalAccount = getFoodTotal();
        setFoodTotal(totalAccount);
        setHst(totalAccount * 0.05 + totalAccount * 0.08)
    }, [context.cart]);


    const getFoodTotal = () => {
        let total = 0;
        for (let i = 0; i < context.cart.length; i++) {
            total += context.cart[i].food_price * context.cart[i].quantity;
        }
        return total;
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

    const handlePurchase = () => {
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
                                            <Typography.Text>${Math.floor(item.food_price * item.quantity * 100) / 100}</Typography.Text>
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
                                        hst={hst}
                                        note={note}
                                    /> :
                                    <></>
                            }
                        </div>

                        <Typography.Title level={5} >Foods: ${Math.floor((foodTotal) * 100) / 100}</Typography.Title>
                        <Typography.Title level={5} >HST: ${Math.floor((hst) * 100) / 100}</Typography.Title>
                        <Typography.Title level={3} >Total: ${Math.floor((foodTotal + hst) * 100) / 100}</Typography.Title>
                        <br />
                        <Button
                            onClick={handlePurchase}
                            type="primary"
                            block
                            style={{ float: 'right' }}
                        >
                            Purchase
                        </Button>


                    </div>
            }
        </div>
    )
}

export default Cart;
