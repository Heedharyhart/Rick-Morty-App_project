import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";

const Pagination = ({ info, setPageNumber, pageNumber }) => {
  let [width, setWidth] = useState(window.innerWidth);

  let updateDimension = () => {
    setWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener("resize", updateDimension);
    return () => window.removeEventListener("resize", updateDimension);
  }, []);
  // let next = () => {
  //   setPageNumber((x) =>x + 1 )
  // }

  // let prev = () => {
  //   if(pageNumber === 1) return;
  //   setPageNumber((x) =>x - 1 )
  // }

  return (
    <>
    <style jsx>
    {`
      @media(max-width: 768px){
        .next, .prev{
          display:none;
        }
        .pagination{
          font-size:14px;
        }

      }
    `
    }
    </style>
      <ReactPaginate
        forcePage={pageNumber === 1 ? 0 : pageNumber - 1}
        className="pagination justify-content-center gap-4 my-4"
        nextLabel="Next"
        previousLabel="Prev"
        nextClassName="btn btn-primary page-item"
        nextLinkClassName="page-link"
        previousClassName="btn btn-primary page-item"
        previousLinkClassName="page-link"
        pageClassName="page-item"
        pageLinkClassName="page-link"
        marginPagesDisplayed ={width <  576 ? 1 : 2}
        pageRangeDisplayed={width <  576 ? 1 : 2}
        onPageChange={(data) => {
          setPageNumber(data.selected + 1);
        }}
        activeclassName="active"
        
        pageCount={info?.pages}
      />
    </>
  );
};

export default Pagination;
