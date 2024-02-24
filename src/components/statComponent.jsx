import React, { useState, useEffect } from "react";
import "./statComponent.css";

import IconOptions from "../assets/images/icon-ellipsis.svg";

const StatComponent = (props) => {
  const [previousMessage, setPreviousMessage] = useState(null);

  /* process data */
  const currentTimeframe = props.timeframes[props.displayTimeframe];

  const createPreviousMessage = () => {
    if (props.displayTimeframe === "daily") {
      setPreviousMessage("Yesterday");
    } else if (props.displayTimeframe === "weekly") {
      setPreviousMessage("Last Week");
    } else {
      setPreviousMessage("Last Month");
    }
  };

  /* style based on props data */
  const setBG = {
    backgroundImage: `url(${props.img})`,
    backgroundRepeat: "no-repeat",
    backgroundPosition: "top -5px right 1rem",
    backgroundColor: `var(--${props.name})`,
  };

  useEffect(() => {
    createPreviousMessage();
  }, [props.displayTimeframe]);

  return (
    <section className="stat-container" style={setBG}>
      <div className="stat-content-container">
        <div className="stat-title">{props.title}</div>
        <div className="hours-container">
          <div className="current-hours">{currentTimeframe.current}hrs</div>
          <div className="previous-hours">
            {previousMessage} - {currentTimeframe.previous}hrs
          </div>
        </div>
      </div>
      <img className="options" src={IconOptions} alt="options icon"></img>
    </section>
  );
};

export default StatComponent;
