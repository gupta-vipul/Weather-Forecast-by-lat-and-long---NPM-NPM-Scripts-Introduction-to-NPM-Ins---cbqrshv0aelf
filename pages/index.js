import { useState } from "react";

export default function Home() {
  const [weatherData, setWeatherData] = useState([]);
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  async function getAllData(latitude, longitude) {
    try{
      const response = await fetch(`https://api.met.no/weatherapi/locationforecast/2.0/compact?lat=${latitude}&lon=${longitude}`);
      const data = await response.json();
      setWeatherData(data.properties.timeseries);
      // console.log(data.properties.timeseries);
    }
    catch(error) {
      console.log(error);
    }
  }

  function handleClick(e) {
    e.preventDefault();
    getAllData(latitude, longitude);
  }

  return (
    <>
      <div id="root">
        <h1>Weather Forecast</h1>
        <form>
          <label htmlFor="latitude">Latitude
            <input 
              type="text" 
              className="latitude" 
              onChange={(e)=>setLatitude(e.target.value)}  
            />
          </label>
          <label htmlFor="longitude">Longitude
            <input 
              type="text" 
              className="longitude" 
              onChange={(e)=>setLongitude(e.target.value)}
            />
          </label>
          <button type="submit" onClick={handleClick}>Get Forecast</button>
        </form>
        <table>
          <thead>
            <tr>
              <th>Time</th>
              <th>Temperature (&#8451;)</th>
              <th>Summary</th>
            </tr>
          </thead>
          <tbody>
            {
              weatherData?.map((weatherEntry,index)=>{
                if(index < 30) {
                  return (
                    <tr>
                      <td>{new Date(weatherEntry.time).toLocaleString()}</td>
                      <td>{weatherEntry.data.instant.details.air_temperature}</td>
                      <td>{weatherEntry.data.next_1_hours.summary.symbol_code}</td>
                    </tr>
                  )}
              })
            }
          </tbody>
        </table>
      </div>
    </>
  );
}
