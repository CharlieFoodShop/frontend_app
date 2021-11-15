import React, { useState, useEffect } from 'react';
import { message, Typography, Divider } from 'antd';
import axios from 'axios';
import CUSTOMER_SERVICE_PATH from '../../../config/CUSTOMER_API_URL';

const Help = () => {

    const [helpList, setHelpList] = useState([]);

    useEffect(async () => {
        try {
            let results = await getHelpList();
            setHelpList(results);
        } catch (e) {
            return message.error('Sorry, fail to get data');
        }
    }, []);

    const getHelpList = async () => {
        let results = await axios({
            method: 'get',
            url: CUSTOMER_SERVICE_PATH.GET_QUESTION_ANSWER
        });

        return results.data.data;
    }

    return (
        <div>
            {
                helpList.map((item, index) => (
                    <div key={index}>
                        <Typography.Title level={3}>{item.question_content}</Typography.Title>
                        <Typography.Text>{item.answer_content}</Typography.Text>
                        <br />
                        <Divider />
                    </div>
                ))
            }
        </div>
    )
}

export default Help;
