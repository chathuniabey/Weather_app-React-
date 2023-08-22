import React, { useEffect, useState } from 'react';
import './css/WeatherForcast.css'; // Import the CSS file


// Create a functional component named WeatherForecast
const WeatherForecast = () => {
  const [forecast, setForecast] = useState([]);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  // Use useEffect to fetch forecast data and update state
  useEffect(() => {
    const fetchForecastData = async () => {
      try {

        const today = new Date();
        const start = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1);
        const end = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 4);
        setStartDate(start);
        setEndDate(end);

        // Make API call to OpenWeather API for the forecast range
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/forecast?q=Colombo&appid=eadb43f62b4a7b2e0ee7af39458d7c3a&units=metric`
        );
        const data = await response.json();
        
        // Filter the forecast data to get data for specific days and times
        const filteredForecast = data.list.filter((item, index) => {
          const itemDate = new Date(item.dt * 1000);
          return itemDate >= start && itemDate <= end && index % 8 === 0;
        });

        // Update 'forecast' state with the filtered data
        setForecast(filteredForecast);

      } catch (error) {
        console.log(error);
      }
    };

    // Fetch forecast data when the component mounts
    fetchForecastData();
  }, []);


  // Display loading message if forecast data is not available yet
  if (forecast.length === 0) {
    return <div>Loading...</div>;
  }

  // Render the component's UI
  return (
      <div className="forecast-container">
        <h2 style={{color: "white"}}>Weather Forecast</h2>
        <div className="forecast-cards">
          {forecast.map((day) => (
              <div key={day.dt} className="weather-card">
                <h5>Date: {new Date(day.dt * 1000).toLocaleDateString()}</h5>
                <p>Time: {new Date(day.dt * 1000).toLocaleTimeString()}</p>
                <p>Day: {new Date(day.dt * 1000).toLocaleDateString(undefined, { weekday: 'long' })}</p>
                <p>Description: {day.weather[0].description}</p>
                <p>Humidity: {day.main.humidity}%</p>
                <p>Temperature: {day.main.temp}°C</p>
                <p>Wind Speed: {day.wind.speed} m/s</p>
              </div>
          ))}
        </div>
      </div>
  );
};

// Export the WeatherForecast component as the default export
export default WeatherForecast;
