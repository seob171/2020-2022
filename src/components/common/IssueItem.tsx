import { Box, Image } from "@chakra-ui/react";
import React from "react";
import { IssuesListImpl } from "../../recoil/issues/atom";
import { MAIN_COLOR } from "../../constants/color";
import { useRecoilValue } from "recoil";
import issuesAtom from "../../recoil/issues";

const IssueItem = ({ id, html_url, user, title, updated_at, number }: IssuesListImpl) => {
    const issues = useRecoilValue(issuesAtom);

    return (
        <Box
            height={100}
            margin={4}
            borderWidth="1px"
            borderRadius="lg"
            overflow="hidden"
            borderColor={MAIN_COLOR.DEEP_GRAY}
            padding={2}
        >
            <Box as={"span"} fontSize={12} fontWeight={"bold"} color={MAIN_COLOR.GREEN}>
                {issues.repositoryName}
            </Box>
            <Box
                as={"a"}
                fontWeight={"bold"}
                fontSize={14}
                noOfLines={2}
                _hover={{ color: MAIN_COLOR.BLUE, cursor: "pointer" }}
                target={"_blank"}
                href={html_url}
            >
                {title}
            </Box>
            <Box as={"span"} fontSize={10} color={MAIN_COLOR.DEEP_GRAY}>{`#${number} 이슈가 ${updated_at
                .replace("T", "")
                .substring(0, 18)} 에 ${user.login}에 의해 오픈되었습니다.`}</Box>
            {/*<Box display={"flex"}>*/}
            {/*    <Image boxSize="2rem" borderRadius="full" src={user.avatar_url} alt="user avatar" mr="12px" />*/}
            {/*    <Box as="span" ml="2" fontWeight="bold" color={MAIN_COLOR.DARK_GREEN}>*/}
            {/*        {user.login}*/}
            {/*    </Box>*/}
            {/*</Box>*/}
            {/*<div>{html_url}</div>*/}
            {/*<div>{id}</div>*/}
        </Box>
    );
};

export default IssueItem;
