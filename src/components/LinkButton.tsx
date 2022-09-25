import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Button, Icon, Label, Menu } from "semantic-ui-react";

interface ILinkButton {
    name: string;
    path: string;
    labelNum?: number;
}

const LinkButton = ({ name, path, labelNum }: ILinkButton) => {
    const location = useLocation();

    return (
        <Link to={path}>
            <Menu.Item active={path === location.pathname}>
                {name}
                {Boolean(labelNum) && (
                    <Label color="red" floating>
                        {labelNum}
                    </Label>
                )}
            </Menu.Item>
        </Link>
        // <Link to={path}>
        //     <Button name={name} active={path === location.pathname}>
        //         {name}
        //         <Label color="red" floating>
        //             22
        //         </Label>
        //     </Button>
    );
};

export default LinkButton;
