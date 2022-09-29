import React, { useState } from "react";
import Pagination from "../components/common/Pagination";
import Layout from "../components/layout/index";
import { MdFirstPage, MdLastPage, MdOutlineNavigateBefore, MdOutlineNavigateNext } from "react-icons/md";
import { Box } from "@chakra-ui/react";

const Issues = () => {
    const [currentPage, setCurrentPage] = useState(0);

    return (
        <Layout>
            <Box display={"flex"} flexDirection={"column"} height={"100%"}>
                <Box flex={1}>리스트</Box>
                <Box mb={4}>
                    <Pagination
                        currentPage={currentPage}
                        totalItemCount={100}
                        perPage={4}
                        pageRangeDisplayed={7}
                        onChange={(number) => setCurrentPage(number)}
                        firstButton={<MdFirstPage />}
                        prevButton={<MdOutlineNavigateBefore />}
                        nextButton={<MdOutlineNavigateNext />}
                        lastButton={<MdLastPage />}
                        justifyContent={"center"}
                    />
                </Box>
            </Box>
        </Layout>
    );
};

export default Issues;
