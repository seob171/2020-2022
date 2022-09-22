import request from "./core";

interface IGetRepositoryIssues {
    owner: string;
    repo: string;
}

// get 요청
export const getRepositoryIssues = ({ owner, repo }: IGetRepositoryIssues) => {
    return request({
        baseURL: "https://api.github.com",
        url: `repos/${owner}/${repo}/issues`,
        headers: {
            Authorization: "Bearer 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",
        },
    });
};
