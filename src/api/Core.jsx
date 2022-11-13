import axios from "axios";
import qs from "qs";

const config = {
    baseURL: "http://localhost:8080",
    // paramsSerializer: {
    //     encode: (params) => qs.stringify(params, { arrayFormat: "repeat" }),
    // },
};

const Axios = axios.create(config);

export default Axios;
