import styled from "styled-components";

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
}

export const FlexItem = styled.div<FlexItemProps>`
    display: flex;
    flex: ${(props) => props.flex || "auto"};
    margin: 4px;
    height: 100%;
    min-width: ${(props) => props.minWidth};
    flex-direction: ${(props) => props.flexDirection};
    justify-content: ${(props) => props.justify};
    align-items: ${(props) => props.align};
    width: ${(props) => props.width};
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
export const Title = styled.div`
    max-width: 250px;
    width: fit-content;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
`;
