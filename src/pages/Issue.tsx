import React, { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { List } from "semantic-ui-react";
import styled from "styled-components";
import { getRepositoryIssues } from "../api/main";
import GridExampleDividedPhrase from "../components/GridList";
import Layout from "../components/layout/Layout";
import PaginationComponent from "../components/Pagination";
import issuesAtom from "../recoil/issues/atom";
import repositoryAtom from "../recoil/repository/atom";

const Issue = () => {
    const [issues, setIssues] = useRecoilState(issuesAtom);
    const [viewList, setViewList] = useState(issues.list);
    const [viewedPages, setViewedPages] = useState<number[]>([]);

    // console.log(issues);
    //

    const getIssues = async (page: number) => {
        if (!Boolean(issues.owner.username) || !Boolean(issues.owner.repositoryName)) return;
        if (viewedPages.includes(page)) {
            setViewList(issues.list.slice(page * 10 - 10, page * 10));
            return;
        }
        setViewedPages((prev) => [...prev, page]);

        const issueList = await getRepositoryIssues({
            owner: issues.owner.username,
            repo: issues.owner.repositoryName,
            page: page,
        });
        console.log(issueList);
        setViewList(issueList as any);

        setIssues((prev) => ({
            ...prev,
            page: page,
            list: [...prev.list, ...(issueList as any)] as [],
        }));
    };

    return (
        <Layout>
            <StyledUList>
                {viewList.map((listItem: { title: string; body: string; html_url: string }, i) => {
                    return (
                        <StyledListItem key={i}>
                            <List.Header
                                content={
                                    <a href={listItem.html_url} target="_blank">
                                        {listItem.title}
                                    </a>
                                }
                            />
                            {/*<List.Description>{listItem.body}</List.Description>*/}
                        </StyledListItem>
                    );
                })}
            </StyledUList>
            <PaginationComponent totalPage={Math.ceil(issues.listLength / 10)} callback={getIssues} />
        </Layout>
    );
};

export default Issue;

const StyledUList = styled.ul`
    padding: 0px;
    margin: 0px;
    overflow-y: scroll;
`;
const StyledListItem = styled.li`
    padding: 4px;
    border: 1px solid #e5e5e5;
    height: 30px;
`;
