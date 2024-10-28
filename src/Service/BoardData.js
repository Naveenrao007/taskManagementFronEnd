import Dashboard from "../components/Dashboard/Dashboard";
import { addTokenToHeader } from "../helper/Header";
import axios from "axios";
async function getBoardData() {

    try {
        const headers = addTokenToHeader({ headers: {} });
        console.log("Base URL:", import.meta.env.VITE_BaseUrl + "/dashboard/board");
        const res = await axios.get(`${import.meta.env.VITE_BaseUrl}/dashboard/board`, {
            headers
        });
        return {
            status: res.status,
            data: res.data

        }

    } catch (error) {
        return {
            status: error.status,
            data: error.response.data
        }


    }




}
export default getBoardData