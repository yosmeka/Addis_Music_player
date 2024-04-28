import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'http://localhost:3000/api/',
});

const refreshToken = async () => {
    const refreshtoken = localStorage.getItem('token') || '';
    console.log(refreshtoken);
    console.log(localStorage);
    return axiosInstance.post('user/refresh', {refreshtoken});
}

axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
        if (error.response && error.response.status == 401) {
            try {
                const newToken = await refreshToken();
                console.log('new: ', newToken.data.data)
                axiosInstance.defaults.headers.common['Authorization'] = "Bearer "+newToken.data.data.accessToken;
                const oldRequest = error.config;
                oldRequest.headers["Authorization"] = "Bearer "+newToken.data.data.accessToken
                return await axiosInstance(oldRequest);
            } catch (error) {
                return Promise.reject(error);
            }
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;