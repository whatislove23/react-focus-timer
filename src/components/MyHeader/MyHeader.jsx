import React, { useEffect } from "react";
import classes from "./MyHeader.module.css";
import {
  AiOutlineLogin,
  AiOutlineLogout,
  AiOutlineInfoCircle,
} from "react-icons/ai";
import { Routes, Route, Link } from "react-router-dom";
import { db, auth } from "../../database/initDb";
import { useAuthState, useSignInWithGoogle } from "react-firebase-hooks/auth";
import { signOut } from "firebase/auth";
import { useCollection } from "react-firebase-hooks/firestore";
import {
  collection,
  doc,
  getDocs,
  getFirestore,
  onSnapshot,
  setDoc,
} from "firebase/firestore";

export default () => {
  const [signInWithGoogle] = useSignInWithGoogle(auth);
  const [user, loading1, error1] = useAuthState(auth);
  const [value, loading, error] = useCollection(collection(db, "users"), {
    snapshotListenOptions: { includeMetadataChanges: true },
  });
  //create new user in db after autentication
  if (user && value) {
    let docs = value.docs.map((doc) => doc.id);
    if (!docs.includes(user.uid)) {
      setDoc(doc(db, "users", user.uid), { todos: [] });
    }
  }

  return (
    <div className={classes.Header}>
      <Link to="/" className={classes.Logo}>
        My pomidoro
      </Link>
      <div className={classes.Links}>
        <div>
          {user ? (
            <AiOutlineLogout onClick={() => signOut(auth)} />
          ) : (
            <Link to="/login">
              <AiOutlineLogin
                onClick={() => {
                  // signInWithGoogle();
                }}
              />
            </Link>
          )}
        </div>
        <Link to="/about">
          <AiOutlineInfoCircle />
        </Link>
        {user && (
          <div className={classes.Avatar1}>
            <img className={classes.Avatar} src={user.photoURL} alt="123" />
          </div>
        )}
      </div>
    </div>
  );
};
