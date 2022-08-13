import { doc, updateDoc } from "firebase/firestore";
import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { BsCheck, BsFillTrashFill } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import { auth } from "../../database/initDb";
import { actionCreators } from "../../store";
import classes from "./ToDoItem.module.css";

export default ({
  title,
  id,
  isActive,
  time,
  setSelectedItem,
  setDefaultTime,
  setActive,
}) => {
  const dispatch = useDispatch();
  const { removeTodo, updateToDo } = bindActionCreators(
    actionCreators,
    dispatch
  );
  const [user] = useAuthState(auth);
  const todos = useSelector((state) => state.todos);
  return (
    <div className={`${isActive}`}>
      <div className={[classes.todo].join(",")}>
        {isActive === "Complited" ? (
          <div></div>
        ) : (
          <BsCheck
            className={[classes.check, classes.onHover].join(" ")}
            onClick={() => {
              setActive(false);
              setDefaultTime((prev) => prev + 1);
              setSelectedItem({ title, id, isActive, time });
              updateToDo(id, "Active");
            }}
          />
        )}
        <p className={classes.title}>{title}</p>
        <p className={classes.time}>{time} - Min</p>
        <p className={classes.time}>{`${isActive}`}</p>
        <BsFillTrashFill
          className={[classes.trash, classes.onHover].join(" ")}
          onClick={() => {
            removeTodo(id, user.uid);
          }}
        />
      </div>
    </div>
  );
};
