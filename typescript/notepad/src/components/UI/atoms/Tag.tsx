import React, { memo } from "react";
import styled, { css } from "styled-components";

interface TagProps {
    children: React.ReactChild;
    onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
    width?: "fit-content" | "auto" | "100%";
    background?: string;
    active?: boolean;
}

const StyledTag = styled.div<TagProps>`
    font-size: 12px;
    line-height: 19px;
    font-weight: 400;
    font-family: Pretendard, -apple-system, BlinkMacSystemFont, system-ui, Roboto, "Helvetica Neue", "Segoe UI",
        "Apple SD Gothic Neo", "Noto Sans KR", "Malgun Gothic", "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol",
        sans-serif;
    color: rgb(100, 100, 100);
    padding: 2px 6px;
    background: ${(props) => props.background || "rgb(245, 245, 245)"};
    border-radius: 2px;
    width: ${(props) => props.width};
    ${(props) =>
        props.active &&
        css`
            border: 1px solid black;
        `}
`;

const Tag = ({ children, onClick, width = "fit-content", active, background = "rgb(245, 245, 245)" }: TagProps) => {
    return (
        <StyledTag onClick={onClick} active={active} width={width} background={background}>
            {children}
        </StyledTag>
    );
};

export default memo(Tag);
