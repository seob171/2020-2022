import React from "react";
import { useRecoilState } from "recoil";
import GridSavedList from "../components/GridSavedList";
import Layout from "../components/layout/Layout";
import repositoryAtom from "../recoil/repository/atom";

interface ColumnDataTypes {
    name: string;
    open_issues_count: number;
    description: string;
    owner: { login: string };
    id: number;
}

const Save = () => {
    const [repository, setRepository] = useRecoilState(repositoryAtom);

    return (
        <Layout>
            <GridSavedList
                listItem={repository.savedRepository.map((v: { data: any }) => v.data) as []}
                chunkSize={1}
            />
        </Layout>
    );
};

export default Save;
