import axios from "axios";

const register = async (data) => {
    try {
        const res = await axios.post(`${import.meta.env.VITE_BaseUrl}/user/register`, data, {
         
        });

        return {
            data: res.data,
            status: res.status
        };

    } catch (error) {
        console.error("Error in registration:", error);
        return {
            error: error.response ? error.response.data : "An unknown error occurred",
            status: error.response ? error.response.status : 500
        };
    }
};
const login = async (data) => {
    try {
        const res = await axios.post(`${import.meta.env.VITE_BaseUrl}/user/login`, data, {
          
        });

        return {
            data: res.data,
            status: res.status
        };

    } catch (error) {
        console.error("Error in login:", error);
        return {
            error: error.response ? error.response.data : "An unknown error occurred",
            status: error.response ? error.response.status : 500
        };
    }
};
export { register ,login };
