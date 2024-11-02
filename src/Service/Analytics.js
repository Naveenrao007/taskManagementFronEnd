import axios from "axios";
import { addTokenToHeader } from "../helper/Header";
const getAnalytics = async () => {
    const headers = addTokenToHeader({ headers: {} });

    try {
        const res = await axios.get(`${import.meta.env.VITE_BaseUrl}/dashboard/analytics`, {
            headers
        });

        return {
            data: res.data,
            status: res.status
        };

    } catch (error) {
        console.error("Error in registration:", error);
        return {
            error: error.response ? error.response.data : "Internal server error",
            status: error.response ? error.response.status : 500
        };
    }
};

export default getAnalytics