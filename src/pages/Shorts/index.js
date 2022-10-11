import React, { useEffect, useState } from 'react';
import { Link, Navigate } from "react-router-dom";
import { Table, Space, Button, message } from "antd";
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';

import axios from '../../lib/axios';
import CustomLayout from '../Layout';

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
        render: (text) => <a href={text} > {`${window.location.host}/${text}`}</a >
    },
    {
        title: 'Action',
        key: 'action',
        render: (_, record) => (

            <Space style={{ "display": "flex", "justifyContent": "space-between" }} size="middle">
                <Link to={"/edit/" + record.key}><Button type="dashed"> <EditOutlined /></Button></Link>
                <Link to={"/delete/" + record.key}><Button danger><DeleteOutlined /></Button></Link>
            </Space>
        ),
    },
];


const Shorts = () => {

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        async function getURLs() {
            setLoading(true);
            try {
                const { data } = await axios.get('urls');
                setData(data.data);
                message.success("Data Has Been Loaded");
            } catch (err) {
                message.error(err.response.data.message);
            } finally {
                setLoading(false);
            }
        }
        getURLs();

    }, []);

    return (
        <>
            <CustomLayout>
                <Table loading={loading} columns={columns} dataSource={data.map(chunk => {
                    const shortURL = chunk.shortURL;
                    return {
                        key: chunk._id,
                        targetURL: chunk.targetURL,
                        shortURL
                    }
                })}
                >

                </Table>
            </CustomLayout>
        </>
    )
}

export default Shorts;