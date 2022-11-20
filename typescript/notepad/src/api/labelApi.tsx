import { AxiosError } from "axios";
import { LabelStateTypes } from "../recoil/atoms/labelAtom";
import Axios from "./Core";

export const findAllLabel = async (payload: Partial<LabelStateTypes>) => {
    try {
        const { data } = await Axios({ url: `/labels` });
        return data;
    } catch (error) {
        throw error;
    }
};

export const getLabel = async (payload: Partial<LabelStateTypes>) => {
    try {
        const { data } = await Axios({ url: `/labels/${payload.id}` });
        return data;
    } catch (error) {
        throw error;
    }
};

export const createLabel = async (payload: Partial<LabelStateTypes>) => {
    try {
        const { data } = await Axios({ url: `/labels`, method: "post", data: { title: payload.title } });
        return data;
    } catch (error) {
        throw error;
    }
};
export const updateLabel = async (payload: Partial<LabelStateTypes>) => {
    try {
        const { data } = await Axios({ url: `/labels/${payload.id}`, method: "put", data: { title: payload.title } });
        return data;
    } catch (error) {
        throw error;
    }
};
export const deleteLabelApi = async (payload: Partial<LabelStateTypes>) => {
    try {
        const { data } = await Axios({ url: `/labels/${payload.id}`, method: "delete" });
        return data;
    } catch (error) {
        throw error;
    }
};
