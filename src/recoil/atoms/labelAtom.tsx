import { atom, selector } from "recoil";
import { BASE_URL } from "../../Constant";
import { labelListSelector } from "../selectors/labelSelector";

export interface LabelStateTypes {
    id: string;
    title: string;
    updatedAt: string;
    createdAt: string;
    memoCount: number;
}

export const labelListState = atom<LabelStateTypes[]>({
    key: "label_list",
    default: [],
});

export const currentLabelState = atom<Partial<LabelStateTypes>>({
    key: "current_label",
    default: {},
});
