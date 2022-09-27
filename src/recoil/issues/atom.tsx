import { atom } from "recoil";

// 리스트 issues에 맞게 변경
export type RepositoryListImpl = {
    full_name: string;
    description: string;
    open_issues_count: number;
    stargazers_count: number;
    id: number;
};

export interface RepositoryImpl {
    list: RepositoryListImpl[];
    owner: string;
    repositoryName: string;
    page: number;
}

// 페이지리스트, 현재 열람한 페이지, 이슈 owner, 레포지토리 이름
const repositoryAtom = atom<RepositoryImpl>({
    key: "issues",
    default: { list: [], owner: "", repositoryName: "", page: 1 },
});

export default repositoryAtom;
