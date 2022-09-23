import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Button, Menu } from "semantic-ui-react";

interface ILinkButton {
    name: string;
    path: string;
}

const LinkButton = ({ name, path }: ILinkButton) => {
    const location = useLocation();

    return (
        <Link to={path}>
            <Button name={name} active={path === location.pathname}>
                {name}
            </Button>
        </Link>
    );
};

export default LinkButton;
