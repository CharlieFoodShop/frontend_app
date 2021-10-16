import React from 'react'
import '../../../static/css/customer_css/footer.css';
import { Link } from 'react-router-dom';
import CUSTOMER_SERVICE_PATH from '../../../config/CUSTOMER_API_URL';

const Footer = () => {
    return (
        <div className="footer-div">
            {'Copyright © '}
            <Link to={{ pathname: CUSTOMER_SERVICE_PATH.DEFAULT_URL }} target="_blank">
                Charlie's Food Shop
            </Link>
            <div>{new Date().getFullYear()}</div>
        </div>
    )
}

export default Footer;