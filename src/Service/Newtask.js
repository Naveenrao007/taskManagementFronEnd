import axios from "axios";
import { addTokenToHeader } from "../helper/Header";
const createNewtask = async (data) => {
    const headers = addTokenToHeader({ headers: {} })
    try {
        const res = await axios.post(`${import.meta.env.VITE_BaseUrl}/dashboard/create`,data,{
            headers
        })
        
        return {
            data: res.data,
            status: res.status
        };
    } catch (error) {
        return {
            error: error.response ? error.response.data : "Internal server error",
            status: error.response ? error.response.status : 500
        };
    }
}

export  {createNewtask}