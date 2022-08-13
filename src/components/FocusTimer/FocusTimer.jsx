import React, { useState } from "react";
import alarm from "../../alarm.mp3";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import { IoIosPlayCircle } from "react-icons/io";
import { BsFillPauseCircleFill, BsCheckCircleFill } from "react-icons/bs";
import { IoMdRefreshCircle } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators } from "../../store";
import { bindActionCreators } from "redux";
import classes from "./FocusTimer.module.css";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../../database/initDb";
import { doc, updateDoc } from "firebase/firestore";
import { secondsToHms } from "../../SupportFuctions";
import { CircleSlider } from "react-circle-slider";
export default ({
  isChillTime,
  setActive,
  setSelectedItem,
  setDefaultTime,
  defaultTime,
  isActive,
  selctedItem,
  start,
  pause,
  reset,
}) => {
  const dispatch = useDispatch();
  const { updateToDo } = bindActionCreators(actionCreators, dispatch);
  const todos = useSelector((state) => state.todos);
  const [user, loading1, error1] = useAuthState(auth);
  const [audio] = useState(new Audio(alarm));
  const [value, setValue] = useState(0);
  if (isActive) {
    isChillTime();
  }

  return (
    <div className={classes.timer}>
      <h1>Focus time</h1>
      <div className={classes.SetTime}>
        {!isActive && (
          <CircleSlider
            value={value}
            stepSize={0.001}
            onChange={(value) => {
              setValue(value);
            }}
            progressColor="#405b76"
            size={window.screen.width <= 380 ? 300 : 410}
            min={0.001}
            max={60 * 5}
            knobRadius={10}
            circleWidth={5}
            progressWidth={6}
          />
        )}
      </div>
      <CountdownCircleTimer
        className={classes.Timer}
        key={defaultTime}
        isPlaying={isActive}
        size={350}
        duration={selctedItem?.time * 60 || value * 60 || 60 * 25}
        colors={["#a12c2c", "#a12c2c", "#a12c2c", "#a12c2c"]}
        colorsTime={[7, 5, 2, 0]}
        onUpdate={() => {}}
        onComplete={() => {
          audio.play();
          setActive(false);
          setDefaultTime((prev) => prev + 1);
          if (selctedItem) {
            setSelectedItem(undefined);
            updateToDo(selctedItem.id, "Complited");
            updateDoc(doc(db, "users", user.uid), {
              todos: todos,
            });
          }
        }}
      >
        {({ remainingTime }) => {
          return (
            <div className={classes.inCircle}>
              {secondsToHms(remainingTime)}
              <div className={classes.NoName}>
                {isActive && (
                  <BsCheckCircleFill
                    className={classes.pauseBtn}
                    onClick={() => {
                      audio.play();
                      setDefaultTime((prev) => prev + 1);
                      setActive(false);
                      pause();
                      reset();
                      if (selctedItem) {
                        setSelectedItem(undefined);
                        updateToDo(selctedItem.id, "Complited");
                        updateDoc(doc(db, "users", user.uid), {
                          todos: todos,
                        });
                      }
                    }}
                  />
                )}
                {isActive ? (
                  <BsFillPauseCircleFill
                    className={classes.pauseBtn}
                    onClick={() => {
                      pause();
                      setActive(!isActive);
                    }}
                  />
                ) : (
                  <IoIosPlayCircle
                    className={classes.playBtn}
                    onClick={() => {
                      start();
                      setActive(!isActive);
                    }}
                  />
                )}
                <IoMdRefreshCircle
                  className={classes.refresh}
                  onClick={() => {
                    setSelectedItem(undefined);
                    setActive(false);
                    setDefaultTime((prev) => prev + 1);
                    reset();
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
