import React, { useState } from "react";
import { useRecoilState } from "recoil";
import { Input, Menu } from "semantic-ui-react";
import styled from "styled-components";
import { getUsersRepository } from "../../api/main";
import repositoryAtom from "../../recoil/repository";
import LinkButton from "../LinkButton";

const Header = () => {
    const [repository, setRepository] = useRecoilState(repositoryAtom);

    const [activeItemName, setActiveItemName] = useState("home");
    const [search, setSearch] = useState("microsoft");

    const handleItemClick = (event: React.BaseSyntheticEvent) => {
        setActiveItemName(event.target.name);
    };

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(event.target.value);
    };

    const handleInputSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            if (repository.username === search) return;
            const usersRepository = (await getUsersRepository({ username: search, page: 1 })) as any;
            setRepository((prev) => ({ ...prev, list: usersRepository, page: 1, username: search }));
        } catch (err) {
            console.log();
        }
    };

    return (
        <StyledHeader>
            <StyledMenu>
                <LinkButton name={"home"} path={"/"} />
                <LinkButton name={"issue"} path={"/issue"} />
                <LinkButton name={"save"} path={"/save"} labelNum={repository.savedRepository.length} />
            </StyledMenu>
            <form onSubmit={handleInputSubmit}>
                <Menu.Item>
                    <Input
                        action={{ icon: "search" }}
                        value={search}
                        onChange={handleInputChange}
                        placeholder="Search..."
                    />
                </Menu.Item>
            </form>
        </StyledHeader>
    );
};

const StyledHeader = styled.header`
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: fixed;
    top: 0;
    width: 100%;
    padding: 10px;
    background: white;
    border-bottom: 1px solid #e5e5e5;
    z-index: 1;
`;

const StyledMenu = styled(Menu)`
    margin: 10px 0px !important;
`;

export default Header;
