import React, { useEffect, useState } from 'react';
import './css/TodayWeather.css';  // Import the CSS file


// Create a functional component named TodayWeather
const TodayWeather = () => {

  // Initialize state variable using useState hook
  const [weather, setWeather] = useState(null);

  // Use useEffect to fetch today's weather data and update state
  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        // Make API call to OpenWeather API
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=Colombo&appid=eadb43f62b4a7b2e0ee7af39458d7c3a&units=metric`
        );
        const data = await response.json();

        // Update 'weather' state with received data
        setWeather(data);
      } catch (error) {
        console.log(error);
      }
    };

    // Fetch weather data when the component mounts
    fetchWeatherData();
  }, []);

  // Display loading message if weather data is not available yet
  if (!weather) {
    return <div>Loading...</div>;
  }


    // Render the component's UI
    return (
        <div className="weather-container">
            <div className="weather-card">
                <h2>Today's Weather in Colombo</h2>
                <p className="weather-description">Description: {weather.weather[0].description}</p>
                <p>Humidity: {weather.main.humidity}%</p>
                <p>Temperature: {weather.main.temp}°C</p>
                <p>Wind Speed: {weather.wind.speed} m/s</p>
            </div>
        </div>
    );
};

// Export the TodayWeather component as the default export
export default TodayWeather;
