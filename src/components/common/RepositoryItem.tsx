import { StarIcon } from "@chakra-ui/icons";
import { Badge, Box, GridItem, Icon, Text } from "@chakra-ui/react";
import React from "react";
import { RiGitRepositoryFill } from "react-icons/ri";

interface RepositoryItemProps {
    full_name: string;
    description: string;
    open_issues_count: number;
    stargazers_count: number;
}

const RepositoryItem = ({ full_name, description, open_issues_count, stargazers_count }: RepositoryItemProps) => {
    return (
        <GridItem width={"100%"}>
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
                    <Box display={"flex"} width={"100%"} justifyContent={"space-between"} alignItems={"flex-end"}>
                        <Box display={"flex"}>
                            <Badge borderRadius="full" px="2" colorScheme={open_issues_count ? "red" : "gray"} mr={2}>
                                issue
                            </Badge>
                            <Badge borderRadius="full" px="2" colorScheme={open_issues_count ? "red" : "gray"}>
                                {open_issues_count}
                            </Badge>
                        </Box>
                        <Box display="flex" alignItems="center">
                            <StarIcon color={"yellow.300"} fontSize={"12px"} />
                            <Box as="span" ml="2" fontWeight="semibold" color="gray.600" fontSize="sm">
                                {stargazers_count}
                            </Box>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </GridItem>
    );
};

export default RepositoryItem;
