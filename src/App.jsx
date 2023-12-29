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
  }, []);

  useEffect(() => {
    const fetchWeatherData = () => {
        try {
          const response = fetch(
            `https://api.openweathermap.org/data/2.5/weather/?lat=${lat}&lon=${long}&units=metric&APPID=031beae55ff3dbd5a4df412f14564e69`
          );
          const result = response.json();
          setData(result);
        } catch (error) {
          console.error("Error fetching weather data:", error);
        }
      
    };

    fetchWeatherData();
  }, [lat, long]);

  return (
    <div className="bg-slate-900 h-screen flex justify-center items-center">
      <div className="bg-green-500 h-[200px] w-[500px] rounded-2xl text-white font-bold text-center">
        <h1 className="text-xl bg-slate-700 rounded-t-2xl p-3">Clima en <span className="text-blue-300">{data ? `${data?.name}` : "Salta"}</span></h1>
        <p className="text-9xl">{data ? `Temperatura: ${data?.main.temp}°C` : "20°C"}</p>
      </div>
    </div>
  );
}

export default App;
