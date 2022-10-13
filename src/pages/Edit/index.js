import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Checkbox, Form, Input, message } from "antd";
import { RollbackOutlined } from '@ant-design/icons';
import CustomLayout from "../Layout";
import axios from '../../lib/axios';

const Edit = () => {

    const params = useParams();
    const navigate = useNavigate();
    const [form] = Form.useForm();
    const [url, setURL] = useState({});
    const [loading, setLoading] = useState(false);
    const [disabled, setDisabled] = useState(false);

    const onFinish = async (values) => {
        if (values.targetURL == url.targetURL && values.shortURL == url.shortURL) {
            message.error("You have not edited");
            return;
        }
        // edit 
        try {
            setLoading(true);
            const { data } = await axios.patch(`urls/${params.id}`, values);
            message.success("URL Data Updated Successfully.");
        } catch (err) {
            message.error(err.response.data.message)
        } finally {
            setLoading(false);
        }
    };

    const onFinishFailed = (errorInfo) => {
        message.error(errorInfo);
    };

    useEffect(() => {
        async function getSHort() {
            try {
                setDisabled(true);
                const { data } = await axios.get(`urls/${params.id}`);
                setURL(data.data);
                form.setFieldsValue({
                    targetURL: data.data.targetURL,
                    shortURL: data.data.shortURL,
                });
                message.success("Data Has Been Loaded");
            } catch (err) {
                message.error(err.response.data.message);
                navigate('/');
            }
            finally {
                setDisabled(false);
            }
        }

        getSHort();
    }, []);

    return (
        <>
            <CustomLayout >
                <Button onClick={() => window.history.back()}> <RollbackOutlined />Go Back</Button>
                <Form
                    style={{
                        maxWidth: "600px",
                        margin: "0 auto"
                    }}
                    name="basic"
                    initialValues={form}
                    form={form}
                    layout="vertical"
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                >
                    <Form.Item
                        name="targetURL"
                        label="Target URL"
                        rules={[
                            {
                                required: true,
                                message: 'Target URL can not be empty!',
                            },
                        ]}
                    >
                        <Input placeholder="https://google.com" />
                    </Form.Item>

                    <Form.Item
                        name="shortURL"
                        label="Short URL"
                        rules={[
                            {
                                required: true,
                                message: 'Short URL can not be empty!!',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item>
                        <Button disabled={disabled} loading={loading} type="default" htmlType="submit">
                            Edit
                        </Button>
                    </Form.Item>
                </Form>
            </CustomLayout>
        </>
    )
}

export default Edit;