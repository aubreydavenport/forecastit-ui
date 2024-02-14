import React from "react";
import logo from './logo.jpg';
import './App.css';
import {Row, Button, Form} from 'react-bootstrap';
import WeatherPanel from "./components/WeatherPanel";

function App() {
    const [citySearchOpen, setCitySearchOpen] = React.useState(false);
    const [selectedCity, setSelectedCity] = React.useState("");
    const [selectedWeathers, setSelectedWeathers] = React.useState(new Map())

    const pullWeatherData = () => {
        fetch("http://localhost:5000/weather?city=" + selectedCity)
            .then(response => {
                if (!response.ok) {
                    throw new Error("Unsuccessful call to /weather API");
                }
                return response.json();
            })
            .then(data => {
                if (!selectedWeathers.has(selectedCity)) {
                    setSelectedWeathers(new Map(selectedWeathers.set(selectedCity, data)));
                }
            })
            .catch(error => {
                console.log("Errors: ", error);
            });
    };

    return (
        <div className="App">
            <header className="App-header">
                <p className="Title">
                    ForecastIt!
                    <img src={logo} className="Logo" alt="Logo"/>
                </p>
                {citySearchOpen ?
                    <Row>
                        <Form.Select
                            aria-label="---Location city---"
                            style={{marginRight: "1rem"}}
                            onChange={(event) => setSelectedCity(event.target.value)}>
                            <option value="">---Location city---</option>
                            <option value="Boston">Boston</option>
                            <option value="Chicago">Chicago</option>
                            <option value="Dallas">Dallas</option>
                            <option value="New York">New York</option>
                            <option value="London">London</option>
                        </Form.Select>
                        <Button
                            onClick={pullWeatherData}
                            style={{marginTop: '0.75rem'}}>
                            Add
                        </Button>
                    </Row>
                    :
                    <Button
                        onClick={() => {setCitySearchOpen(true)}}>
                        + Add location
                    </Button>}
                <div style={{ display: 'flex', flexWrap: 'wrap', marginTop: '1rem' }}>
                    {Array.from(selectedWeathers.entries()).map(([key, value]) => (
                       <WeatherPanel city={key} data={value} />
                    ))}
                </div>
            </header>
        </div>
    );
}

export default App;
