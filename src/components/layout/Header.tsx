import React, { useState } from "react";
import { Input, Menu } from "semantic-ui-react";
import styled from "styled-components";
import { getUser } from "../../api/main";

const Header = () => {
    const [activeItemName, setActiveItemName] = useState("home");
    const [search, setSearch] = useState("");

    const handleItemClick = (event: React.BaseSyntheticEvent) => {
        setActiveItemName(event.target.name);
    };

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(event.target.value);
    };

    const handleInputSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const user = await getUser({ username: search });
        console.log(user);
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
    padding: 10px;
`;

export default Header;
