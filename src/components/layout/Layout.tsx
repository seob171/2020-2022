import React from "react";
import styled from "styled-components";
import Footer from "./Footer";
import Header from "./Header";

const Layout = (props: { children: React.ReactNode }) => {
    return (
        <div>
            <Header />
            <Main>{props.children}</Main>
        </div>
    );
};

const Main = styled.main`
    padding-top: 79px;
`;

export default Layout;
