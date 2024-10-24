import axios from "axios";
import { addTokenToHeader } from "../helper/Header";
const allUsers = async () => {
    const headers = addTokenToHeader({ headers: {} })
    try {
        const res = await axios.get(`${import.meta.env.VITE_BaseUrl}/user/all`,{
            headers
        })
        console.log(res);
        
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

export  {allUsers}