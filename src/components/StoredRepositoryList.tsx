import React from "react";
import RepositoryItem from "./common/RepositoryItem";
import { useRecoilValue } from "recoil";
import storageAtom from "../recoil/storage";
import RepeatGridList from "./common/RepeatGridList";

const StoredRepositoryList = () => {
    const storage = useRecoilValue(storageAtom);

    return (
        <RepeatGridList>
            {storage.map((item, index) => (
                <RepositoryItem
                    key={index}
                    full_name={item.full_name}
                    description={item.description}
                    open_issues_count={item.open_issues_count}
                    stargazers_count={item.stargazers_count}
                    id={item.id}
                />
            ))}
        </RepeatGridList>
    );
};

export default StoredRepositoryList;
