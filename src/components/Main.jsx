import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import MainCon from "./MainCon/MainCon";
import SecCon from "./SecCon/SecCon";
import "./Main.css";

const Main = () => {
  const [area, setArea] = useState("");
  const [data, setData] = useState(null);

  const Change = async () => {
    const inputValue = document.querySelector("#in").value;
    setArea(inputValue);

    if (!inputValue) {
      alert("Please enter a location");
      return;
    }

    let API_KEY = import.meta.env.VITE_API_KEY;
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(
          inputValue
        )}&units=metric&appid=${API_KEY}`
      );
      const wdata = await response.json();

      if (wdata.cod === 200) {
        setData(wdata);
      } else {
        alert(wdata.message || "Error fetching weather data");
        setData(null);
      }
    } catch (error) {
      console.error("Error fetching weather data:", error);
      alert("Unable to fetch weather data. Please try again later.");
    }
  };
  function capitalizeFirstLetter(str) {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  }

  return (
    <div className="container">
      <h2>WeatherSnap: {capitalizeFirstLetter(area) || "Search for a city"}</h2>
      <div className="in-con">
        <input type="text" placeholder="Search..." id="in" />
        <FontAwesomeIcon
          icon={faMagnifyingGlass}
          onClick={Change}
          className="Search"
        />
      </div>
      {data && (
        <>
          <MainCon
            img={data?.weather?.[0]?.icon}
            temp={data?.main?.temp}
            main={data?.weather?.[0]?.main}
            des={data?.weather?.[0]?.description}
          />
          <SecCon
            fl={data?.main?.feels_like}
            pr={data?.main?.pressure}
            hum={data?.main?.humidity}
            sp={data?.wind?.speed}
          />
        </>
      )}
    </div>
  );
};

export default Main;
