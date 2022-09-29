import { Grid, Skeleton } from "@chakra-ui/react";
import React, { useCallback, useEffect, useState } from "react";
import RepositoryItem from "./common/RepositoryItem";
import { useRecoilState } from "recoil";
import repositoryAtom from "../recoil/repository";
import useIntersectionObserver from "../hooks/useIntersectionObserver";
import { searchRepositories } from "../apis/gitOpenApis";

const RepositoryList = () => {
    const [isLoaded, setIsLoaded] = useState(false);
    const [isEnd, setIsEnd] = useState(false);

    const [repository, setRepository] = useRecoilState(repositoryAtom);

    const getMoreRepository = useCallback(async () => {
        if (!repository.name || isLoaded) return;
        setIsLoaded(true);
        const searchedRepository = (await searchRepositories({
            name: repository.name,
            page: repository.page + 1,
        })) as any;

        const isEnd = searchedRepository.items.length === 0;
        if (!isEnd) {
            setRepository((prev) => ({
                ...prev,
                list: [...repository.list, ...(searchedRepository.items as [])],
                page: repository.page + 1,
            }));
        }
        setIsEnd(isEnd);
        setIsLoaded(false);
    }, [isLoaded, repository.list, repository.name, repository.page, setRepository]);

    const { setTarget } = useIntersectionObserver({
        root: null,
        rootMargin: "20px",
        threshold: 0.5,
        callback: getMoreRepository,
    });

    const skeletonArray = Array.from({ length: 16 }, (v, i) => i); // i(index) 1씩 증가

    useEffect(() => {
        setIsEnd(false);
    }, [repository]);

    return (
        <Grid templateColumns="repeat(4, 1fr)">
            {repository.list.map((item, index) => (
                <React.Fragment key={index}>
                    <RepositoryItem
                        full_name={item.full_name}
                        description={item.description}
                        open_issues_count={item.open_issues_count}
                        stargazers_count={item.stargazers_count}
                        id={item.id}
                    />
                </React.Fragment>
            ))}
            {!isLoaded && !isEnd && <div ref={setTarget} />}
            {isLoaded &&
                !isEnd &&
                skeletonArray.map((item) => (
                    <Skeleton height={170} margin={4} key={item}>
                        <RepositoryItem
                            full_name={`${item}`}
                            description={`${item}`}
                            open_issues_count={item}
                            stargazers_count={item}
                            id={item}
                        />
                    </Skeleton>
                ))}
        </Grid>
    );
};

export default RepositoryList;
