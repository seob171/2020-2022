import React, { memo } from "react";
import styled from "styled-components";

interface ListItemProps {
    children?: React.ReactNode;
}

const StyledListItem = styled.li<ListItemProps>`
    width: auto;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    margin: 2px 0px;
`;

const ListItem = ({ children }: ListItemProps) => {
    return <StyledListItem>{children}</StyledListItem>;
};

export default memo(ListItem);
