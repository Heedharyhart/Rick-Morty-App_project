import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap";
import Filters from "./components/filters/Filters";
import Cards from "./components/cards/Cards";
import Pagination from "./components/pagination/Pagination";
import Search from "./components/search/Search";
import Navbar from "./components/Navbar/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Episodes from "./Pages/Episodes";
import Locations from "./Pages/Location";
import CardDetail from "./components/cards/CardDetail";

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
      </div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:id" element={<CardDetail />} />
        
        
        <Route path="/episodes" element={<Episodes />} />
        <Route path="/episodes/:id" element={<CardDetail />} />

        <Route path="/location" element={<Locations />} />
        <Route path="/location/:id" element={<CardDetail />} />
      </Routes>
    </Router>
  );
}
const Home = () => {
  let [pageNumber, setPageNumber] = useState(1);
  let [search, updateSearch] = useState("");
  let [status, setStatus] = useState("");
  let [gender, setGender] = useState("");
  let [species, setSpecies] = useState("");
  let [fetchedData, updateFetchedData] = useState([]);
  const { info, results } = fetchedData;

  let api = `https://rickandmortyapi.com/api/character/?page=${pageNumber}&name=${search}&status=${status}&gender=${gender}&species=${species}`;

  useEffect(() => {
    (async function () {
      let data = await fetch(api);
      let response = await data.json();
      updateFetchedData(response);
    })();
  }, [api]);
  return (
    <div className="App">
      <h1 className="text-center mb-4">Characters </h1>
      <Search updateSearch={updateSearch} setPageNumber={setPageNumber} />

      <div className="container">
        <div className="row">
          <Filters
            setStatus={setStatus}
            setPageNumber={setPageNumber}
            setGender={setGender}
            setSpecies={setSpecies}
          />
          <div className="col-lg-8 col-12">
            <div className="row">
              <Cards page="/" results={results} />
            </div>
          </div>
        </div>
      </div>
      <Pagination
        info={info}
        pageNumber={pageNumber}
        setPageNumber={setPageNumber}
      />
    </div>
  );
};

export default App;
