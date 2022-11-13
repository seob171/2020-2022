import { atom, selector } from "recoil";
import { BASE_URL } from "../../Constant";

// 통신 성공 시 가져오게 될 데이터의 타입
export type MemoStateType = {
    id: string;
    updatedAt: string;
    createdAt: string;
    title: string;
    content: string;
};

export const memoListState = atom<MemoStateType[]>({
    key: "memo_list",
    default: [],
});

export const currentMemoState = atom<Partial<MemoStateType>>({
    key: "current_memo",
    default: {},
});

export const totalMemoCount = atom<number>({
    key: "totalMemoCount",
    default: 0,
});

export const isActive = atom<boolean>({
    key: "memoActive",
    default: false,
});
