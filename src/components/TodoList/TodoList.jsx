import React, { useState, useEffect } from "react";
import classes from "./todoList.module.css";
import { IoMdAddCircle } from "react-icons/io";
import ToDoItem from "../ToDoItem/ToDoItem";
import { useDispatch, useSelector } from "react-redux";
import AddToDo from "../AddToDo/AddToDo";
import { useStopwatch } from "react-timer-hook";
import FocusTimer from "../FocusTimer/FocusTimer";
import RestTimer from "../RestTimer/RestTimer";
import alarm from "../../alarm.mp3";
import { RevolvingDot, Watch } from "react-loader-spinner";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../../database/initDb";
import { doc, updateDoc } from "firebase/firestore";
import AuthBtn from "../AuthBTN/AuthBtn";
import { Link } from "react-router-dom";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

const TodoList = () => {
  const [user, loading, error] = useAuthState(auth);
  const [audio] = useState(new Audio(alarm));
  const [IsOpen, setIsOpen] = useState(false);
  const [selctedItem, setSelectedItem] = useState();
  const [defaultTime, setDefaultTime] = useState(25);
  const [isActive, setActive] = useState(false); //study timer
  const [isChill, setChill] = useState(false); //to show rest timer?
  const todos = useSelector((state) => state.todos);
  const { seconds, minutes, hours, days, isRunning, start, pause, reset } =
    useStopwatch({ autoStart: false });

  function isChillTime() {
    console.log(minutes);
    if (minutes === 25) {
      audio.play();
      pause();
      setActive(false);
      setChill(true);
      reset();
      document.body.style.backgroundColor = "#358163";
    }
  }
  if (!isChill) {
    document.body.style.backgroundColor = "#b23232";
  }
  return (
    <div>
      <div className={classes.TodoContainer}>
        <div className={isChill ? "displayTrue" : "displayNone"}>
          <RestTimer setChill={setChill} isChill={isChill} />
        </div>
        <div className={isChill ? "displayNone" : "displayTrue"}>
          <FocusTimer
            defaultTime={defaultTime}
            setDefaultTime={setDefaultTime}
            isActive={isActive}
            setActive={setActive}
            isChillTime={isChillTime}
            pause={pause}
            start={start}
            reset={reset}
            selctedItem={selctedItem}
            setSelectedItem={setSelectedItem}
          />
        </div>

        {user ? (
          <div className={classes.Todos}>
            <div className={classes.TaskTitle}>
              {todos.length === 0 ? "Please add task" : "Tasks"}
            </div>
            {IsOpen === false && (
              <div
                className={classes.addButton}
                onClick={() => setIsOpen(true)}
              >
                <IoMdAddCircle />
                <p> Add Task</p>
              </div>
            )}
            {IsOpen === true && <AddToDo setIsOpen={setIsOpen} />}
            <div className={classes.list}>
              {todos.map((item) => (
                <ToDoItem
                  {...item}
                  key={item?.id}
                  setSelectedItem={setSelectedItem}
                  setDefaultTime={setDefaultTime}
                  setActive={setActive}
                />
              ))}
            </div>
          </div>
        ) : loading ? (
          <div className={classes.loader}>
            <Watch height={200} width={200} color="white" />
          </div>
        ) : (
          <AuthBtn />
        )}
      </div>
    </div>
  );
};
export default TodoList;
