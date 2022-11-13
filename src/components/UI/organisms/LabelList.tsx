import React from "react";
import { FlexItem } from "../../../style/Container";
import Button from "../atoms/Button";
import Input from "../atoms/Input";
import Tag from "../atoms/Tag";
import List from "../molecules/List";
import ListItem from "../molecules/ListItem";

const LabelList = () => {
    return (
        <FlexItem flex={1} flexDirection={"column"}>
            <FlexItem justify={"space-between"}>
                <Input placeholder={"Label Name"} />
                <Button>ADD</Button>
            </FlexItem>

            <List flexDirection={"column"}>
                <ListItem>
                    <Tag width={"100%"}>hello</Tag>
                </ListItem>
            </List>
        </FlexItem>
    );
};

export default LabelList;
