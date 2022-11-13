import React from "react";
import styled from "styled-components";
import LabelList from "./components/UI/organisms/LabelList";
import MemoList from "./components/UI/organisms/MemoList";
import OpenedMemo from "./components/UI/organisms/OpenedMemo";
import GlobalStyle from "./style/GlobalStyle";

const FlexContainer = styled.div`
    display: flex;
    justify-content: center;
    height: 100%;
`;

const MainContainer = styled.div`
    min-height: calc(100vh - (env(safe-area-inset-bottom, 0px)));
    padding-top: 30px;
    width: 100%;
    display: flex;
    flex-direction: column;
    max-width: 1320px;
    margin: 0px auto;
`;

const App: React.FC = () => {
    return (
        <>
            <GlobalStyle />
            <MainContainer>
                <FlexContainer>
                    <LabelList />
                    <MemoList />
                    <OpenedMemo />
                </FlexContainer>
            </MainContainer>
        </>
    );
};

export default App;
