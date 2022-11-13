import React from "react";
import { FlexItem } from "../../../style/Container";
import Button from "../atoms/Button";
import Input from "../atoms/Input";
import List from "../molecules/List";
import ListItem from "../molecules/ListItem";
import MemoItem from "../molecules/MemoItem";

const MemoList = () => {
    return (
        <FlexItem minWidth={"500px"} flexDirection={"column"}>
            <FlexItem align={"center"}>
                <Input value={"라벨이름이다"} />
                <FlexItem flex={1} justify={"flex-end"}>
                    <Button margin={"0 8px 0 0"}>NEW</Button>
                    <Button>DELETE</Button>
                </FlexItem>
            </FlexItem>
            <List>
                <ListItem>
                    <MemoItem />
                </ListItem>
                <ListItem>
                    <MemoItem />
                </ListItem>
                <ListItem>
                    <MemoItem />
                </ListItem>
                <ListItem>
                    <MemoItem />
                </ListItem>
            </List>
        </FlexItem>
    );
};

export default MemoList;
