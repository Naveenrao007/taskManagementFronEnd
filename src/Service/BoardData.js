import { addTokenToHeader } from "../helper/Header";
import axios from "axios";
async function getBoardData() {
    const headers = addTokenToHeader({ headers: {} });
    const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/v1/job`, {
        headers
    });
    if (res.status === 401) {
        localStorage.removeItem("token");
        alert("You're logged out");
        window.location.href = "/login";
    }
    return res;
}
export default  getBoardData