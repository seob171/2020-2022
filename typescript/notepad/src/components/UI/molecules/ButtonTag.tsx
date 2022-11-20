import React, { memo } from "react";
import { FlexItem } from "../../../style/Container";
import styled from "styled-components";
import Tag from "../atoms/Tag";

interface ButtonTagProps {
    children: React.ReactChild;
    onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const Button = styled.button`
    height: fit-content;
    border: none;
    height: auto;
    background: rgb(245, 245, 245);
    display: flex;
    border-radius: 4px;
    align-items: center;
    cursor: pointer;
    &:hover {
        svg {
            color: red;
        }
    }
`;

const Box = styled(FlexItem)`
    margin: 0px;
`;

const ButtonTag = ({ children, onClick }: ButtonTagProps) => {
    return (
        <Box>
            <Button onClick={onClick}>
                <Tag background={"transparent"}>{children}</Tag>❌
            </Button>
        </Box>
    );
};

export default memo(ButtonTag);
