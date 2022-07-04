import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { EmojioneV4 } from "react-emoji-render";

function BreweryList() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false); // Is the data loading?
  const [input, setInput] = useState(""); // User input for brewery query
  const [breweries, setBreweries] = useState([]); // Array of breweries that will be set after fetching
  const [emptyResult, setEmptyResult] = useState(false); // Is the fetch result empty?

  useEffect(() => {
    fetch("https://api.openbrewerydb.org/breweries")
      .then((response) => response.json())
      .then((data) => {
        setLoading(true);
        setTimeout(function () {
          // If the response of the data array is empty
          if (data.length < 1) {
            setEmptyResult(true); // NO results for the query
          }
          setBreweries(data.slice(10)); // Set the breweries array from the response
          setLoading(false); // Set the loading state back to false
        }, 500);
      })
      .catch((error) => {
        console.error(error.message);
        alert("There was an error fetching the data");
      });
  }, []);

  /**
   * Query for the breweries from the Open Brewery DB API and set those results
   * inside the state (breweries).
   */
  const getBreweries = () => {
    fetch(`https://api.openbrewerydb.org/breweries/search?query=${input}`)
      .then((response) => response.json())
      .then((data) => {
        setLoading(true);
        setTimeout(function () {
          // If the response of the data array is empty
          if (data.length < 1) {
            setEmptyResult(true); // NO results for the query
          }
          setBreweries(data.slice(10)); // Set the breweries array from the response
          setLoading(false); // Set the loading state back to false
        }, 500);
      })
      .catch((error) => {
        console.error(error.message);
        alert("There was an error fetching the data");
      });
  };

  /**
   * Handle clearing the results. Clears up the state for
   * the breweries array, the results boolean, and the input string.
   */
  const handleClearingResults = () => {
    setBreweries([]);
    setEmptyResult(false);
    setInput("");
  };

  // Display the breweries as list item in alphabetical order by name of brewery.
  const breweriesArr = breweries
    .sort(function (a, b) {
      if (a.name < b.name) {
        return -1;
      }
      if (a.name > b.name) {
        return 1;
      }
      return 0;
    })
    .map((brewery) => (
      <>
        <li
          className="list-item"
          key={brewery.id}
          onClick={() => {
            navigate("/breweries/" + brewery.id);
          }}
        >
          <div className="list-item-title">
            <EmojioneV4 style={{ fontSize: "1.5em" }} text=":beer:" />
            <h3>{brewery.name}</h3>
          </div>
          <div className="list-item-title">
            <EmojioneV4 style={{ fontSize: "1.5em" }} text=":round_pushpin:" />
            <p className="lead">{brewery.city + ", " + brewery.state}</p>
          </div>
        </li>
      </>
    ));

  return (
    <>
      <main>
        <p className="text-center my-0">
          Search for breweries based off keywords.
        </p>
        <div className="search-bar-container">
          <div className="input-group mb-0">
            <input
              type="text"
              value={input}
              placeholder="Search breweries..."
              aria-label="Search"
              className="form-control"
              onChange={(e) => setInput(e.target.value)}
            />
            <button
              className="btn btn-dark mx-1"
              type="button"
              id="button-addon1"
              data-ripple-color="dark"
              onClick={getBreweries}
            >
              Search
            </button>
            <button
              className="btn btn-danger"
              type="button"
              id="button-addon2"
              data-ripple-color="dark"
              onClick={handleClearingResults}
            >
              Reset
            </button>
          </div>
        </div>
        <div className="results-container">
          {loading && (
            <div className="spinner-border" role="status">
              <span className="sr-only">Loading...</span>
            </div>
          )}
          {!loading && <ul className="list">{breweries && breweriesArr}</ul>}
          {emptyResult === true && (
            <p className="lead text-center">NO RESULTS</p>
          )}
        </div>
      </main>
    </>
  );
}

export default BreweryList;
