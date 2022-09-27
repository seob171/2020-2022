import { atom } from "recoil";
import { RepositoryListImpl } from "../repository/atom";

export const LOCAL_STORAGE_KEY = "repository";
function initialValue() {
    const repositoryJson = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (repositoryJson) {
        const repositoryList = JSON.parse(repositoryJson);
        if (!Array.isArray(repositoryList) || repositoryList.some((listItem) => !listItem.id || !listItem.full_name)) {
            return [];
        } else {
            return repositoryList;
        }
    } else {
        return [];
    }
}

const storageAtom = atom<RepositoryListImpl[]>({
    key: "storage",
    default: initialValue(),
});

export default storageAtom;
