import React, { useEffect, useState } from 'react';
import CustomLayout from '../Layout';
import axios from '../../lib/axios';
import getCookie from '../../lib/cookie';
import { Button, Form, Input, Layout, message, Table } from 'antd';
import { Link } from 'react-router-dom';

const columns = [
    {
        title: 'Target URL',
        dataIndex: 'targetURL',
        key: 'targetURL',
        render: (text) => <a href={text}>{text}</a>,
    },
    {
        title: 'Short URL',
        dataIndex: 'shortURL',
        key: 'shortURL',
        render: (text) => <Link to={text}>{`${window.location.host}/${text}`}</Link>
    },
];


const Home = () => {
    const [data, setData] = useState([]);
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const [token, setToken] = useState(null);

    function addColumn(targetURL, shortURL) {
        setData([...data, { targetURL, shortURL, key: shortURL }])
    }

    useEffect(() => {
        async function authenticate() {
            const { data } = await axios.get('/');
            setToken(data.data);
        }
        const userToken = getCookie();
        if (!userToken) authenticate();
        else setToken(userToken);
    }, []);

    const onFinish = async values => {
        try {
            setLoading(true);
            const res = await axios.post('urls', values);
            message.success("URL is shortened");
            addColumn(res.data.data.targetURL, res.data.data.shortURL);
        } catch (err) {
            message.error(err.response.data.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <CustomLayout>
            <>
                <h3 style={{ textAlign: 'center' }}>
                    Short URL is a free tool to shorten a URL or reduce a link
                    <br />
                    Use our URL Shortener to create a shortened link making it easy to remember
                </h3>
                <Layout
                    style={{
                        margin: "20px"
                    }}
                >
                    <Form style={{ justifyContent: "center" }} form={form} name="horizontal_login" layout="inline" onFinish={onFinish}>
                        <Form.Item
                            name="targetURL"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input URL!',
                                },
                            ]}
                        >
                            <Input placeholder="url*" />
                        </Form.Item>
                        <Form.Item shouldUpdate>
                            {() => (
                                <Button
                                    loading={loading}
                                    type="primary"
                                    htmlType="submit"
                                >
                                    Shorten URL
                                </Button>
                            )}
                        </Form.Item>
                    </Form>
                </Layout>

                {
                    data.length ? <Table columns={columns} dataSource={data} /> : <h1 style={{ textAlign: "center" }}>Paste the URL to be shortened</h1>
                }


            </>
        </CustomLayout>
    )
}

export default Home;