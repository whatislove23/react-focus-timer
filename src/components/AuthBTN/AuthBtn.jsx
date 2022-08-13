import React from "react";
import { Link } from "react-router-dom";
import cl from "./AuthBtn.module.css";
export default () => {
  //   const [signInWithGoogle] = useSignInWithGoogle(auth);
  return (
    <div className={cl.wrapper}>
      To use To Do list you have to Log in
      <Link to="/login" className={cl.btn}>
        Authorise
      </Link>
    </div>
  );
};
