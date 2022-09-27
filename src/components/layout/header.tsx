import React, { useCallback, useState } from "react";
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
    Stack,
    Text,
    useDisclosure,
} from "@chakra-ui/react";
import {
    ArrowBackIcon,
    ArrowForwardIcon,
    AttachmentIcon,
    EmailIcon,
    InfoOutlineIcon,
    SearchIcon,
} from "@chakra-ui/icons";
import { useSetRecoilState } from "recoil";
import { BOX_SHADOW, MAIN_COLOR } from "../../constants/color";
import { HeaderBox } from "../styledComponents";
import { searchRepositories } from "../../apis/gitOpenApis";
import repositoryAtom from "../../recoil/repository";
import { Link } from "react-router-dom";

const Header = () => {
    const setRepository = useSetRecoilState(repositoryAtom);
    const [repositoryName, setRepositoryName] = useState("");
    const { isOpen, onOpen, onClose } = useDisclosure();

    const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        setRepositoryName(value);
    }, []);

    const handleSubmit = useCallback(
        async (e: React.MouseEvent<HTMLFormElement>) => {
            e.preventDefault();
            console.log(repositoryName);
            const repositories = (await searchRepositories({ name: repositoryName, page: 1 })) as any;
            console.log(repositories);
            setRepository((prev) => ({ ...prev, list: repositories.items, page: 1, name: repositoryName }));
            onClose();
            setRepositoryName("");
            window.scroll({ top: 0, left: 0, behavior: "smooth" });
        },
        [onClose, repositoryName, setRepository],
    );

    return (
        <HeaderBox>
            <Box width={"100%"} padding={"12px"} display={"flex"} justifyContent={"space-between"}>
                <Stack direction="row" spacing={4}>
                    <Link to={"/"}>
                        <Button leftIcon={<ArrowBackIcon />} colorScheme="teal" variant="outline">
                            Home
                        </Button>
                    </Link>
                    <Link to={"/issues"}>
                        <Button leftIcon={<InfoOutlineIcon />} colorScheme="yellow" variant="solid">
                            Issues
                        </Button>
                    </Link>
                    <Link to={"/bookmark"}>
                        <Button leftIcon={<AttachmentIcon />} colorScheme="teal" variant="solid">
                            Bookmark
                        </Button>
                    </Link>
                </Stack>
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
                            <form onSubmit={handleSubmit}>
                                <InputGroup>
                                    <InputLeftElement
                                        pointerEvents="none"
                                        children={<SearchIcon color={MAIN_COLOR.GREEN} />}
                                    />
                                    <Input
                                        type="text"
                                        value={repositoryName}
                                        onChange={handleChange}
                                        placeholder="레포지토리 이름을 입력하세요."
                                        width={"100%"}
                                        fontWeight={"bold"}
                                        border={"none"}
                                        outline={"none"}
                                        focusBorderColor={"transparent"}
                                    />
                                </InputGroup>
                            </form>
                        </Box>
                    </Container>
                </ModalContent>
            </Modal>
        </HeaderBox>
    );
};

export default Header;
