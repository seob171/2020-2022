import styled, { css } from "styled-components";

interface FlexItemProps {
    color?: string;
    gridColumn?: string;
    gridRow?: string;
    minWidth?: string;
    flex?: number | string;
    flexDirection?: "row" | "column";
    justify?: string;
    align?: string;
    width?: string;
    height?: string;
    border?: string;
}

export const FlexItem = styled.div<FlexItemProps>`
    display: flex;
    flex: ${(props) => props.flex || "auto"};
    margin: 4px;
    height: ${(props) => props.height || "100%"};
    min-width: ${(props) => props.minWidth};
    flex-direction: ${(props) => props.flexDirection};
    justify-content: ${(props) => props.justify};
    align-items: ${(props) => props.align};
    width: ${(props) => props.width};
    border: ${(props) => props.border};
`;

export const Date = styled.div`
    font-size: 12px;
    line-height: 20px;
    font-weight: 400;
    font-family: Pretendard, -apple-system, BlinkMacSystemFont, system-ui, Roboto, "Helvetica Neue", "Segoe UI",
        "Apple SD Gothic Neo", "Noto Sans KR", "Malgun Gothic", "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol",
        sans-serif;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    color: #818e9c;
`;
export const Title = styled.div<{ size?: "small" | "medium" | "large" }>`
    max-width: 250px;
    width: fit-content;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    font-size: ${(props) => props.size};
    ${(props) =>
        props.size === "small" &&
        css`
            font-size: 24px;
        `}
    ${(props) =>
        props.size === "medium" &&
        css`
            font-size: 32px;
        `}
        ${(props) =>
        props.size === "large" &&
        css`
            font-size: 40px;
        `}
`;
