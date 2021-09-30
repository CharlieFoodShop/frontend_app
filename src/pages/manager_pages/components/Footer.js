import React from 'react'
import '../../../static/css/manager_css/footer.css';
import { Link } from 'react-router-dom';
import MANAGER_SERVICE_PATH from '../../../config/MANAGER_API_URL';

const Footer = () => {
    return (
        <div className="footer-div">
            {'Copyright © '}
            <Link to={{ pathname: MANAGER_SERVICE_PATH.DEFAULT_URL }} target="_blank">
                Charlie's Food Shop for Managers
            </Link>
            <div>{new Date().getFullYear()}</div>
        </div>
    )
}

export default Footer;