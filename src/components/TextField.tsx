import React, { useState } from "react";
import styled from "styled-components";
import { Input, Container, Form } from "semantic-ui-react";
import { getRepositoryIssues } from "../api/main";

const TextFieldComponent = () => {
    const [name, setName] = useState("");

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setName(event.target.value);
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log(name);

        const res = await getRepositoryIssues({ owner: "microsoft", repo: name });
        console.log(res);
    };

    return (
        <Container textAlign={"center"}>
            <Form onSubmit={handleSubmit}>
                <StyledInput value={name} onChange={handleChange} placeholder="레포지토리 이름을 입력하세요" />
            </Form>
        </Container>
    );
};

const StyledInput = styled(Input)`
    width: 300px;
`;

export default TextFieldComponent;
