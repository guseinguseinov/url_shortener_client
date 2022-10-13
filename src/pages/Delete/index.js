import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Form, Modal, message, Typography } from "antd";
import { RollbackOutlined } from '@ant-design/icons';
import CustomLayout from "../Layout";
import axios from '../../lib/axios';

const { Title } = Typography;

const Delete = () => {

    const params = useParams();
    const navigate = useNavigate();
    const [form] = Form.useForm();
    const [url, setURL] = useState({});
    const [loading, setLoading] = useState(false);
    const [disabled, setDisabled] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleOk = async () => {
        setIsModalOpen(false);
        await onFinish();
        navigate('/');
    };

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };


    const onFinish = async () => {

        try {
            setLoading(true);
            const { data } = await axios.delete(`urls/${params.id}`);
            message.success("URL Data Deleted Successfully.");
        } catch (err) {
            message.error(err.response.data.message)
        } finally {
            setLoading(false);
        }
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
            <CustomLayout loading={disabled} >
                <Modal title="Are you sure?" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                    <p>Do you really want to delete this short URL?</p>
                </Modal>
                <Button onClick={() => window.history.back()}> <RollbackOutlined />Go Back</Button>

                <div>
                    <Title level={2}>Target URL :</Title>
                    <Title level={4}>{url.targetURL}</Title>
                    <Title level={2}>Short URL :</Title>
                    <Title level={4}>{url.shortURL}</Title>
                    <Button onClick={showModal} disabled={disabled} danger loading={loading} type="default" htmlType="submit">
                        Delete
                    </Button>
                </div>
            </CustomLayout>
        </>
    )
}

export default Delete;