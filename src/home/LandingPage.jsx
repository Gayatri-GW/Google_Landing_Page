import React, { useState, useEffect } from "react";
import axios from "axios";
import "./LandingPage.css";

function LandingPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchHistory, setSearchHistory] = useState([]);
  const [showHistory, setShowHistory] = useState(false);
  const [showContent, setShowContent] = useState(true); // To control buttons and weather visibility
  const [weather, setWeather] = useState(null);

  const API_KEY = "5e693a640b871f02165cba4a294eaf36";

  useEffect(() => {
    const history = JSON.parse(localStorage.getItem("searchHistory")) || [];
    setSearchHistory(history);

    // Get user's location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        fetchWeather(latitude, longitude);
      });
    }
  }, []);

  const fetchWeather = async (lat, lon) => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`
      );
      setWeather(response.data);
    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
  };

  const handleSearch = () => {
    if (searchQuery.trim() === "") return;

    const updatedHistory = [searchQuery, ...searchHistory].slice(0, 10); // Store only the latest 10 searches
    localStorage.setItem("searchHistory", JSON.stringify(updatedHistory));
    setSearchHistory(updatedHistory);
    setSearchQuery("");
    setShowHistory(true); // Show the history when a search is performed
    setShowContent(true); // Show the buttons and weather when a search is performed
  };

  const handleLogoClick = () => {
    setShowContent(true);
    setShowHistory(false);
  };

  const handleSearchBarClick = () => {
    setShowHistory(true);
    setShowContent(false);
  };

  return (
    <div className="landing-page">
      <div className="logo" onClick={handleLogoClick}>
        <img
          src="https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_92x30dp.png"
          alt="Google"
        />
      </div>
      <div className="search-bar">
        <input
          type="text"
          className="search-input"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search Google or type a URL"
          onClick={handleSearchBarClick}
        />
      </div>

      {showContent && (
        <>
          <div className="buttons">
            <button className="search-button" onClick={handleSearch}>
              Google Search
            </button>
            <button className="lucky-button" onClick={handleSearch}>
              I'm Feeling Lucky
            </button>
          </div>
          {weather && (
            <div className="weather">
              <h2>Weather</h2>
              <p>{weather.name}</p>
              <p>{weather.weather[0].description}</p>
              <p>{weather.main.temp}°C</p>
            </div>
          )}
        </>
      )}

      {showHistory && (
        <div className="search-history">
          <h3>Search History</h3>
          <ul>
            {searchHistory.map((query, index) => (
              <li key={index}>{query}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default LandingPage;
