import request from "./core";

interface IGetUser {
    username: string;
}

interface IGetRepositoryIssues {
    owner: string;
    repo: string;
}
// 토큰 관리 필요!

// 특정 유저의 퍼블릭 레포지토리 가져오기
export const getUser = ({ username }: IGetUser) => {
    return request({
        baseURL: "https://api.github.com",
        url: `users/${username}/repos`,
        headers: {
            Authorization: "Bearer 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",
        },
    });
};

// 레포지토리 이슈 가져오기
export const getRepositoryIssues = ({ owner, repo }: IGetRepositoryIssues) => {
    return request({
        baseURL: "https://api.github.com",
        url: `repos/${owner}/${repo}/issues`,
        headers: {
            Authorization: "Bearer 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",
        },
    });
};
