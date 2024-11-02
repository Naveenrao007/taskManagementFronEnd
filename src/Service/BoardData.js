import { addTokenToHeader } from "../helper/Header";
import axios from "axios";
async function getBoardData(dateRange= "thisweek") {

    try {
        const headers = addTokenToHeader({ headers: {} });
        const res = await axios.get(`${import.meta.env.VITE_BaseUrl}/dashboard/board`, {
            headers,
            params: { dateRange } 
        });
        console.log(res);
        
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