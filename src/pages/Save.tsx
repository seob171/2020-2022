import React from "react";
import { useRecoilState } from "recoil";
import GridExampleDividedPhrase from "../components/GridList";
import Layout from "../components/layout/Layout";
import repositoryAtom from "../recoil/repository/atom";

interface ColumnDataTypes {
    name: string;
    open_issues_count: number;
    description: string;
    owner: { login: string };
    id: number;
}

const Home = () => {
    const [repository, setRepository] = useRecoilState(repositoryAtom);

    return (
        <Layout>
            <GridExampleDividedPhrase
                listItem={repository.savedRepository.map((v: { data: any }) => v.data) as []}
                chunkSize={1}
            />
        </Layout>
    );
};

export default Home;
