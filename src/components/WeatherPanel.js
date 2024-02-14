import React from "react"
import WeatherHistoryModal from "./WeatherHistoryModal";
import {Button, OverlayTrigger, Tooltip} from "react-bootstrap";

function WeatherPanel({city, data}) {
    const [showJsonTooltip, setShowJsonTooltip] = React.useState(false);
    const iconUrl = "https://openweathermap.org/img/w/" + data.current.weather[0].icon + ".png";

    return(
        <div className="Weather-panel" >
            <p style={{fontSize: "18px"}}>{city}</p>
            <p>({Math.abs(data.lat)} °{data.lat >= 0 ? "N" : "S"}, {Math.abs(data.lon)} °{data.lon >= 0 ? "E" : "W"})</p>
            <img src={iconUrl} className="Weather-icon" alt="Weather Icon"/>
            <p>Current temp: {data.current.temp} °F</p>
            <p>Feels like: {data.current.feels_like} °F</p>
            <p>UV Index: {data.current.uvi}</p>
            <p>Humidity: {data.current.humidity}%</p>
            <p>Pressure: {data.current.pressure} hPa</p>
            <WeatherHistoryModal city={city}/>
            <div>
            <OverlayTrigger
                overlay={<Tooltip id="jsonTooltip">{JSON.stringify(data)}</Tooltip>}
                show={showJsonTooltip}
                placement={"right"}>
                <Button
                    style={{marginTop: '0.75rem'}}
                    size="sm"
                    variant="link"
                    onMouseEnter={() => setShowJsonTooltip(true)}
                    onMouseLeave={() => setShowJsonTooltip(false)}>
                    (Show json output)
                </Button>
            </OverlayTrigger>
            </div>
        </div>
    )

}

export default WeatherPanel;