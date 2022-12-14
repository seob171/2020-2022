import { AxiosPromise } from "axios";
import request from "./core/index.";
import { RepositoryListImpl } from "../recoil/repository/atom";
import { IssuesListImpl } from "../recoil/issues/atom";

interface SearchRepositoryProps {
    name: string;
    page?: number;
    per_page?: number;
}

interface listRepositoryIssuesProps {
    owner: string;
    repo: string;
    page?: number;
    per_page?: number;
}

export type SearchRepositoryPromiseType = {
    total_count: number;
    items: [RepositoryListImpl];
    incomplete_results: boolean;
};

const BASE_URL = "https://api.github.com";

export const searchRepositories = ({
    name,
    page = 1,
    per_page = 40,
}: SearchRepositoryProps): AxiosPromise<SearchRepositoryPromiseType> => {
    return request({
        baseURL: BASE_URL,
        url: `search/repositories`,
        // headers: {
        //     Authorization: `Bearer ${process.env.ACCESS_TOKEN}`,
        // },
        params: {
            page,
            per_page,
            q: `${name} in:name`,
        },
    });
};

export const listRepositoryIssues = ({
    owner,
    repo,
    page = 1,
    per_page = 15,
}: listRepositoryIssuesProps): AxiosPromise<IssuesListImpl[]> => {
    return request({
        baseURL: BASE_URL,
        url: `repos/${owner}/${repo}/issues`,
        // headers: {
        //     Authorization: `Bearer ${process.env.ACCESS_TOKEN}`,
        // },
        params: {
            page,
            per_page,
        },
    });
};
