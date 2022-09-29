import { atom } from "recoil";

export type IssuesListImpl = {
    id: number;
    html_url: string;
    user: { login: string; id: number; avatar_url: string; html_url: string };
};

export interface IssuesImpl {
    list: IssuesListImpl[];
    owner: string;
    repositoryName: string;
    page: number;
    openedPage: number[];
}

// 페이지리스트, 현재 열람한 페이지, 이슈 owner, 레포지토리 이름
const issuesAtom = atom<IssuesImpl>({
    key: "issues",
    default: { list: [], openedPage: [], owner: "", repositoryName: "", page: 1 },
});

export default issuesAtom;
