import React from "react";
import { FlexItem } from "../../../style/Container";
import Notepad from "../molecules/Notepad";

const OpenedMemo = () => {
    return (
        <FlexItem minWidth={"300px"}>
            <Notepad />
        </FlexItem>
    );
};

export default OpenedMemo;
