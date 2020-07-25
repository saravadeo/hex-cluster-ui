import axios from "axios";

const options = {
    baseURL: process.env.REACT_APP_BASE_URL,
    headers: {
        'Content-Type': 'application/json'
    }
};
export default axios.create(options);