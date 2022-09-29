import React, { LegacyRef } from "react";
import { Tag, Tooltip } from "@chakra-ui/react";

const CustomCard = React.forwardRef(
    ({ children, ...rest }: { children: any }, ref: LegacyRef<HTMLSpanElement> | undefined) => (
        <Tag ref={ref} {...rest} background={"transparent"} padding={"0px"}>
            {children}
        </Tag>
    ),
);

const CustomToolTip = ({ children, tooltip }: { children: any; tooltip: string }) => (
    <Tooltip label={tooltip}>
        <CustomCard>{children}</CustomCard>
    </Tooltip>
);

export default CustomToolTip;
