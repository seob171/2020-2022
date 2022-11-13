import React, { memo } from "react";
import styled from "styled-components";

interface ListProps {
    children?: React.ReactNode;
    flexDirection?: "row" | "column";
    justify?: string;
}

const StyledList = styled.ul<ListProps>`
    display: flex;
    flex-direction: ${(props) => props.flexDirection};
    gap: 4px;
    margin: 0px;
    padding: 0px;
    flex-wrap: wrap;
    justify-content: ${(props) => props.justify || "space-between"};
`;

const List = ({ children, flexDirection = "row", justify }: ListProps) => {
    return (
        <StyledList flexDirection={flexDirection} justify={justify}>
            {children}
        </StyledList>
    );
};

export default memo(List);
