import React, { useState, useEffect } from "react";
import Cards from "../components/cards/Cards";
import InputGroup from "../components/filters/category/InputGroup";

const Episodes = () => {
  let [id, setId] = useState(1);
  let [info, setInfo] = useState([]);
  let [results, setResults] = useState([]);
  let { air_date, name } = info;
  let api = `https://rickandmortyapi.com/api/episode/${id}`;

  useEffect(() => {
    (async function () {
      let data = await fetch(api);
      let response = await data.json();
      setInfo(response);

      let getCharacters = await Promise.all(
        response.characters.map((x) => {
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
          Episode :{" "}
          <span className="text-primary">{name === "" ? "Unknown" : name}</span>
        </h1>
        <h5 className="text-center">
          Air Date {air_date === "" ? "Unknown" : air_date}
        </h5>
      </div>
      <div className="row">
        <div className="col-lg-3 col-12">
          <h4 className="text-center mb-4">Pick Episode</h4>
          <InputGroup setId={setId} name="Episode" total={52} />
        </div>
        <div className="col-lg-8 col-12">
          <div className="row">
            <Cards page="/episodes/" results={results} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Episodes;
