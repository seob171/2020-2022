import React, { memo } from "react";
import styled, { css } from "styled-components";

interface ButtonProps {
    borderRadius?: "none" | "small" | "medium";
    onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
    children: React.ReactChild | string;
    margin?: string;
    type?: "button" | "submit";
}

const StyledButton = styled.button<ButtonProps>`
    display: flex;
    flex-direction: row;
    -webkit-box-pack: center;
    justify-content: center;
    -webkit-box-align: center;
    align-items: center;
    box-sizing: border-box;
    cursor: pointer;
    font-weight: 400;
    color: rgb(255, 255, 255);
    height: 35px;
    font-size: 16px;
    min-width: 116px;
    padding: 0px 24px;
    border: 1px solid rgb(33, 35, 34);
    background-color: rgb(33, 35, 34);
    cursor: pointer;
    margin: ${(props) => props.margin};
    ${(props) =>
        props.borderRadius === "none" &&
        css`
            border-radius: none;
        `}
    ${(props) =>
        props.borderRadius === "small" &&
        css`
            border-radius: 4px;
        `}
        ${(props) =>
        props.borderRadius === "medium" &&
        css`
            border-radius: 8px;
        `};
`;

const Button = ({ children, type, onClick, margin, borderRadius }: ButtonProps) => {
    return (
        <StyledButton type={type} margin={margin} onClick={onClick} borderRadius={borderRadius}>
            {children}
        </StyledButton>
    );
};

export default memo(Button);
