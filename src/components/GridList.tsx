import React, { useCallback, useEffect, useRef, useState } from "react";
import { useRecoilState } from "recoil";
import repositoryAtom from "../recoil/repository";
import { Button, Grid, Icon, Item } from "semantic-ui-react";
import styled from "styled-components";
import { getRepositoryIssues, getUsersRepository } from "../api/main";
import useIntersectionObserver from "../hooks/useIntersectionObserver";
import { useToast } from "../hooks/useToast";

interface ColumnDataTypes {
    name: string;
    open_issues_count: number;
    description: string;
    owner: { login: string };
    id: number;
}

interface IGridExampleDividedPhrase {
    listItem: [];
    chunkSize: number;
}

const GridExampleDividedPhrase = ({ listItem, chunkSize = 3 }: IGridExampleDividedPhrase) => {
    const [isLoaded, setIsLoaded] = useState(false);
    const [repository, setRepository] = useRecoilState(repositoryAtom);

    const { fireToast } = useToast();

    const arrayChunk = (arr: any, n: number) => {
        if (!Array.isArray(arr)) return [];
        const array = arr.slice();
        const chunks = [];
        while (array.length) chunks.push(array.splice(0, n));
        return chunks;
    };

    const getMoreRepository = useCallback(async () => {
        if (!repository.username || isLoaded) return;
        setIsLoaded(true);
        const usersRepository = (await getUsersRepository({
            username: repository.username,
            page: repository.page + 1,
        })) as any;
        if (usersRepository.length === 0) return;

        console.log("🍓", repository.list);

        setRepository((prev) => ({
            ...prev,
            list: [...repository.list, ...(usersRepository as [])],
            page: repository.page + 1,
        }));
        setIsLoaded(false);
    }, [isLoaded, repository, getUsersRepository]);

    const { setTarget } = useIntersectionObserver({
        root: null,
        rootMargin: "20px",
        threshold: 0.5,
        callback: getMoreRepository,
    });

    const handleGetIssue = async (col: ColumnDataTypes) => {
        console.log(col);
        const issues = await getRepositoryIssues({ owner: col.owner.login, repo: col.name });
        console.log(issues);
    };

    const handleAddItem = async (event: React.MouseEvent<HTMLButtonElement>, col: ColumnDataTypes) => {
        console.log(col);

        let savedRepository: [{ username: string; data: any }] | never[];
        if (repository.savedRepository.some((v: { data: any }) => v.data.id === col.id)) {
            savedRepository = repository.savedRepository.filter((v: { data: any }) => v.data.id !== col.id);
        } else {
            if (repository.savedRepository.length === 4) {
                fireToast({ content: "레포지토리는 최대 4개까지만 저장 가능합니다." });
                return;
            }
            savedRepository = [...(repository.savedRepository as []), { username: repository.username, data: col }];
        }

        console.log(savedRepository);
        localStorage.setItem("savedRepository", JSON.stringify(savedRepository));
        setRepository((prev) => ({ ...prev, savedRepository: savedRepository } as any));
    };

    useEffect(() => {
        setIsLoaded(false);
    }, [repository]);

    return (
        <Grid columns={3}>
            {arrayChunk(listItem, chunkSize).map((row, i) => (
                <React.Fragment key={i + "row"}>
                    <GridRow>
                        {row.map((col: ColumnDataTypes, i) => (
                            <GridCol key={i + "col"}>
                                <StyledItem>
                                    <StyledHeader>
                                        <Span bold color={col.open_issues_count ? "#F66A3A" : "#8d8d8d"}>
                                            {col.open_issues_count} issues
                                        </Span>
                                        <div>
                                            <Button
                                                icon={
                                                    repository.savedRepository.some(
                                                        (v: { data: any }) => v?.data.id === col.id,
                                                    )
                                                        ? "minus"
                                                        : "add"
                                                }
                                                size={"mini"}
                                                color={
                                                    repository.savedRepository.some(
                                                        (v: { data: any }) => v?.data.id === col.id,
                                                    )
                                                        ? "red"
                                                        : "blue"
                                                }
                                                onClick={(event) => handleAddItem(event, col)}
                                            />
                                        </div>
                                    </StyledHeader>

                                    <Span bold>{col.name}</Span>
                                    <Span fontSize={12} color={"#8d8d8d"}>
                                        {col.description}
                                    </Span>
                                </StyledItem>
                            </GridCol>
                        ))}
                    </GridRow>
                    {!isLoaded && arrayChunk(listItem, chunkSize).length - 5 === i && <div ref={setTarget} />}
                </React.Fragment>
            ))}
        </Grid>
    );
};

const Label = styled.label<{ padding?: string; background?: string; color?: string; margin?: string }>`
    padding: ${(props) => props.padding || "4px 8px"};
    background: ${(props) => props.background || "#E5E5E5"};
    color: ${(props) => props.color || "white"};
    border-radius: 4px;
    font-size: 10px;
    font-weight: bold;
    margin: ${(props) => props.margin || "0px"};
    height: 28px;
`;

const Span = styled.span<{ bold?: boolean; margin?: string; fontSize?: number }>`
    display: flex;
    align-items: center;
    font-weight: ${(props) => (props.bold ? "bold" : "initial")};
    font-size: ${(props) => `${props.fontSize}px` || "initial"};
    color: ${(props) => props.color || "black"};
    margin: ${(props) => props.margin || "0px"};
`;

const GridRow = styled.div`
    display: flex;
    justify-content: space-around;
    width: 100%;
`;

const GridCol = styled.div`
    flex: 1;
    padding: 12px;
    overflow: hidden;
`;

const StyledHeader = styled.header`
    display: flex;
    justify-content: space-between;
    padding-bottom: 8px;
`;

const StyledItem = styled.div`
    border-radius: 8px;
    border: 1px solid;
    border-color: #e5e5e5;
    padding: 12px;
    height: 150px;
    &:hover {
        cursor: pointer;
        background: #eeeeee;
        border-color: #8d8d8d;
    }
    overflow: hidden;
`;

export default GridExampleDividedPhrase;
