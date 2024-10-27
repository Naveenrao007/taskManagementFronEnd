import Dashboard from "../components/Dashboard/Dashboard";
import { addTokenToHeader } from "../helper/Header";
import axios from "axios";
async function getBoardData() {
    const headers = addTokenToHeader({ headers: {} });
    // ${import.meta.env.VITE_BASE_URL}/dashboard/board
        console.log("Base URL:", import.meta.env.VITE_BaseUrl+"dashboard/board");

    const res = await axios.get(`${import.meta.env.VITE_BaseUrl}/dashboard/board`, {
        headers
    });
    console.log(res);
    
    if (res.status === 400 || res.status === 401 || res.status === 402) {
        localStorage.removeItem("token");
        alert("You're logged out");
        window.location.href = "/login";
    }

    console.log("nrydsf",res.data);

    return res.data;
}
export default getBoardData