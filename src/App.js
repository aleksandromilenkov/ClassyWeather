import React from "react";
import { convertToFlag, getWeather, getWeatherIcon } from "./Utils/utils";
import Weather from "./Components/Weather";
import Input from "./Components/Input";

class App extends React.Component {
  state = {
    location: localStorage.getItem("city"),
    isLoading: false,
    displayLocation: "",
    weather: {},
  };

  fetchWeather = async () => {
    this.setState({ isLoading: true });
    if (this.state.location === "") {
      this.setState({
        location: "",
        isLoading: false,
        displayLocation: "",
        weather: {},
      });
      return;
    }
    try {
      // 1) Getting location (geocoding)
      const geoRes = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${this.state.location}`
      );
      const geoData = await geoRes.json();

      if (!geoData.results) throw new Error("Location not found");

      const { latitude, longitude, timezone, name, country_code } =
        geoData.results.at(0);
      this.setState({
        displayLocation: `${name} ${convertToFlag(country_code)}`,
      });
      // 2) Getting actual weather
      const weatherRes = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&timezone=${timezone}&daily=weathercode,temperature_2m_max,temperature_2m_min`
      );
      const weatherData = await weatherRes.json();
      this.setState({ weather: { ...weatherData.daily, location: name } });
      localStorage.setItem("city", name);
    } catch (err) {
      console.error(err);
    } finally {
      this.setState({ isLoading: false });
    }
  };
  onChangeLocation = (e) => {
    this.setState({ location: e.target.value });
  };
  componentDidMount() {
    const city = localStorage.getItem("city");
    if (city) {
      this.fetchWeather();
    }
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevState.location !== this.state.location) {
      this.fetchWeather();
    }
  }
  render() {
    return (
      <div className="app">
        <h1>Classy Weather</h1>
        <div>
          <Input
            location={this.state.location}
            onChangeLocation={this.onChangeLocation}
          />
        </div>
        {this.state.isLoading && <p className="loader">Loading...</p>}
        {this.state.weather.weathercode && (
          <Weather
            weatherData={this.state.weather}
            location={this.state.location}
          />
        )}
      </div>
    );
  }
}
export default App;
