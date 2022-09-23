import React, { useState } from "react";
import { useRecoilState } from "recoil";
import { Input, Menu } from "semantic-ui-react";
import styled from "styled-components";
import { getUsersRepository } from "../../api/main";
import repositoryAtom from "../../recoil/repository";

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
            const usersRepository = (await getUsersRepository({ username: search, page: repository.page })) as any;
            setRepository((prev) => ({ ...prev, list: usersRepository, page: 1, username: search }));
        } catch (err) {
            console.log();
        }
    };

    return (
        <StyledHeader>
            <Menu secondary>
                <Menu.Item name="home" active={activeItemName === "home"} onClick={handleItemClick} />
                <Menu.Item name="messages" active={activeItemName === "messages"} onClick={handleItemClick} />
                <Menu.Item name="friends" active={activeItemName === "friends"} onClick={handleItemClick} />
                <Menu.Menu position="right">
                    <form onSubmit={handleInputSubmit}>
                        <Menu.Item>
                            <Input icon="search" value={search} onChange={handleInputChange} placeholder="Search..." />
                        </Menu.Item>
                    </form>
                    <Menu.Item name="logout" active={activeItemName === "logout"} onClick={handleItemClick} />
                </Menu.Menu>
            </Menu>
        </StyledHeader>
    );
};

const StyledHeader = styled.header`
    position: fixed;
    top: 0;
    width: 100%;
    padding: 10px;
    background: white;
    border-bottom: 1px solid #e5e5e5;
`;

export default Header;
