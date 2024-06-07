import React, { FC } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "./ui/button";
import {
  Pagination as SHDPagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "./ui/pagination";

const Pagniation: FC<{
  NoData: boolean;
  isLoading:boolean;
  isNext:boolean;
}> = ({ NoData , isLoading , isNext}) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = +(searchParams.get("page") || 0);
  const changePaginationHandler = (page: number) => {
    setSearchParams(`?page=${page}`);
  };
  const isTherePreviousPages = currentPage > 1;
  if ( isLoading || NoData) return <></>;
  console.log(isNext)
  return (
    <SHDPagination>
      <PaginationContent className="flex items-center gap-8 mt-10">
        <PaginationItem>
          <PaginationNext
          disabled={!isNext}
            className="text-white p-3  shadow-sm border border-primary bg-primary rounded-radius_md max-w-fit"
            onClick={changePaginationHandler.bind(null, currentPage + 1)}
          />
        </PaginationItem>
        <PaginationItem>
          <PaginationPrevious
            disabled={!isTherePreviousPages}
            className="text-white p-3  shadow-sm border border-primary bg-primary rounded-radius_md max-w-fit"
            onClick={changePaginationHandler.bind(
              null,
              isTherePreviousPages ? currentPage - 1 : 0
            )}
          />
        </PaginationItem>
      </PaginationContent>
    </SHDPagination>
  );
};

export default Pagniation;
