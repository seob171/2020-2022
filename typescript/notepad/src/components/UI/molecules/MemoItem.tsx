import React, { memo } from "react";
import styled from "styled-components";
import { Date, Title } from "../../../style/Container";
import { timeFormatter } from "../../../utils/timeFormatter";

const Content = styled.div`
    font-size: 14px;
    line-height: 24px;
    font-weight: 400;
    font-family: Pretendard, -apple-system, BlinkMacSystemFont, system-ui, Roboto, "Helvetica Neue", "Segoe UI",
        "Apple SD Gothic Neo", "Noto Sans KR", "Malgun Gothic", "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol",
        sans-serif;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 300px;
    width: 100%;
    margin-bottom: 12px;
`;

const MemoItemContainer = styled.div`
    width: 320px;
    min-height: 120px;
    border-radius: 4px;
    border: 1px solid rgb(33, 35, 34);
    cursor: pointer;
    padding: 20px;
    margin: 8px 0px;
`;

const TitleContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 8px;
`;

interface MemoItemProps {
    title: string;
    date: string;
    content: string;
    onClick: (e: React.MouseEvent<HTMLDivElement>) => void;
}

const MemoItem = ({ onClick, title, date, content }: MemoItemProps) => {
    return (
        <MemoItemContainer onClick={onClick}>
            <TitleContainer>
                <Title>{title}</Title>
                <Date>Created at {timeFormatter(date)}</Date>
            </TitleContainer>
            <Content>{content}</Content>
        </MemoItemContainer>
    );
};

export default memo(MemoItem);
