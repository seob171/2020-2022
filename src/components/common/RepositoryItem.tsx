import { StarIcon } from "@chakra-ui/icons";
import { Box, Button, GridItem, Icon, Tag, TagLabel, TagLeftIcon, Text, useToast } from "@chakra-ui/react";
import React, { useCallback } from "react";
import { RiGitRepositoryFill } from "react-icons/ri";
import { BsBookmark, BsBookmarkFill, BsPatchExclamation } from "react-icons/bs";
import { useRecoilState } from "recoil";
import storageAtom from "../../recoil/storage";
import { LOCAL_STORAGE_KEY } from "../../recoil/storage/atom";

interface RepositoryItemProps {
    full_name: string;
    description: string;
    open_issues_count: number;
    stargazers_count: number;
    id: number;
}

const RepositoryItem = ({ full_name, description, open_issues_count, stargazers_count, id }: RepositoryItemProps) => {
    const toast = useToast();
    const [storage, setStorage] = useRecoilState(storageAtom);

    const handleBookmark = useCallback(() => {
        let nextItem;
        if (storage.some((prevItem) => prevItem.id === id)) {
            nextItem = storage.filter((prevItem) => prevItem.id !== id);
        } else {
            if (storage.length === 4) {
                toast({
                    title: "알림",
                    description: "레포지토리 등록 개수는 최대 4개로 제한됩니다.",
                    status: "error",
                    duration: 3000,
                    isClosable: true,
                    position: "bottom-right",
                });
                return;
            }
            nextItem = [...storage, { full_name, description, open_issues_count, stargazers_count, id }];
        }
        setStorage(nextItem);
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(nextItem));
    }, [description, full_name, id, open_issues_count, setStorage, stargazers_count, storage, toast]);

    // overflow-x: auto;
    // max-width: 100%;
    // width: 100%;
    // box-sizing: border-box;

    return (
        <GridItem width={"100%"} maxW={"100%"} overflowX={"auto"}>
            <Box height={150} margin={4} borderWidth="1px" borderRadius="lg" overflow="hidden">
                <Box
                    display="flex"
                    flexDirection={"column"}
                    height={"100%"}
                    justifyContent={"space-between"}
                    padding="3"
                >
                    <Box>
                        <Box
                            mt="1"
                            display={"flex"}
                            alignItems={"center"}
                            fontWeight="semibold"
                            as="h4"
                            lineHeight="tight"
                        >
                            <Icon as={RiGitRepositoryFill} mr={2} />
                            <Text noOfLines={1}>{full_name}</Text>
                        </Box>
                        <Box>
                            <Box as="span" color="gray.600" fontSize="sm" noOfLines={3}>
                                {description}
                            </Box>
                        </Box>
                    </Box>
                    <Box display={"flex"} width={"100%"} justifyContent={"space-between"}>
                        <Box display={"flex"} alignItems={"center"}>
                            <Tag size={"sm"} variant="outline" colorScheme="red" height={"12px"}>
                                <TagLeftIcon as={BsPatchExclamation} />
                                <TagLabel>issue : {open_issues_count}</TagLabel>
                            </Tag>
                        </Box>

                        <Box display="flex" alignItems="center">
                            <StarIcon color={"yellow.300"} fontSize={"12px"} />
                            <Box as="span" ml="2" fontWeight="semibold" color="gray.600" fontSize="sm">
                                {stargazers_count}
                            </Box>
                            <Button size={"sm"} ml={2} background={"transparent"} onClick={handleBookmark}>
                                <Icon
                                    as={storage.some((prevItem) => prevItem.id === id) ? BsBookmarkFill : BsBookmark}
                                />
                            </Button>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </GridItem>
    );
};

export default RepositoryItem;
