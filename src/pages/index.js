import React, { useState } from "react";

const CustomPagination = ({ total, onPageChange }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = total;

  const handlePageChange = (page) => {
    setCurrentPage(page);
    onPageChange(page);
  };

  const getPaginationItems = () => {
    const items = [];

    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) {
        items.push(i);
      }
    } else {
      items.push(1);

      if (currentPage <= 4) {
        for (let i = 2; i <= 5; i++) {
          items.push(i);
        }
        items.push("...");
        items.push(totalPages);
      } else if (currentPage >= totalPages - 3) {
        items.push("...");
        for (let i = totalPages - 4; i <= totalPages; i++) {
          items.push(i);
        }
      } else {
        items.push("...");
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          items.push(i);
        }
        items.push("...");
        items.push(totalPages);
      }
    }

    return items;
  };

  const paginationItems = getPaginationItems();

  return (
    <div className="pagination-container">
      <div className="pagination">
        <button
          className="pagination-button-arr"
          onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
          disabled={currentPage === 1}
        >
          Prev
        </button>

        {paginationItems.map((item, index) => (
          <button
            key={index}
            className={`pagination-button ${
              currentPage === item ? "active" : ""
            }`}
            onClick={() => typeof item === "number" && handlePageChange(item)}
            disabled={item === "..."}
          >
            {item}
          </button>
        ))}

        <button
          className="pagination-button-arr"
          onClick={() =>
            handlePageChange(Math.min(totalPages, currentPage + 1))
          }
          disabled={currentPage === totalPages}
        >
          next
        </button>
      </div>

      <style jsx>{`
        .pagination-container {
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        .pagination {
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .pagination-button {
          padding: 8px 16px;
          border: 1px solid #ccc;
          border-radius: 4px;
          cursor: pointer;
          background-color: white;
          transition: background-color 0.2s;
        }
        .pagination-button:hover {
          background-color: #f0f0f0;
        }
        .pagination-button.active {
          background-color: #6200ea;
          color: white;
          border: none;
        }
        .pagination-button:disabled {
          cursor: not-allowed;
          opacity: 0.5;
        }
        .total-pages {
          margin-top: 10px;
          font-size: 14px;
          color: #333;
        }
      `}</style>
    </div>
  );
};

export default function App() {
  const handlePageChange = (page) => {
    console.log(`Page changed to: ${page}`);
  };

  return (
    <div>
      <h1>My Pagination Example</h1>
      <CustomPagination total={20} onPageChange={handlePageChange} />
    </div>
  );
}
