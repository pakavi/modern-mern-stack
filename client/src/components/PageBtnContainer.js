import React from "react";

import { UseAppContext } from "../context/appContext";

import Wrapper from "../assets/wrappers/PageBtnContainer";
import { HiChevronDoubleLeft, HiChevronDoubleRight } from "react-icons/hi";


const PageBtnContainer = () => {
  const { numOfPages, page, changePage } = UseAppContext();

  const pages = Array.from({ length: numOfPages }, (_, index) => index + 1);

  const prevPage = () => {
    let newPage = page - 1;
    if(newPage < 1) {
      newPage = 1;
    };
    changePage(newPage);
  };

  const nextPage = () => {
    let newPage = page + 1;
    if(newPage > numOfPages) {
      newPage = numOfPages;
    };
    changePage(newPage);
  };

  return (
    <Wrapper>
      <button className="prev-btn" onClick={prevPage}>
        <HiChevronDoubleLeft />
        prev
      </button>

      <div className="btn-container">
        {pages.map((pageNum) => {
          return (
            <button
              type="button"
              key={pageNum}
              className={`${pageNum === page}` ? "pageBtn active" : "pageBtn"}
              onClick={() => changePage(pageNum)}
              style={{ margin: "0.5rem" }}
            >
              {pageNum}
            </button>
          );
        })}
      </div>

      <button className="next-btn" onClick={nextPage}>
        next
        <HiChevronDoubleRight />
      </button>
    </Wrapper>
  );
};

export default PageBtnContainer;
