import axios from "axios";

const url = process.env.REACT_APP_base_url;

const axiosClient = axios.create({
    baseURL: `${url}/api/v1/`
})

axiosClient.interceptors.request.use((config) => {
    const token = localStorage.getItem('ACCESS_TOKEN');
    config.headers.Authorization = `Bearer ${token}`
    return config;
})

axiosClient.interceptors.response.use((response) => {
    return response
}, (error) => {
    const { response } = error;
    if (response.status === 401) {
        localStorage.removeItem('ACCESS_TOKEN')
    } else if (response.status === 404) {
        //Show not found
    }

    throw error;
})

export default axiosClient