import React, { useRef, useEffect, useContext } from 'react';
import { message } from 'antd';
import ShopContext from '../../../context/ShopContext';
import axios from 'axios';
import CUSTOMER_SERVICE_PATH from '../../../config/CUSTOMER_API_URL';

const Paypal = (props) => {

    const context = useContext(ShopContext);
    const paypal = useRef();

    useEffect(() => {

        window.paypal.Buttons({
            createOrder: () => {
                return axios({
                    method: 'post',
                    url: CUSTOMER_SERVICE_PATH.CREATE_ORDER,
                    data: {
                        email_address: localStorage.getItem('customerEmail'),
                        item_list: context.cart,
                        address: props.address,
                        driver_id: props.driverId,
                        lat: props.lat,
                        lon: props.lon,
                        note: props.note
                    }
                }).then((res) => {
                    if (res.data.success) {
                        return res.data.id
                    } else {
                        return message.error(res.data.message);
                    }
                }).catch(e => {
                    return message.error(e.message);
                });
            },
            onApprove: function (data, actions) {
                return actions.order.capture().then(() => {

                    axios({
                        method: 'post',
                        url: CUSTOMER_SERVICE_PATH.ADD_ORDER_TO_DATABASE,
                        data: {
                            email_address: localStorage.getItem('customerEmail'),
                            item_list: context.cart,
                            address: props.address,
                            driver_id: props.driverId,
                            lat: props.lat,
                            lon: props.lon,
                            note: props.note
                        }
                    }).then((res) => {
                        if (res.data.success) {
                            context.clearCart();
                            return message.success('Purchase Complete');
                        } else {
                            return message.error(res.data.message);
                        }
                    }).catch(e => {
                        return message.error(e.message);
                    });

                })
            }
        }).render(paypal.current);
    }, []);

    return (
        <div>
            <div ref={paypal}></div>
        </div>
    )
}

export default Paypal;
