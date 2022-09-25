import React, { useEffect, useState } from "react";
import { Pagination, PaginationProps } from "semantic-ui-react";

const PaginationComponent = ({ totalPage = 5, callback }: { totalPage: number; callback: (page: number) => void }) => {
    const [page, setPage] = useState(1);

    const handleChangePage = (event: React.MouseEvent<HTMLAnchorElement>, { activePage }: PaginationProps) => {
        console.log(activePage);
        setPage(activePage as number);
    };

    useEffect(() => {
        callback(page);
    }, [page]);

    return <Pagination activePage={page} onPageChange={handleChangePage} totalPages={totalPage} />;
};

export default PaginationComponent;
