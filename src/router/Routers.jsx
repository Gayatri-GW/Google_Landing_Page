import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import LandingPage from "../home/LandingPage";
import SearchHistoryPage from "../home/SearchHistory";

export default function Routers() {
  const [searchHistory, setSearchHistory] = useState(
    JSON.parse(localStorage.getItem("searchHistory")) || []
  );
  return (
    <BrowserRouter>
      <Routes>
        <Route path="" element={<LandingPage />} />
        <Route
          path=""
          element={<SearchHistoryPage history={searchHistory} />}
        />
      </Routes>
    </BrowserRouter>
  );
}
