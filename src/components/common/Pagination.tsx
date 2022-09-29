import { Box, Button } from "@chakra-ui/react";
import React, { useMemo } from "react";

interface PaginationImpl {
    currentPage: number;
    totalItemCount: number;
    perPage: number;
    pageRangeDisplayed: number;
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
    perPage,
    pageRangeDisplayed,
    onChange,
    firstButton = "<<",
    prevButton = "<",
    nextButton = ">",
    lastButton = ">>",
    justifyContent = "flex-start",
}: PaginationImpl) => {
    const numPages = useMemo(() => Math.ceil(totalItemCount / perPage), [perPage, totalItemCount]);
    const chapter = useMemo(() => Math.floor(currentPage / pageRangeDisplayed), [currentPage, pageRangeDisplayed]);

    const rangeSize = useMemo(() => {
        const lastRangeSize = numPages % pageRangeDisplayed;
        if (currentPage >= numPages - lastRangeSize) return lastRangeSize;
        else return pageRangeDisplayed;
    }, [currentPage, numPages, pageRangeDisplayed]);

    function range(size: number, start = 0): number[] {
        return Array.from({ length: size }, (_, index) => index + start);
    }

    const pageRange = useMemo(
        () => range(rangeSize, chapter * pageRangeDisplayed),
        [chapter, pageRangeDisplayed, rangeSize],
    );

    return (
        <Box display={"flex"} justifyContent={justifyContent}>
            <PaginationButton onClick={() => onChange(0)} disabled={currentPage === 0}>
                {firstButton}
            </PaginationButton>
            <PaginationButton onClick={() => onChange(currentPage - 1)} disabled={currentPage === 0}>
                {prevButton}
            </PaginationButton>

            {pageRange.map((page) => (
                <PaginationButton key={page} onClick={() => onChange(page)} active={page === currentPage}>
                    {page + 1}
                </PaginationButton>
            ))}
            <PaginationButton onClick={() => onChange(currentPage + 1)} disabled={currentPage === numPages - 1}>
                {nextButton}
            </PaginationButton>
            <PaginationButton onClick={() => onChange(numPages - 1)} disabled={currentPage === numPages - 1}>
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
