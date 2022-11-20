import { atom } from "recoil";

export type RepositoryListImpl = {
    full_name: string;
    description: string;
    open_issues_count: number;
    stargazers_count: number;
    id: number;
};

export interface RepositoryImpl {
    list: RepositoryListImpl[];
    name: string;
    page: number;
}

const repositoryAtom = atom<RepositoryImpl>({
    key: "repository",
    default: { list: [], name: "", page: 1 },
});

export default repositoryAtom;
