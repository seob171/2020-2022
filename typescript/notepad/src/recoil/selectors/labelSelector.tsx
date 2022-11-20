import { atom, selector, selectorFamily } from "recoil";
import Axios from "../../api/Core";
import { BASE_URL } from "../../Constant";

export interface LabelStateTypes {
    id: string;
    title: string;
    updatedAt: string;
    createdAt: string;
    memoCount: number;
}

export const labelListSelector = selector({
    key: "label_list_selector",
    get: async ({ get }) => {
        try {
            const res = await Axios.get(`labels`);
            return res.data.data;
        } catch (err) {
            return [];
        }
    },
});
