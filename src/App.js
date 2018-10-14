import React from 'react';
import Titles from './components/Titles';
import Form from './components/Form';
import Weather from './components/Weather';

const LINK = 'http://api.openweathermap.org/data/2.5/weather?q=';
const API_KEY = '21b7cd971291debe955145e94c43685b';

class App extends React.Component {
  state = {
    temperature: null,
    city: null,
    country: null,
    humidity: null,
    description: null,
    error: null
  };
  getWeather = async (e) => {
    e.preventDefault();
    const path = e.target.elements;
    const city = path.city.value;
    const country = path.country.value;
    const api_call = await fetch(`${LINK}${city},${country}&appid=${API_KEY}`);
    const data = await api_call.json();
    if (city && country) {
      this.setState({
          temperature: data.main.temp,
          city: data.name,
          country: data.sys.country,
          humidity: data.main.humidity,
          description: data.weather[0].description,
          error: ""
      });
    } else {
      this.setState({
        temperature: null,
        city: null,
        country: null,
        humidity: null,
        description: null,
        error: "Please enter the values."
      });
    }
  }
  render () {
    return ( 
      <div>
        <div className="wrapper">
          <div className="main">
            <div className="container">
              <div className="row">
                <div className="col-xs-5 title-container">
                    <Titles />
                </div>
                <div className="col-xs-7 form-container">
                    <Form getWeather={this.getWeather}/>
                    <Weather 
                    temperature={this.state.temperature}
                    city={this.state.city}
                    country={this.state.country}
                    humidity={this.state.humidity}
                    description={this.state.description}
                    error={this.state.error} 
                    />
                </div>
              </div>
          </div>
        </div>
      </div>
    </div>
     
    );
  }
};

export default App;