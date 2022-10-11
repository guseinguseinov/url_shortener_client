import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import CustomLayout from "../Layout";
import axios from '../../lib/axios';

const Edit = () => {

    const params = useParams();
    const [data, setData] = useState({});
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        try {

        } catch (err) {

        }
        finally {

        }
    }, []);

    return (
        <>
            <CustomLayout>
                <h1>Edit</h1>

            </CustomLayout>
        </>
    )
}

export default Edit;