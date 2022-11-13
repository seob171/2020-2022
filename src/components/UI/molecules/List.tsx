import React, { memo } from "react";
import styled from "styled-components";

interface ListProps {
    children?: React.ReactNode;
    flexDirection?: "row" | "column";
}

const StyledList = styled.ul<ListProps>`
    display: flex;
    flex-direction: ${(props) => props.flexDirection};
    gap: 4px;
    margin: 0px;
    padding: 0px;
    flex-wrap: wrap;
    justify-content: space-evenly;
`;

const List = ({ children, flexDirection = "row" }: ListProps) => {
    return <StyledList flexDirection={flexDirection}>{children}</StyledList>;
};

export default memo(List);
