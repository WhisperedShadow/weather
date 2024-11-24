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

    let API_KEY = "45b5f7cfa8753937d709872dde0f8280";
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

  return (
    <div className="container">
      <h2>WeatherSnap: {area || "Search for a city"}</h2>
      <div className="in-con">
        <input type="text" placeholder="Search..." id="in" />
        <FontAwesomeIcon icon={faMagnifyingGlass} onClick={Change} />
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
          fl={data?.feels_like}
          pr={data?.pressure}
          hum={data?.humidity}
          sp={data?.wind?.speed}
        />
        </>
      )}
    </div>
  );
};

export default Main;
