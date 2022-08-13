import "./App.css";
import MyHeader from "./components/MyHeader/MyHeader";
import TodoList from "./components/TodoList/TodoList";
import { Routes, Route, Link } from "react-router-dom";
import AboutPage from "./components/AboutPage/AboutPage";
import { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "./database/initDb";
import { useCollection } from "react-firebase-hooks/firestore";
import { collection } from "firebase/firestore";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators } from "./store";
import LoginPage from "./components/LoginPage/LoginPage";
import { ToastContainer, toast } from "react-toastify";
function App() {
  const [user, loading1, error1] = useAuthState(auth);
  const [value, loading, error] = useCollection(collection(db, "users"), {
    snapshotListenOptions: { includeMetadataChanges: true },
  });
  //create new user in db after autentication
  const dispatch = useDispatch();
  const { addTodo } = bindActionCreators(actionCreators, dispatch);
  useEffect(() => {
    console.log(loading);
    if (user && value) {
      let [doc] = value.docs
        .map((doc) => {
          if (doc.id == user.uid) {
            // console.log(doc.data().todos);
            return doc.data().todos;
          }
        })
        .filter((el) => el !== undefined);
      console.log(doc);
      if (doc) {
        // console.log("User todos", doc);
        addTodo(doc);
      }
    }
  }, [value]);
  return (
    <div className="App">
      <MyHeader />
      <Routes>
        <Route path="/" element={<TodoList />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/about" element={<AboutPage />} />
      </Routes>
    </div>
  );
}

export default App;
