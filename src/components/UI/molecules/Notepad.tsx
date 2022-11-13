import React from "react";
import { Title, Date, FlexItem } from "../../../style/Container";
import styled from "styled-components";
import Button from "../atoms/Button";
import List from "./List";
import ListItem from "./ListItem";
import Tag from "../atoms/Tag";
import Input from "../atoms/Input";
import ButtonTag from "./ButtonTag";

const NotepadContainer = styled.div`
    border: 1px solid black;
    padding: 16px;
`;

const NotepadHeader = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    gap: 12px;
    border-bottom: 1px solid rgb(235, 235, 235);
    padding: 20px 0px;
    margin: 0px 20px;
`;
const NotepadContent = styled.textarea`
    position: relative;
    display: flex;
    flex-direction: column;
    gap: 12px;
    resize: none;
    flex: 1;
    margin: 0;
    padding: 8px;
    width: -webkit-fill-available;
    height: 100%;
    border: none;
    outline: none;
    min-height: 400px;
    background: white;
    font-family: Pretendard, -apple-system, BlinkMacSystemFont, system-ui, Roboto, "Helvetica Neue", "Segoe UI",
        "Apple SD Gothic Neo", "Noto Sans KR", "Malgun Gothic", "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol",
        sans-serif;
    height: auto;
`;

const Notepad = () => {
    return (
        <NotepadContainer>
            <NotepadHeader>
                <FlexItem>
                    <Button margin={"0 8px 0 0 "}>SAVE</Button>
                    <Button>DELETE</Button>
                </FlexItem>
                <Title>리멤버 웹 개발자</Title>
                <Input value={"리멤버 웹 개발자"} />
                <Date>수정일 2022 11 13</Date>
                <List>
                    <ListItem>
                        <ButtonTag>helo</ButtonTag>
                    </ListItem>
                    <ListItem>
                        <Tag>hello</Tag>
                    </ListItem>
                    <ListItem>
                        <Tag>hello</Tag>
                    </ListItem>

                    <ListItem>
                        <Tag>hello</Tag>
                    </ListItem>
                    <ListItem>
                        <Tag>hello</Tag>
                    </ListItem>
                    <ListItem>
                        <Tag>hello</Tag>
                    </ListItem>
                </List>
            </NotepadHeader>
            <NotepadContent>
                claksdjflaksdjflaksdjflas asldkfjasldkfjasdlkfjsa alskdjflaskdfjlskadjflaksdjf
            </NotepadContent>
        </NotepadContainer>
    );
};

export default Notepad;
