import { AxiosPromise } from "axios";
import request from "./core/index.";

interface SearchRepositoryProps {
    name: string;
    page?: number;
    per_page?: number;
}

interface IGetRepositoryIssues {
    owner: string;
    repo: string;
    page?: number;
}

const BASE_URL = "https://api.github.com";

// 토큰 관리 필요!
const token = "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";

export const searchRepositories = ({ name, page = 1, per_page = 50 }: SearchRepositoryProps): AxiosPromise => {
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

export const listRepositoryIssues = ({ owner, repo, page = 1 }: IGetRepositoryIssues): AxiosPromise => {
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
