import React, { useState, useEffect } from "react";
import Cards from "../components/cards/Cards";
import InputGroup from "../components/filters/category/InputGroup";

const Location = () => {
  let [id, setId] = useState(1);
  let [info, setInfo] = useState([]);
  let [results, setResults] = useState([]);
  let {name,type,dimension } = info;
  let api = `https://rickandmortyapi.com/api/location/${id}`;

  useEffect(() => {
    (async function () {
      let data = await fetch(api);
      let response = await data.json();
      setInfo(response);

      let getCharacters = await Promise.all(
        response.residents.map((x) => {
          return fetch(x).then((res) => res.json());
        })
      );
      setResults(getCharacters);
    })();
  }, [api]);
  return (
    <div className="container">
      <div className="row mb-4">
        <h1 className="text-center mb-4">
          Location :{" "}
          <span className="text-primary">{name === "" ? "Unknown" : name}</span>
        </h1>
        <h5 className="text-center">
          Dimension : {dimension === "" ? "Unknown" : dimension}
        </h5>
        <h6 className="text-center">
          Type : {type === "" ? "Unknown" : type}
        </h6>
      </div>
      <div className="row">
        <div className="col-lg-3 col-12">
          <h4 className="text-center mb-4">Pick Location </h4>
          <InputGroup setId={setId} name="Location" total={126} />
        </div>
        <div className="col-lg-8 col-12">
          <div className="row">
            <Cards page="/Location/" results={results} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Location;
