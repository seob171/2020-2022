import { atom, selector } from "recoil";
import { labelListSelector } from "../selectors/labelSelector";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

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
    effects_UNSTABLE: [persistAtom],
});

export const currentLabelState = atom<Partial<LabelStateTypes>>({
    key: "current_label",
    default: {},
    effects_UNSTABLE: [persistAtom],
});
