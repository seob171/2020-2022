import React from "react";
import { useRecoilState } from "recoil";
import GridExampleDividedPhrase from "../components/GridList";
import Layout from "../components/layout/Layout";
import repositoryAtom from "../recoil/repository/atom";

const Home = () => {
    const [repository, setRepository] = useRecoilState(repositoryAtom);

    return (
        <Layout>
            <GridExampleDividedPhrase listItem={repository.list as []} chunkSize={3} />
        </Layout>
    );
};

export default Home;
