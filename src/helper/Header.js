
export function addTokenToHeader({ headers }) {
    const token = localStorage.getItem("token");
    console.log("tokenrrr", token);
    
    if (token) {
        headers.Authorization = `${token}`;
    }
    return headers;
}

