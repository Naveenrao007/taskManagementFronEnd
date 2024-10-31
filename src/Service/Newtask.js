import axios from "axios";
import { addTokenToHeader } from "../helper/Header";
const createNewtask = async (data) => {
    const headers = addTokenToHeader({ headers: {} })
    try {
        const res = await axios.post(`${import.meta.env.VITE_BaseUrl}/dashboard/create`, data, {
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
const manageTaskStatus = async (data) => {

    const headers = addTokenToHeader({ headers: {} })
    try {
        const res = await axios.put(`${import.meta.env.VITE_BaseUrl}/dashboard/updateTaskStatus`, data, {
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
const UpdateTask = async (data) => {

    const headers = addTokenToHeader({ headers: {} })
    try {
        const res = await axios.put(`${import.meta.env.VITE_BaseUrl}/dashboard/updateTask`, data, {
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


const deleteTask = async (data) => {
    console.log("api", data);
    const headers = addTokenToHeader({ headers: {} })
    console.log("jrsgfdg00", headers);
    
    try {
        const res = await axios.delete(`${import.meta.env.VITE_BaseUrl}/dashboard/deleteTask`,  {
            headers,
            data
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

export { createNewtask, manageTaskStatus, deleteTask ,UpdateTask}