import React from "react";
import styles from "./Search.module.scss";

const Search = ({ updateSearch, setPageNumber }) => {
  return (
    <form className="d-flex flex-sm-row flex-column align-items-center justify-content-center gap-4 mb-5">
      <input
        placeholder="search for characters"
        type="text"
        onChange={(e) => {
          setPageNumber(1);
          updateSearch(e.target.value);
        }}
        className={styles.input}
      />
      <button
        className={`${styles.btn} btn btn-primary fs-5`}
        onClick={(e) => e.preventDefault()}
      >
        Search
      </button>
    </form>
  );
};

export default Search;
