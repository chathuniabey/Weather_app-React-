import React, { useState } from 'react';
import './css/ExtendedWeatherForecast.css'; // Import the CSS file

// Create a functional component named ExtendedWeatherForecast
const ExtendedWeatherForecast = () => {

  // Initialize state variables using useState hook
  const [showExtendedForecast, setShowExtendedForecast] = useState(false);
  const [extendedForecast, setExtendedForecast] = useState([]);

  // Define a function to handle the "View More" button click
  const handleViewMore = async () => {
    try {
      // Make API call to OpenWeather API for a 7-day forecast
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=Colombo&appid=eadb43f62b4a7b2e0ee7af39458d7c3a&units=metric`
      );
      const data = await response.json();

      // Extract the forecast for the entire week
       const forecastForWeek = data.list.filter((item, index) => index % 8 === 0);
      //const weekForecast = data.list;
      // Update 'extendedForecast' state with the received data
      setExtendedForecast(forecastForWeek);
      setShowExtendedForecast(!showExtendedForecast);

    } catch (error) {
      console.log(error);
    }
  };

  // Render the component's UI
  return (
      <div className="extended-weather-container">
        <h2 style={{color: "white"}}>Extended Weather Forecast</h2>
        <div className="forecast-cards">
          {/* Display extended forecast if 'showExtendedForecast' is true */}
          {showExtendedForecast && extendedForecast.map((day) => (
              <div key={day.dt} className="weather-card">
                <h5>Date: {new Date(day.dt * 1000).toLocaleDateString()}</h5>
                <p>Day: {new Date(day.dt * 1000).toLocaleDateString(undefined, { weekday: 'long' })}</p>
                <p>Description: {day.weather[0].description}</p>
                <p>Humidity: {day.main.humidity}%</p>
                <p>Temperature: {day.main.temp}°C</p>
                <p>Wind Speed: {day.wind.speed} m/s</p>
              </div>
          ))}
        </div>

        {/* Toggle "View More" button based on 'showExtendedForecast' */}
        {showExtendedForecast ? (
            <button onClick={() => setShowExtendedForecast(false)}>View Less</button>
        ) : (
            <div className="view-more-button">
              <button onClick={handleViewMore}>View More</button>
            </div>
        )}
      </div>
  );


};

// Export the ExtendedWeatherForecast component as the default export
export default ExtendedWeatherForecast;
