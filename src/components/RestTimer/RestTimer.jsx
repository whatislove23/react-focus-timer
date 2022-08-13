import React, { useState } from "react";
import alarm from "../../alarm.mp3";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import { IoIosPlayCircle } from "react-icons/io";
import { BsFillPauseCircleFill, BsCheckCircleFill } from "react-icons/bs";
import { IoMdRefreshCircle } from "react-icons/io";
import classes from "./RestTimer.module.css";
import { secondsToHms } from "../../SupportFuctions";
import { CircleSlider } from "react-circle-slider";
export default ({ setActiveChill, setChill, isChill }) => {
  const [audio] = useState(new Audio(alarm));
  const [isPlay, setPlay] = useState(false);
  const [defaultTime, setDefaultTime] = useState(25);
  const [value, setValue] = useState(0);
  return (
    <div className={classes.timer}>
      <h1>Chill time</h1>
      <div className={classes.SetTime}>
        {!isPlay && (
          <CircleSlider
            value={value}
            stepSize={0.001}
            onChange={(value) => {
              setValue(value);
            }}
            progressColor="#042403"
            size={410}
            min={0.001}
            max={60 * 5}
            knobRadius={10}
            circleWidth={5}
            progressWidth={6}
          />
        )}
      </div>
      <CountdownCircleTimer
        key={defaultTime}
        isPlaying={isPlay}
        size={350}
        duration={value * 60 || 5 * 60}
        colors={["#23614c", "#23614c", "#23614c", "#23614c"]}
        colorsTime={[7, 5, 2, 0]}
        onComplete={() => {
          setChill(false);
          setPlay(false);
          setDefaultTime((prev) => prev + 1);
          audio.play();
        }}
      >
        {({ remainingTime }) => {
          return (
            <div className={classes.inCircle}>
              {secondsToHms(remainingTime)}
              <div>
                {isPlay && (
                  <BsCheckCircleFill
                    className={classes.pauseBtn}
                    onClick={() => {
                      setPlay(false);
                      audio.play();
                      setChill(false);
                      setDefaultTime((prev) => prev + 1);
                    }}
                  />
                )}
                {isPlay ? (
                  <BsFillPauseCircleFill
                    className={classes.pauseBtn}
                    onClick={() => {
                      setPlay(!isPlay);
                    }}
                  />
                ) : (
                  <IoIosPlayCircle
                    className={classes.playBtn}
                    onClick={() => {
                      setPlay(!isPlay);
                    }}
                  />
                )}
                <IoMdRefreshCircle
                  className={classes.refresh}
                  onClick={() => {
                    setPlay(false);
                    setDefaultTime((prev) => prev + 1);
                  }}
                />
              </div>
            </div>
          );
        }}
      </CountdownCircleTimer>
    </div>
  );
};
