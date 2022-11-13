import React from "react";
import styled from "styled-components";

interface CheckBoxProps {
    id?: string;
    checked?: boolean;
    index?: number;
    type?: "checkbox";
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const StyledCheckBox = styled.input<CheckBoxProps>`
    accent-color: black;
    cursor: pointer;
`;

const CheckBox = ({ id, checked, index, onChange }: CheckBoxProps) => {
    return <StyledCheckBox type={"checkbox"} id={id} index={index} checked={checked} onChange={onChange} />;
};

export default CheckBox;
