import React, { useState, useEffect } from 'react';
import { Col, Row, Button, Typography, Divider, message } from 'antd';
import axios from 'axios';
import MANAGER_SERVICE_PATH from '../../../config/MANAGER_API_URL';

const FoodShopDetail = (props) => {

    useEffect(async () => {
        try {
            console.log(props.match.params.food_shop_id);
        } catch (e) {
            return message.error(e.message);
        }
    }, []);

    const getFoodShopDetail = async () => {

    }

    return (
        <div>
            sdfcxv
        </div>
    )
}

export default FoodShopDetail
