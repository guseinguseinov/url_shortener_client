import { Layout, Menu } from 'antd';
import React from 'react';
import { Link } from 'react-router-dom';
const { Header, Content, Footer, Sider } = Layout;

const CustomLayout = ({ children }) => (
    <Layout style={{ minHeight: "100vh" }}>
        <Sider
            breakpoint="lg"
            collapsedWidth="0"
        >
            <Menu
                theme="dark"
                mode="inline"
            >
                <Menu.Item key="home">
                    <Link to="/">Home</Link>
                </Menu.Item>
                <Menu.Item key="shorts">
                    <Link to="/shorts">Shorts</Link>
                </Menu.Item>
            </Menu>
        </Sider>
        <Layout>
            <Header
                className="site-layout-sub-header-background"
                style={{
                    padding: 0,
                    textAlign: "center",
                    color: "#fff",
                    fontWeight: "bold",
                    fontSize: "1.5rem"
                }}
            >
                <Link style={{ color: "#fff" }} to="/">Short URL</Link>
            </Header>
            <Content
                style={{
                    margin: '24px 16px 0',
                }}
            >
                <div
                    className="site-layout-background"
                    style={{
                        padding: 24,
                        minHeight: 360,
                    }}
                >
                    {children}
                </div>
            </Content>
            <Footer
                style={{
                    textAlign: 'center',
                }}
            >
                Made by <a style={{ fontWeight: "bold", }} href='https://www.linkedin.com/in/guseinguseinov/'>Gusein</a>
            </Footer>
        </Layout>
    </Layout>
);

export default CustomLayout;