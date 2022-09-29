import React, { useCallback, useEffect, useState } from "react";
import Pagination from "../components/common/Pagination";
import Layout from "../components/layout/index";
import { MdFirstPage, MdLastPage, MdOutlineNavigateBefore, MdOutlineNavigateNext } from "react-icons/md";
import { Box, Skeleton, Spinner } from "@chakra-ui/react";
import { MAIN_COLOR } from "../constants/color";
import { useRecoilState } from "recoil";
import issuesAtom from "../recoil/issues";
import { listRepositoryIssues } from "../apis/gitOpenApis";
import IssueItem from "../components/common/IssueItem";
import RepeatGridList from "../components/common/RepeatGridList";

const Issues = () => {
    const [issues, setIssues] = useRecoilState(issuesAtom);
    const [isLoading, setIsLoading] = useState(false);

    const handleChangePage = useCallback(
        async (page: number) => {
            if (issues.list[page] || !issues.owner || !issues.repositoryName) {
                await setIssues((prev) => {
                    return {
                        ...prev,
                        page: page,
                    };
                });
                return;
            }

            await setIsLoading(true);

            const issueList: any = await listRepositoryIssues({
                owner: issues.owner,
                repo: issues.repositoryName,
                page: page + 1,
            });

            await setIssues((prev) => {
                const nextList = [...prev.list];
                nextList[page] = issueList;
                return {
                    ...prev,
                    list: nextList,
                    page: page,
                };
            });
            await setIsLoading(false);
        },
        [issues, setIssues],
    );

    return (
        <Layout>
            <Box display={"flex"} flexDirection={"column"} height={"100%"}>
                <Box flex={1} paddingBottom={74}>
                    <RepeatGridList column={3}>
                        {issues.list[issues.page]?.map((item, index) => {
                            if (isLoading) {
                                return <Skeleton height={100} margin={4} padding={2} key={index} />;
                            } else {
                                return (
                                    <IssueItem
                                        key={index}
                                        id={item.id}
                                        html_url={item.html_url}
                                        user={item.user}
                                        title={item.title}
                                        updated_at={item.updated_at}
                                        number={item.number}
                                    />
                                );
                            }
                        })}
                    </RepeatGridList>
                </Box>
                <Box
                    p={4}
                    position={"fixed"}
                    width={"100%"}
                    bottom={0}
                    zIndex={1}
                    background={"#FFFFFF"}
                    borderTop={`1px solid ${MAIN_COLOR.LIGHT_GRAY}`}
                >
                    <Pagination
                        currentPage={issues.page}
                        totalItemCount={issues.open_issues_count}
                        perPage={15}
                        onChange={handleChangePage}
                        firstButton={<MdFirstPage />}
                        prevButton={<MdOutlineNavigateBefore />}
                        nextButton={<MdOutlineNavigateNext />}
                        lastButton={<MdLastPage />}
                        justifyContent={"center"}
                    />
                </Box>
            </Box>
        </Layout>
    );
};

export default Issues;
