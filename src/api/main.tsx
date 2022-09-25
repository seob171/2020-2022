import { AxiosPromise } from "axios";
import request from "./core";

interface IGetUser {
    username: string;
    page?: number;
}

interface IGetRepositoryIssues {
    owner: string;
    repo: string;
    page?: number;
}

// 토큰 관리 필요!
const token = "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";

// 특정 유저의 퍼블릭 레포지토리 가져오기
export const getUsersRepository = ({ username, page = 1 }: IGetUser): AxiosPromise<any> => {
    return request({
        baseURL: "https://api.github.com",
        url: `users/${username}/repos`,
        headers: {
            Authorization: `Bearer ${token}`,
        },
        params: {
            page,
        },
    });
};

// 레포지토리 이슈 가져오기
export const getRepositoryIssues = ({ owner, repo, page = 1 }: IGetRepositoryIssues): AxiosPromise<any> => {
    return request({
        baseURL: "https://api.github.com",
        url: `repos/${owner}/${repo}/issues`,
        headers: {
            Authorization: `Bearer ${token}`,
        },
        params: {
            page,
            per_page: 10,
        },
    });
};
