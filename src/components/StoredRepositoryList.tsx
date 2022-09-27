import { Grid } from "@chakra-ui/react";
import React from "react";
import RepositoryItem from "./common/RepositoryItem";
import { useRecoilValue } from "recoil";
import storageAtom from "../recoil/storage";

const StoredRepositoryList = () => {
    const storage = useRecoilValue(storageAtom);

    return (
        <Grid templateColumns="repeat(4, 1fr)">
            {storage.map((item, index) => (
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
        </Grid>
    );
};

export default StoredRepositoryList;
