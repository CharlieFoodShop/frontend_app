import React, { useState, useEffect } from 'react';
import { Input, Row, Col, Divider, Button, Typography, message } from 'antd';
import axios from 'axios';
import CUSTOMER_SERVICE_PATH from '../../../config/CUSTOMER_API_URL';

const CurrentOrder = (props) => {

    useEffect(async () => {
        try {

        } catch (e) {
            return message.error('Sorry, fail to get current orders!');
        }
    }, []);

    const handleSeeDetail = (item) => {

    }

    return (
        <div>
            sdfwe
        </div>
    )
}

export default CurrentOrder;
