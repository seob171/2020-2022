import { Grid, GridItem } from "@chakra-ui/react";
import React, { ReactNode } from "react";

interface RepeatGridListImpl {
    children: ReactNode[] | any[];
    column?: number;
}

const RepeatGridList = ({ children, column = 4 }: RepeatGridListImpl) => {
    return (
        <Grid templateColumns={`repeat(${column}, 1fr)`}>
            {React.Children.map(children, (child) =>
                React.cloneElement(
                    <GridItem width={"100%"} maxW={"100%"} overflowX={"auto"}>
                        {child}
                    </GridItem>,
                ),
            )}
        </Grid>
    );
};

export default RepeatGridList;
