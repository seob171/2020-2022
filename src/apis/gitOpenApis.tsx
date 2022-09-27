import { AxiosPromise } from "axios";
import request from "./core/index.";
import { RepositoryListImpl } from "../recoil/repository/atom";

interface SearchRepositoryProps {
    name: string;
    page?: number;
    per_page?: number;
}

interface listRepositoryIssuesProps {
    owner: string;
    repo: string;
    page?: number;
}

export type SearchRepositoryPromiseType = {
    total_count: number;
    items: [RepositoryListImpl];
    incomplete_results: boolean;
};

const BASE_URL = "https://api.github.com";

// 토큰 관리 필요!
const token = "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";

export const searchRepositories = ({
    name,
    page = 1,
    per_page = 40,
}: SearchRepositoryProps): AxiosPromise<SearchRepositoryPromiseType> => {
    return request({
        baseURL: BASE_URL,
        url: `search/repositories`,
        headers: {
            Authorization: `Bearer ${token}`,
        },
        params: {
            page,
            per_page,
            q: `${name} in:name`,
        },
    });
};

export const listRepositoryIssues = ({ owner, repo, page = 1 }: listRepositoryIssuesProps): AxiosPromise => {
    return request({
        baseURL: BASE_URL,
        url: `repos/${owner}/${repo}/issues`,
        headers: {
            Authorization: `Bearer ${token}`,
        },
        params: {
            page,
        },
    });
};
