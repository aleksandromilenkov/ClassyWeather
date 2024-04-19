import React from "react";
import Day from "./Day";

class Weather extends React.Component {
  render() {
    const {
      temperature_2m_max: maxTemps,
      temperature_2m_min: minTemps,
      time: dates,
      weathercode: codes,
    } = this.props.weatherData;
    return (
      <div>
        <h2>Weather {this.props.location}</h2>
        <ul className="weather">
          {dates.map((date, idx) => (
            <Day
              date={date}
              maxTemp={maxTemps[idx]}
              minTemp={minTemps[idx]}
              code={codes[idx]}
              key={idx}
              isToday={idx === 0}
            />
          ))}
        </ul>
      </div>
    );
  }
}
export default Weather;
