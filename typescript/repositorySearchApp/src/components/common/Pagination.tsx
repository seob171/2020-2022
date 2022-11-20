import { Box, Button } from "@chakra-ui/react";
import React, { useCallback, useMemo, useState } from "react";
import { range } from "../../utils/arrayUtils";

interface PaginationImpl {
    currentPage: number;
    totalItemCount: number;
    perPage?: number;
    pageRangeDisplayed?: number;
    onChange: (page: number) => void;
    firstButton?: any;
    prevButton?: any;
    nextButton?: any;
    lastButton?: any;
    justifyContent?: "flex-start" | "center" | "flex-end";
}

const Pagination = ({
    currentPage,
    totalItemCount,
    perPage = 10,
    pageRangeDisplayed = 10,
    onChange,
    firstButton = "<<",
    prevButton = "<",
    nextButton = ">",
    lastButton = ">>",
    justifyContent = "flex-start",
}: PaginationImpl) => {
    const [innerCurrentPage, setInnerCurrentPage] = useState(currentPage);
    const numPages = useMemo(() => Math.ceil(totalItemCount / perPage), [perPage, totalItemCount]);
    const chapter = useMemo(
        () => Math.floor(innerCurrentPage / pageRangeDisplayed),
        [innerCurrentPage, pageRangeDisplayed],
    );

    const rangeSize = useMemo(() => {
        const lastRangeSize = numPages % pageRangeDisplayed;
        if (innerCurrentPage >= numPages - lastRangeSize) return lastRangeSize;
        else return pageRangeDisplayed;
    }, [innerCurrentPage, numPages, pageRangeDisplayed]);

    const pageRange = useMemo(
        () => range(rangeSize, chapter * pageRangeDisplayed),
        [chapter, pageRangeDisplayed, rangeSize],
    );

    const handleChangePage = useCallback(
        (page: number) => {
            setInnerCurrentPage(page);
            onChange(page);
        },
        [onChange],
    );

    return (
        <Box display={"flex"} justifyContent={justifyContent}>
            <PaginationButton onClick={() => handleChangePage(0)} disabled={innerCurrentPage === 0}>
                {firstButton}
            </PaginationButton>
            <PaginationButton onClick={() => handleChangePage(innerCurrentPage - 1)} disabled={innerCurrentPage === 0}>
                {prevButton}
            </PaginationButton>

            {pageRange.map((page) => (
                <PaginationButton key={page} onClick={() => handleChangePage(page)} active={page === innerCurrentPage}>
                    {page + 1}
                </PaginationButton>
            ))}
            <PaginationButton
                onClick={() => handleChangePage(innerCurrentPage + 1)}
                disabled={innerCurrentPage === numPages - 1}
            >
                {nextButton}
            </PaginationButton>
            <PaginationButton
                onClick={() => handleChangePage(numPages - 1)}
                disabled={innerCurrentPage === numPages - 1}
            >
                {lastButton}
            </PaginationButton>
        </Box>
    );
};

interface PaginationButtonImpl {
    children: any;
    onClick: () => void;
    disabled?: boolean;
    active?: boolean;
}

const PaginationButton = ({ children, onClick, disabled, active }: PaginationButtonImpl) => (
    <Button
        onClick={onClick}
        disabled={disabled}
        color={active ? "#FFFFFF" : "black"}
        size={"sm"}
        background={active ? "#1078ED" : "transparent"}
        _hover={{ background: active ? "#0C55F0" : "#99BEE8" }}
        borderRadius={50}
        margin={1}
    >
        {children}
    </Button>
);

export default Pagination;
