import React, { useState } from 'react';
import './css/WeatherSearch.css'; // Import the CSS file


// Create a functional component named WeatherSearch
const WeatherSearch = () => {

  // Initialize state variables using useState hook
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [weather, setWeather] = useState(null);

  // Define a function to handle the search button click
  const handleSearch = async () => {
    try {
      // Make API call to OpenWeather API based on entered latitude and longitude
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=eadb43f62b4a7b2e0ee7af39458d7c3a&units=metric`
      );
      const data = await response.json();

      // Update 'weather' state with the received data
      setWeather(data);
    } catch (error) {
      console.log(error);
    }
  };


  // Render the component's UI
  return (
      <div className="page-container">
        <div className="navbar">
          <h2>Weather Search</h2>
          <div className="search-container">
            <input
                type="text"
                placeholder="Latitude"
                value={latitude}
                onChange={(e) => setLatitude(e.target.value)}  // Update latitude state on input change
            />
            <input
                type="text"
                placeholder="Longitude"
                value={longitude}
                onChange={(e) => setLongitude(e.target.value)}  // Update longitude state on input change
            />
            <button onClick={handleSearch} class="custom-button">Search</button>
          </div>
        </div>

        {weather && (
            <div className="weather-details-container">
              <h3>Weather at {weather.name}</h3>
              <p>
                {latitude}° N, {longitude}° W
              </p>
              <p>Time: {new Date(weather.dt * 1000).toLocaleTimeString()}</p>
              <p>
                Day:{' '}
                {new Date(weather.dt * 1000).toLocaleDateString(undefined, {
                  weekday: 'long'
                })}
              </p>
              <p>Humidity: {weather.main.humidity}%</p>
              <p>Temperature: {weather.main.temp}°C</p>
              <p>Wind Speed: {weather.wind.speed} m/s</p>
              <button onClick={() => setWeather(null)}>Close</button>
            </div>
        )}
      </div>
  );
};

// Export the WeatherSearch component as the default export
export default WeatherSearch;
