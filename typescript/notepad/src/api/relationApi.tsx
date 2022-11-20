import { AxiosError } from "axios";
import { LabelStateTypes } from "../recoil/atoms/labelAtom";
import { MemoStateType } from "../recoil/atoms/memoAtom";
import { paramsSerializer } from "../utils/paramsSerializer";
import Axios from "./Core";

// Label id 값으로 해당 label에 등록되어 있는 memo들을 가져온다.
export const getMemosByLabel = async (payload: { id: string }) => {
    try {
        const { data } = await Axios({ url: `/labels/$${payload.id}/memos` });
        return data;
    } catch (error) {
        throw error;
    }
};

// Memo id 값으로 해당 memo에 등록되어 있는 label들을 가져온다.
export const getLabelsByMemo = async (payload: { id: string }) => {
    try {
        const { data } = await Axios({ url: `/memos/$${payload.id}/labels` });
        return data;
    } catch (error) {
        throw error;
    }
};

// Label에 memo들을 등록한다.
export const addMemosToLabel = async (payload: { id: string; memoIds: string[] }) => {
    try {
        const { data } = await Axios({
            url: `/labels/$${payload.id}/memos`,
            method: "post",
            params: { memoIds: payload.memoIds },
        });
        console.log(data);
        return data;
    } catch (error) {
        throw error;
    }
};

// Label에 등록되어 있는 memo들을 삭제한다.
export const removeMemosFromLabel = async (payload: { id: string; memoIds: string[] }) => {
    try {
        const { data } = await Axios({
            url: `/labels/$${payload.id}/memos/delete`,
            method: "post",
            params: {
                memoIds: payload.memoIds,
            },
        });
        return data;
    } catch (error) {
        throw error;
    }
};
