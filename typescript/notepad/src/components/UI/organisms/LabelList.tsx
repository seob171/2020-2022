import React, { memo, useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import Axios from "../../../api/Core";
import { createLabel, findAllLabel } from "../../../api/labelApi";
import { findAllMemos } from "../../../api/memoApi";
import { currentLabelState, labelListState, LabelStateTypes } from "../../../recoil/atoms/labelAtom";
import { currentMemoState, isActive, totalMemoCount } from "../../../recoil/atoms/memoAtom";
import { FlexItem } from "../../../style/Container";
import Button from "../atoms/Button";
import Form from "../atoms/Form";
import Input from "../atoms/Input";
import Tag from "../atoms/Tag";
import List from "../molecules/List";
import ListItem from "../molecules/ListItem";

const LabelList = () => {
    const [value, setValue] = useState("");
    const [labelList, setLabelList] = useRecoilState(labelListState);
    const [currentLabel, setCurrentLabel] = useRecoilState(currentLabelState);
    const [totalMemoCnt, setTotalMemoCnt] = useRecoilState(totalMemoCount);
    const [isActived, setIsActived] = useRecoilState(isActive);
    const [currentMemo, setCurrentMemo] = useRecoilState(currentMemoState);

    /**************************************************
     * seob - active label 선택 메소드
     ***************************************************/
    const handleClickTag = useCallback(
        (list: LabelStateTypes | null) => () => {
            if (list) {
                setCurrentLabel(list);
                setCurrentMemo({});
            } else {
                setCurrentLabel({});
            }
        },
        [],
    );

    /**************************************************
     * seob - 새로운 label을 등록하는 함수
     ***************************************************/
    const AddLabel = useCallback(async () => {
        if (value !== "") {
            const res = await createLabel({ title: value });
            console.log(res);
            setLabelList((prev) => [...prev, res.data]);
            setValue("");
        }
    }, [value]);

    /**************************************************
     * seob - 초기 label 데이터 설정
     ***************************************************/
    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await findAllLabel({});
                setLabelList(res.data);
            } catch (err) {
                console.log(err);
            }
        };
        fetchData();
    }, []);

    return (
        <FlexItem flex={1} flexDirection={"column"}>
            <FlexItem justify={"space-between"}>
                <Form onSubmit={(e) => e.preventDefault()}>
                    <Input value={value} onChange={(e) => setValue(e.target.value)} placeholder={"Label Name"} />
                    <Button type={"submit"} onClick={AddLabel}>
                        ADD
                    </Button>
                </Form>
            </FlexItem>

            <List flexDirection={"column"}>
                <ListItem key={"totalList"}>
                    <Tag
                        width={"100%"}
                        active={!currentLabel.id}
                        onClick={handleClickTag(null)}
                    >{`TOTAL (${totalMemoCnt})`}</Tag>
                </ListItem>
                {labelList.map((list) => (
                    <ListItem key={list.id}>
                        <Tag
                            width={"100%"}
                            active={list.id === currentLabel.id}
                            onClick={handleClickTag(list)}
                        >{`${list.title} (${list.memoCount})`}</Tag>
                    </ListItem>
                ))}
            </List>
        </FlexItem>
    );
};

export default memo(LabelList);
