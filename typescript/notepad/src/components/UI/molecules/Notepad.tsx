import React, { memo, useCallback, useEffect, useState } from "react";
import { Title, Date, FlexItem } from "../../../style/Container";
import styled from "styled-components";
import Button from "../atoms/Button";
import List from "./List";
import ListItem from "./ListItem";
import Tag from "../atoms/Tag";
import Input from "../atoms/Input";
import ButtonTag from "./ButtonTag";
import { useRecoilState } from "recoil";
import { currentMemoState, isActive, memoListState, totalMemoCount } from "../../../recoil/atoms/memoAtom";
import { createMemo, deleteMemo, updateMemo } from "../../../api/memoApi";
import { currentLabelState, labelListState } from "../../../recoil/atoms/labelAtom";
import { addMemosToLabel } from "../../../api/relationApi";
import { timeFormatter } from "../../../utils/timeFormatter";
import Form from "../atoms/Form";

const NotepadContainer = styled.div`
    border: 1px solid black;
    padding: 16px;
`;

const NotepadHeader = styled.div`
    width: 400px;
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
    margin: 0px 20px;
    padding: 20px 0px;
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
    const [currentMemo, setCurrentMemo] = useRecoilState(currentMemoState);
    const [totalMemoCnt, setTotalMemoCnt] = useRecoilState(totalMemoCount);
    const [labelList, setLabelList] = useRecoilState(labelListState);
    const [memoList, setMemoList] = useRecoilState(memoListState);
    const [currentLabel, setCurrentLabel] = useRecoilState(currentLabelState);
    const [isActived, setIsActived] = useRecoilState(isActive);

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [inputActive, setInputActive] = useState(false);

    const handleBlurInput = useCallback(() => {
        if (title !== "") setInputActive(false);
    }, [title]);

    const saveMemo = useCallback(async () => {
        if (currentMemo.id) {
            const res = await updateMemo({ id: currentMemo.id, title, content });
            setCurrentMemo(res.data);
            setMemoList((prev) =>
                prev.map((memo) => {
                    if (res.data.id === memo.id) return res.data;
                    else return memo;
                }),
            );
        } else {
            const res = await createMemo({ title, content });
            console.log("🐱 memo", res.data);
            setCurrentMemo(res.data);
            setTotalMemoCnt(totalMemoCnt + 1);
            setMemoList((prev) => [...prev, res.data]);
            if (currentLabel.id) {
                console.log("label!!!", currentLabel);
                await addMemosToLabel({ id: currentLabel.id, memoIds: [res.data.id] });
                setLabelList((prev) =>
                    prev.map((list) => {
                        if (list.id === currentLabel.id) return { ...list, memoCount: list.memoCount++ };
                        else return list;
                    }),
                );
            }
        }
    }, [currentMemo, totalMemoCnt, currentLabel, title, content]);

    const deleteMemoHandler = useCallback(async () => {
        if (currentMemo.id) {
            await deleteMemo({ id: currentMemo.id });
            setTotalMemoCnt(totalMemoCnt - 1);
            setMemoList((prev) => prev.filter((memo) => memo.id !== currentMemo.id));
            setTitle("");
            setContent("");
            setIsActived(false);
        }
    }, [currentMemo, totalMemoCnt]);

    const closeMemo = useCallback(async () => {
        setIsActived(false);
        setTitle("");
        setContent("");
        setCurrentMemo({});
    }, []);

    useEffect(() => {
        if (currentMemo.id) {
            setTitle(currentMemo.title!);
            setContent(currentMemo.content!);
            setInputActive(false);
        } else {
            setTitle("");
            setContent("");
            setInputActive(true);
        }
    }, [currentMemo]);

    return (
        <NotepadContainer>
            <NotepadHeader>
                {inputActive ? (
                    <Form
                        onSubmit={(e) => {
                            e.preventDefault();
                            handleBlurInput();
                        }}
                    >
                        <Input value={title} onChange={(e) => setTitle(e.target.value)} onBlur={handleBlurInput} />
                    </Form>
                ) : (
                    <Title size={"medium"} onClick={() => setInputActive(true)}>
                        {title}
                    </Title>
                )}
                <Date>Updated at {timeFormatter(currentMemo.updatedAt) || "-"}</Date>
                <List justify={"flex-start"}>
                    <ListItem>
                        <ButtonTag>remember</ButtonTag>
                    </ListItem>
                </List>
            </NotepadHeader>
            <NotepadContent value={content} onChange={(e) => setContent(e.target.value)} />

            <FlexItem height={"auto"} justify={"center"}>
                <Button onClick={saveMemo} margin={"0 8px 0 0 "}>
                    {currentMemo.id ? "UPDATE" : "CREATE"}
                </Button>
                {currentMemo.id && (
                    <Button onClick={deleteMemoHandler} margin={"0 8px 0 0 "}>
                        DELETE
                    </Button>
                )}
                <Button onClick={closeMemo}>CLOSE</Button>
            </FlexItem>
        </NotepadContainer>
    );
};

export default memo(Notepad);
