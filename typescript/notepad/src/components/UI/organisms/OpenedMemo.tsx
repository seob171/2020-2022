import React, { memo } from "react";
import { useRecoilState } from "recoil";
import { isActive } from "../../../recoil/atoms/memoAtom";
import { FlexItem } from "../../../style/Container";
import Notepad from "../molecules/Notepad";

const OpenedMemo = () => {
    const [isActived, setIsActived] = useRecoilState(isActive);

    return isActived ? (
        <FlexItem minWidth={"300px"}>
            <Notepad />
        </FlexItem>
    ) : (
        <></>
    );
};

export default memo(OpenedMemo);
