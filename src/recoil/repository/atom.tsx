import { atom } from "recoil";

export interface RepositoryImpl {
    full_name: string;
    description: string;
    open_issues_count: number;
    stargazers_count: number;
}

const repositoryAtom = atom<RepositoryImpl[]>({
    key: "repository",
    default: [],
});

export default repositoryAtom;
