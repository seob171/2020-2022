import React from "react";
import {
    Box,
    Button,
    Container,
    Input,
    InputGroup,
    InputLeftElement,
    Modal,
    ModalContent,
    ModalOverlay,
    Text,
    useDisclosure,
} from "@chakra-ui/react";

import { SearchIcon } from "@chakra-ui/icons";
import { BOX_SHADOW, MAIN_COLOR } from "../../constants/color";
import { HeaderBox } from "../styledComponents";

const Header = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();

    return (
        <HeaderBox>
            <Box width={"100%"} padding={"12px"} display={"flex"} justifyContent={"center"}>
                <Button
                    onClick={onOpen}
                    boxShadow={BOX_SHADOW.MAIN}
                    background={"white"}
                    width={"300px"}
                    _hover={{ background: "white" }}
                    color={"gray"}
                    display={"flex"}
                    justifyContent={"flex-start"}
                >
                    <SearchIcon color={"gray"} marginRight={"4px"} fontSize={"12px"} />
                    <Text fontSize={"12px"}>레포지토리 이름을 입력하세요.</Text>
                </Button>
            </Box>
            <Modal onClose={onClose} isOpen={isOpen} size={"xl"}>
                <ModalOverlay />
                <ModalContent>
                    <Container>
                        <Box padding={"12px"}>
                            <InputGroup>
                                <InputLeftElement
                                    pointerEvents="none"
                                    children={<SearchIcon color={MAIN_COLOR.GREEN} />}
                                />
                                <Input
                                    type="text"
                                    placeholder="레포지토리 이름을 입력하세요."
                                    width={"100%"}
                                    fontWeight={"bold"}
                                    border={"none"}
                                    outline={"none"}
                                    focusBorderColor={"transparent"}
                                />
                            </InputGroup>
                        </Box>
                    </Container>
                </ModalContent>
            </Modal>
        </HeaderBox>
    );
};

export default Header;
