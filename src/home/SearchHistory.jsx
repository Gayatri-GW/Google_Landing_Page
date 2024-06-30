import React from "react";
import "./LandingPage.css";

function SearchHistory({ history }) {
  return (
    <div className="search-history">
      <h3>Search History</h3>
      <ul>
        {history.map((query, index) => (
          <li key={index}>{query}</li>
        ))}
      </ul>
    </div>
  );
}

export default SearchHistory;

