import React from "react";
import classes from "./AboutPage.module.css";
import pomidor from "../../tomato.png";
export default () => {
  document.body.style.backgroundColor = "#202a44";
  return (
    <div className={classes.Wrapper}>
      <h1 className={classes.Title}>About this project</h1>
      <article className={classes.Article}>
        The Pomodoro Technique is a time management method developed by
        Francesco Cirillo in the late 1980s.
      </article>
      <img src={pomidor} className={classes.pomidor} />
      <article className={classes.Article}>
        It uses a kitchen timer to break work into intervals, typically 25
        minutes in length, separated by short breaks.
      </article>
      <h2 className={classes.Title}>Features</h2>
      <article className={classes.Article}>
        At the moment exist two timers: first is used to countdown focus time
        and second used to countdown rest time. Both of them have buttons to
        reset to pause and to finsh countdown time.
      </article>
      <article className={classes.Article}>
        Also exist ToDo list which you can use to create own task. Each task has
        status "Waiting", "Active" and "Complited". You can change staus via
        check button after click it will start countdown. In 25 minutes
        automaticaly starts rest timer to five minutes. Also you can delite
        task.
      </article>
      <h2 className={classes.Title}>Purposes</h2>
      <article className={classes.Article}>
        This web application was created for training purposes. " To create this
        web application I have used React.js library also I tried to use
        React-Redux library" to manage application state. To store data was used
        Firebase " - Vladyslav Tymchenko Summer 2022
      </article>
    </div>
  );
};
