import React, { memo } from "react";
import styled, { css } from "styled-components";

interface InputProps {
    type?: "text" | "number" | "email";
    borderRadius?: "none" | "small" | "medium";
    margin?: string | number;
    value?: string | number;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
    placeholder?: string;
}

const StyledInput = styled.input<InputProps>`
    font-size: 14px;
    line-height: 24px;
    font-weight: 400;
    font-family: Pretendard, -apple-system, BlinkMacSystemFont, system-ui, Roboto, "Helvetica Neue", "Segoe UI",
        "Apple SD Gothic Neo", "Noto Sans KR", "Malgun Gothic", "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol",
        sans-serif;
    width: 100%;
    color: rgb(33, 35, 34);
    background: none;
    outline: none;

    margin: ${(props) => props.margin};
    padding: 8px 16px;
    border: 1px solid black;
    height: 35px;
    width: auto;

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
        `}
`;

const Input = ({ value, onChange, placeholder, borderRadius = "none", margin, type = "text", onBlur }: InputProps) => {
    return (
        <StyledInput
            autoFocus
            value={value}
            placeholder={placeholder}
            onChange={onChange}
            borderRadius={borderRadius}
            margin={margin}
            onBlur={onBlur}
        />
    );
};

export default memo(Input);
