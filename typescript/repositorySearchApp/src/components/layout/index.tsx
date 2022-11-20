import React from "react";
import Header from "./header";
import { LayoutBox, MainBox } from "../styledComponents";

const Layout = (props: { children: React.ReactNode }) => {
    return (
        <LayoutBox>
            <Header />
            <MainBox>{props.children}</MainBox>
        </LayoutBox>
    );
};

export default Layout;
