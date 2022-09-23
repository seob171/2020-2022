import React, { useCallback, useEffect, useRef, useState } from "react";
import { useRecoilState } from "recoil";
import repositoryAtom from "../recoil/repository";
import { Grid, Item } from "semantic-ui-react";
import styled from "styled-components";
import { getUsersRepository } from "../api/main";
import useIntersectionObserver from "../hooks/useIntersectionObserver";

const GridExampleDividedPhrase = () => {
    const [isLoaded, setIsLoaded] = useState(false);
    const [repository, setRepository] = useRecoilState(repositoryAtom);

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
        threshold: 0,
        callback: getMoreRepository,
    });

    return (
        <Grid columns={3}>
            {arrayChunk(repository.list, 3).map((row, i) => (
                <GridRow key={i}>
                    {row.map(
                        (
                            col: {
                                name: string;
                                full_name: string;
                                has_issues: boolean;
                                stargazers_count: number;
                                language: string;
                                description: string;
                            },
                            i,
                        ) => (
                            <GridCol key={i}>
                                <StyledItem>
                                    {/*<Item.Image size="tiny" src="/images/wireframe/image.png" />*/}

                                    <Item.Content>
                                        <StyledHeader>
                                            {col.has_issues && (
                                                <Label background={"#3099E7"} margin={"0px 8px 0px 0px"}>
                                                    ISSUE
                                                </Label>
                                            )}
                                            <Span bold>{col.name}</Span>
                                        </StyledHeader>
                                        <Item.Description>{col.description}</Item.Description>

                                        <Item.Meta>
                                            <span className="price">{col.language}</span>
                                            <span className="stay">{col.stargazers_count}</span>
                                        </Item.Meta>
                                    </Item.Content>
                                </StyledItem>
                            </GridCol>
                        ),
                    )}
                </GridRow>
            ))}
            {!isLoaded && <div ref={setTarget} />}
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
`;

const Span = styled.span<{ bold?: boolean; margin?: string }>`
    display: flex;
    align-items: center;
    font-weight: ${(props) => (props.bold ? "bold" : "initial")};
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
    // justify-content: space-between;
    padding-bottom: 4px;
`;

const StyledItem = styled.div`
    border-radius: 8px;
    border: 1px solid;
    border-color: #e5e5e5;
    padding: 12px;
    height: 150px;
    &:hover {
        cursor: pointer;
        background: #b5d9f3;
    }
    overflow: hidden;
`;

export default GridExampleDividedPhrase;
