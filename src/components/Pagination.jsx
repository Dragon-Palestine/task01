import React, { memo } from "react";

const Pagination = memo(
  ({
    currentPage,
    totalPages,
    goToPage,
    goToNextPage,
    goToPreviousPage,
    isLoading = false,
  }) => {
    if (totalPages <= 1) return null;

    const getPageNumbers = () => {
      const pages = [];
      const maxVisiblePages = 5;
      let startPage = Math.max(
        1,
        currentPage - Math.floor(maxVisiblePages / 2),
      );
      let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

      if (endPage - startPage + 1 < maxVisiblePages) {
        startPage = Math.max(1, endPage - maxVisiblePages + 1);
      }

      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }

      return pages;
    };

    return (
      <div className="pagination">
        <button
          className="pagination-btn"
          onClick={goToPreviousPage}
          disabled={currentPage === 1 || isLoading}
        >
          Previous
        </button>

        {getPageNumbers().map((page) => (
          <button
            key={page}
            className={`pagination-btn ${page === currentPage ? "active" : ""}`}
            onClick={() => goToPage(page)}
            disabled={isLoading}
          >
            {page}
          </button>
        ))}

        <button
          className="pagination-btn"
          onClick={goToNextPage}
          disabled={currentPage === totalPages || isLoading}
        >
          {isLoading ? "Loading..." : "Next"}
        </button>
      </div>
    );
  },
);

export default Pagination;
