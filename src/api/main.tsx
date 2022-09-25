import { AxiosPromise } from "axios";
import request from "./core";

interface IGetUser {
    username: string;
    page?: number;
}

interface IGetRepositoryIssues {
    owner: string;
    repo: string;
}

// 토큰 관리 필요!

// 특정 유저의 퍼블릭 레포지토리 가져오기
export const getUsersRepository = ({ username, page = 1 }: IGetUser): AxiosPromise<any> => {
    return request({
        baseURL: "https://api.github.com",
        url: `users/${username}/repos`,
        headers: {
            Authorization: "Bearer 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",
        },
        params: {
            page,
        },
    });
};

// 레포지토리 이슈 가져오기
export const getRepositoryIssues = ({ owner, repo }: IGetRepositoryIssues): AxiosPromise<any> => {
    return request({
        baseURL: "https://api.github.com",
        url: `repos/${owner}/${repo}/issues`,
        headers: {
            Authorization: "Bearer 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",
        },
    });
};
