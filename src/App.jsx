import React, { useEffect, useState } from "react";

function App() {
  const [lat, setLat] = useState(null);
  const [long, setLong] = useState(null);
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      navigator.geolocation.getCurrentPosition(function(position) {
        setLat(position.coords.latitude);
        setLong(position.coords.longitude);
      });
    };

    fetchData();
  }, []); // UseEffect ejecutado solo al montar el componente para obtener la ubicación.

  useEffect(() => {
    const fetchWeatherData = async () => {
      if (lat !== null && long !== null) {
        try {
          const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather/?lat=${lat}&lon=${long}&units=metric&APPID=031beae55ff3dbd5a4df412f14564e69`
          );
          const result = await response.json();
          setData(result);
          console.log(result);
        } catch (error) {
          console.error("Error fetching weather data:", error);
        }
      }
    };

    fetchWeatherData();
  }, [lat, long]);

  return (
    <div className="App">
      {/* Renderiza la información del clima aquí */}
    </div>
  );
}

export default App;
