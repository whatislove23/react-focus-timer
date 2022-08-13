import React, { useState } from "react";
import { IoClose } from "react-icons/io5";
import classes from "./AddToDo.module.css";
import Slider from "@mui/material/Slider";
import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators } from "../../store";
import { v4 as uuidv4 } from "uuid";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../../database/initDb";
import { arrayUnion, doc, setDoc, updateDoc } from "firebase/firestore";
const AddToDo = ({ setIsOpen }) => {
  const [value, setValue] = useState(1);
  const [title, setTitle] = useState();
  const [user, loading1, error1] = useAuthState(auth);
  const dispatch = useDispatch();
  const { addTodo } = bindActionCreators(actionCreators, dispatch);
  const createTask = () => {
    if (title) {
      updateDoc(doc(db, "users", user.uid), {
        todos: arrayUnion({
          title: title,
          id: uuidv4(),
          isActive: "Need to do",
          time: value,
        }),
      });
      setIsOpen(false);
    }
  };
  return (
    <div className={classes.createContainer}>
      <IoClose
        className={classes.closeBtn}
        onClick={() => {
          setIsOpen(false);
        }}
      />
      <input
        autoFocus
        type="text"
        placeholder="What you gonna do?"
        className={classes.createInput}
        onChange={(e) => setTitle(e.target.value)}
      />
      <div className={classes.Slider}>
        How long?
        <Slider
          marks
          min={1}
          max={60}
          value={value}
          onChange={(el, newValue) => setValue(newValue)}
          valueLabelDisplay="auto"
          className={"MuiSlider-thumb MuiSlider-rail MuiSlider-track"}
        />
      </div>
      <button className={classes.addTask} onClick={createTask}>
        Add task
      </button>
    </div>
  );
};
export default AddToDo;
