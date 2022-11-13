import React from "react";
import styled from "styled-components";

interface FormProps {
    children: React.ReactNode;
    align: "left" | "center" | "right";
    onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

const StyledForm = styled.form<FormProps>`
    width: 100%;
    display: flex;
    -webkit-box-align: center;
    align-items: center;
`;

const Form = ({ children, align = "center", onSubmit }: FormProps) => {
    return (
        <StyledForm onSubmit={onSubmit} align={align}>
            {children}
        </StyledForm>
    );
};

export default Form;
