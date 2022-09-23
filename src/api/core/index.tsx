import axios from "axios";

// axios 인스턴스 생성
const request = axios.create({ baseURL: "" });

// 요청 타임아웃 설정
request.defaults.timeout = 5000;

// 요청 인터셉터 추가
request.interceptors.request.use(
    (config) => {
        return config;
    },
    (error) => {
        console.log(error);
        return Promise.reject(error);
    },
);

// 응답 인터셉터 추가
request.interceptors.response.use(
    (response) => {
        const res = response.data;
        return res;
    },
    (error) => {
        console.log(error);
        return Promise.reject(error);
    },
);

export default request;
