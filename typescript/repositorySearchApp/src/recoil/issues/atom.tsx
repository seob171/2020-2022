import { atom } from "recoil";

export type IssuesListImpl = {
    id: number;
    html_url: string;
    title: string;
    updated_at: string;
    number: number;
    user: { login: string; id: number; avatar_url: string; html_url: string };
};

export interface IssuesImpl {
    list: Array<IssuesListImpl[]>;
    // IssuesListImpl[];
    owner: string;
    repositoryName: string;
    page: number;
    open_issues_count: number;
}

// 페이지리스트, 현재 열람한 페이지, 이슈 owner, 레포지토리 이름
const issuesAtom = atom<IssuesImpl>({
    key: "issues",
    default: { list: [], owner: "", repositoryName: "", page: 1, open_issues_count: 0 },
});

export default issuesAtom;
