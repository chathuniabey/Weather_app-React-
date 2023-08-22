import React from "react";
import './css/FrontPage.css'; // Import the CSS file
import WeatherSearch from "./WeatherSearch"; // Import the WeatherSearch component
import TodayWeather from "./TodayWeather"; // Import the TodayWeather component
import WeatherForecast from "./WeatherForecast";  // Import the WeatherForecast component
import ExtendedWeatherForecast from "./ExtendedWeatherForecast"; // Import the ExtendedWeatherForecast component

const FrontPage = () => {
    return (
        <div className="front-page">
            <WeatherSearch /> {/* Render the WeatherSearch component */}
            <TodayWeather /> {/* Render the TodayWeather component */}
            <WeatherForecast /> {/* Render the WeatherForecast component */}
            <ExtendedWeatherForecast /> {/* Render the ExtendedWeatherForecast component */}
        </div>
    );
};

// Export the FrontPage component as the default export
export default FrontPage;
