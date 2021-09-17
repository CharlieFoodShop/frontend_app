import React from 'react'
import { Layout, Menu, Breadcrumb, message, Spin } from 'antd';
import { UserOutlined, FileImageOutlined } from '@ant-design/icons';
import { Route } from 'react-router-dom';

import Footer from './components/Footer';

export default () => {
    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Spin tip="Loading..." spinning={false}>
                <Layout.Sider collapsible>
                    <Menu mode="inline">

                    </Menu>
                </Layout.Sider>
                <Layout className="site-layout">

                </Layout>
            </Spin>
        </Layout>
    )
}
