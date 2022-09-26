import { Grid } from "@chakra-ui/react";
import React from "react";
import RepositoryItem from "./common/RepositoryItem";
import { useRecoilValue } from "recoil";
import repositoryAtom from "../recoil/repository";

const RepositoryList = () => {
    const repository = useRecoilValue(repositoryAtom);

    return (
        <Grid templateColumns="repeat(4, 1fr)">
            {repository.map((item, index) => (
                <RepositoryItem
                    key={index}
                    full_name={item.full_name}
                    description={item.description}
                    open_issues_count={item.open_issues_count}
                    stargazers_count={item.stargazers_count}
                />
            ))}
        </Grid>
    );
};

export default RepositoryList;
