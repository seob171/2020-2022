import React from "react";
import Header from "./header";
import { MainBox } from "../styledComponents";

const Layout = (props: { children: React.ReactNode }) => {
    return (
        <div>
            <Header />
            <MainBox>{props.children}</MainBox>
        </div>
    );
};

export default Layout;
