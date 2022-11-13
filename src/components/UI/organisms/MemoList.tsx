import React, { memo, useCallback, useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import Axios from "../../../api/Core";
import { deleteLabelApi, updateLabel } from "../../../api/labelApi";
import { findAllMemos, getMemo } from "../../../api/memoApi";
import { BASE_URL } from "../../../Constant";
import { currentLabelState, labelListState, LabelStateTypes } from "../../../recoil/atoms/labelAtom";
import { currentMemoState, isActive, memoListState, MemoStateType, totalMemoCount } from "../../../recoil/atoms/memoAtom";
import { FlexItem, Title } from "../../../style/Container";
import Button from "../atoms/Button";
import Form from "../atoms/Form";
import Input from "../atoms/Input";
import List from "../molecules/List";
import ListItem from "../molecules/ListItem";
import MemoItem from "../molecules/MemoItem";

const MemoList = () => {
    const [labelList, setLabelList] = useRecoilState(labelListState);
    const [memoList, setMemoList] = useRecoilState(memoListState);
    const [currentLabel, setCurrentLabel] = useRecoilState(currentLabelState);
    const [currentMemo, setCurrentMemo] = useRecoilState(currentMemoState);
    const [isActived, setIsActived] = useRecoilState(isActive);
    const [totalMemoCnt, setTotalMemoCnt] = useRecoilState(totalMemoCount);

    const [value, setValue] = useState(currentLabel.title);
    const [inputActive, setInputActive] = useState(false);

    /**************************************************
     * seob - label 이름 update 메소드
     ***************************************************/
    const labelNameUpdate = useCallback(async () => {
        if (value) {
            try {
                if (currentLabel.title !== value) {
                    await updateLabel({
                        id: currentLabel.id,
                        title: value,
                    });
                    setCurrentLabel((prev) => ({ ...prev, title: value }));
                    setLabelList((prev) =>
                        prev.map((v) => {
                            if (v.id === currentLabel.id) {
                                return { ...v, title: value };
                            } else {
                                return v;
                            }
                        }),
                    );
                }
                setInputActive(false);
            } catch (err) {
                console.log(err);
            }
        }
    }, [currentLabel, value]);

    /**************************************************
     * seob - label 삭제 메소드
     ***************************************************/
    const deleteLabel = useCallback(async () => {
        if (currentLabel.id) {
            try {
                await deleteLabelApi({ id: currentLabel.id });
                setLabelList((prev) => prev.filter((label) => label.id !== currentLabel.id));
                setCurrentLabel({});
            } catch (err) {
                console.log(err);
            }
        }
    }, [currentLabel]);

    const handleClickTitle = useCallback(() => {
        if (currentLabel.id) setInputActive(true);
    }, [currentLabel]);

    const openNotepad = useCallback(() => {
        setIsActived(true);
        setCurrentMemo({});
    }, []);

    const memoItemClick = useCallback(
        (memo: MemoStateType) => () => {
            setCurrentMemo(memo);
            setIsActived(true);
        },
        [],
    );

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (currentLabel.id) {
                    const res = await getMemo({ id: currentLabel.id });
                    setMemoList(res.data);
                } else {
                    const res = await findAllMemos({});
                    setTotalMemoCnt(res.data.length);
                    setMemoList(res.data);
                }
            } catch (err) {
                setMemoList([]);
            }
        };
        setValue(currentLabel.title);
        fetchData();
    }, [currentLabel]);

    return (
        <FlexItem minWidth={"500px"} flexDirection={"column"}>
            <FlexItem align={"center"}>
                {inputActive ? (
                    <Form
                        onSubmit={(e) => {
                            e.preventDefault();
                            labelNameUpdate();
                        }}
                    >
                        <Input value={value} onChange={(e) => setValue(e.target.value)} onBlur={labelNameUpdate} />
                    </Form>
                ) : (
                    <Title onClick={handleClickTitle}>{currentLabel.title || "TOTAL"}</Title>
                )}
                <FlexItem flex={1} justify={"flex-end"}>
                    <Button onClick={openNotepad} margin={"0 8px 0 0"}>
                        NEW MEMO
                    </Button>
                    {currentLabel.id && <Button onClick={deleteLabel}>DELETE</Button>}
                </FlexItem>
            </FlexItem>
            {memoList.length === 0 && (
                <FlexItem height={"300px"} justify={"center"} align={"center"} border={"1px solid"}>
                    <Title size={"medium"}>메모가 없습니다.</Title>
                </FlexItem>
            )}
            <List justify={"flex-start"}>
                {memoList.map((memo) => (
                    <ListItem key={memo.id}>
                        <MemoItem
                            onClick={memoItemClick(memo)}
                            title={memo.title}
                            content={memo.content}
                            date={memo.createdAt}
                        />
                    </ListItem>
                ))}
            </List>
        </FlexItem>
    );
};

export default memo(MemoList);
