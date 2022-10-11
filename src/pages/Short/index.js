import React, { useEffect } from "react";
import { Redirect, useNavigate, useParams } from "react-router-dom";
import { message } from 'antd';
import axios from "../../lib/axios";

const Short = () => {
    const params = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        async function getRedirectURL() {
            try {
                const { data } = await axios.get(`urls/short/${params.URL}`);
                window.location.href = data.data.targetURL
            } catch (err) {
                message.error(err.response.data.message);
                navigate("/");
            }
        }
        getRedirectURL();
    }, []);
}

export default Short;