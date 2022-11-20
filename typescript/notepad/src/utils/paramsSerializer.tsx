export const paramsSerializer = function (key: string, array: string[]) {
    const params = new URLSearchParams();
    for (const value of array) {
        params.append(key, value);
    }

    return params.toString();
};
