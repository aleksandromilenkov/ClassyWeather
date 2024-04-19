import React from "react";
import { formatDay, getWeatherIcon } from "../Utils/utils";
class Day extends React.Component {
  render() {
    const { date, maxTemp, minTemp, code, isToday } = this.props;
    return (
      <li className="day">
        <span>{getWeatherIcon(code)}</span>
        <p>{isToday ? "Today" : formatDay(date)}</p>
        <p>
          {Math.round(minTemp)}&deg; &mdash;{" "}
          <strong>{Math.round(maxTemp)}</strong>&deg;
        </p>
      </li>
    );
  }
}
export default Day;
