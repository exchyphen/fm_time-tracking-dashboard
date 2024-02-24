import { useState, useEffect } from "react";
import "./App.css";

import StatComponent from "./components/statComponent";

/* images, since we are passing these urls to a component (different directory) -> use absolute path */
import PersonImg from "/src/assets/images/image-jeremy.png";
import IconWork from "/icon-work.svg";
import IconPlay from "/icon-play.svg";
import IconStudy from "/icon-study.svg";
import IconExercise from "/icon-exercise.svg";
import IconSocial from "/icon-social.svg";
import IconSelfCare from "/icon-self-care.svg";

function App() {
  const [timeframe, setTimeframe] = useState("weekly");
  const [statsData, setStatsData] = useState(null);

  const imgArr = [
    IconWork,
    IconPlay,
    IconStudy,
    IconExercise,
    IconSocial,
    IconSelfCare,
  ];

  const nameArr = ["work", "play", "study", "exercise", "social", "self-care"];

  /* create component */

  const createStatComponents = () => {
    const arr = Array(statsData.length);

    for (let i = 0; i < statsData.length; i++) {
      const setBG = {
        backgroundImage: `url(${imgArr[i]})`,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "top -5px right 1rem",
        backgroundColor: `var(--${nameArr[i]})`,
      };

      arr[i] = (
        <StatComponent
          key={`statComponent${i}`}
          name={nameArr[i]}
          img={imgArr[i]}
          title={statsData[i].title}
          timeframes={statsData[i].timeframes}
          displayTimeframe={timeframe}
          setBG={setBG}
        ></StatComponent>
      );
    }

    return arr;
  };

  /* load data.json */
  useEffect(() => {
    fetch("./data.json")
      .then((response) => response.json())
      .then((data) => setStatsData(data));
  }, []);

  return (
    <>
      <main>
        <nav>
          <div className="person-container">
            <img className="person-img" src={PersonImg} alt="person img"></img>
            <div className="person-description-container">
              <div className="sm-text">Report for</div>
              <h1>Jeremy Robson</h1>
            </div>
          </div>
          <div className="nav-items-container">
            <a
              className={`${timeframe === "daily" ? "active-tab" : null}`}
              onClick={() => setTimeframe("daily")}
            >
              Daily
            </a>
            <a
              className={`${timeframe === "weekly" ? "active-tab" : null}`}
              onClick={() => setTimeframe("weekly")}
            >
              Weekly
            </a>
            <a
              className={`${timeframe === "monthly" ? "active-tab" : null}`}
              onClick={() => setTimeframe("monthly")}
            >
              Monthly
            </a>
          </div>
        </nav>
        {statsData !== null ? createStatComponents() : null}
      </main>
      <footer className="attribution">
        Challenge by{" "}
        <a href="https://www.frontendmentor.io?ref=challenge" target="_blank">
          Frontend Mentor
        </a>
        . Coded by{" "}
        <a href="https://github.com/exchyphen" target="_blank">
          exc
        </a>
        .
      </footer>
    </>
  );
}

export default App;
