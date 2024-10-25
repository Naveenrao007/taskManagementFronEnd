import { addTokenToHeader } from "../helper/Header";
const AddUserToBoard = async (data) => {
    const headers = addTokenToHeader({ headers: {} });

    try {
        const res = await axios.post(`${import.meta.env.VITE_BaseUrl}/user/adduser`, data, {
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