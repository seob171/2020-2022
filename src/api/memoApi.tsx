import { AxiosError } from "axios";
import { MemoStateType } from "../recoil/atoms/memoAtom";
import Axios from "./Core";

export const findAllMemos = async (payload: { countOnly?: boolean }) => {
    try {
        const { data } = await Axios({
            url: `/memos`,
            params: {
                countOnly: payload.countOnly,
            },
        });
        console.log(data);
        return data;
    } catch (error) {
        throw error;
    }
};

export const getMemo = async (payload: Partial<MemoStateType>) => {
    try {
        const { data } = await Axios({ url: `/memos/${payload.id}` });
        return data;
    } catch (error) {
        throw error;
    }
};

export const createMemo = async (payload: Partial<MemoStateType>) => {
    try {
        const { data } = await Axios({
            url: `/memos`,
            method: "post",
            data: { title: payload.title, content: payload.content },
        });
        return data;
    } catch (error) {
        throw error;
    }
};
export const updateMemo = async (payload: Partial<MemoStateType>) => {
    try {
        const { data } = await Axios({
            url: `/memos/${payload.id}`,
            method: "put",
            data: { title: payload.title, content: payload.content },
        });
        return data;
    } catch (error) {
        throw error;
    }
};
export const deleteMemo = async (payload: Partial<MemoStateType>) => {
    try {
        const { data } = await Axios({ url: `/memos/${payload.id}`, method: "delete" });
        return data;
    } catch (error) {
        throw error;
    }
};
