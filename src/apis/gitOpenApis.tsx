import { AxiosPromise } from "axios";
import request from "./core/index.";
import { RepositoryImpl } from "../recoil/repository/atom";

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
    items: [RepositoryImpl];
    incomplete_results: boolean;
};

const BASE_URL = "https://api.github.com";

// 토큰 관리 필요!
const token = "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";

export const searchRepositories = ({
    name,
    page = 1,
    per_page = 50,
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
