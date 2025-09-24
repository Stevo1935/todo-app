"use client";
import React from "react";
interface PaginationProps {
  page: number;
  setPage: (page: number) => void;
  hasMore: boolean;
  total: number;
}
function Pagination({ page, setPage, hasMore }: PaginationProps) {
  return (
    <nav className="pagination" aria-label="Pagination">
      <button
        disabled={page === 1}
        onClick={() => setPage(page - 1)}
        aria-label="Previous page"
      >
        Previous
      </button>
      <span className="page-number" aria-label="Current page">
        {page}
      </span>
      <button
        disabled={!hasMore}
        onClick={() => setPage(page + 1)}
        aria-label="Next page"
      >
        Next
      </button>
    </nav>
  );
}

export default Pagination;
