import cl from "./Loginpage.module.css";
import { MdOutlineMail } from "react-icons/md";
import { AiFillGoogleCircle, AiOutlineUserAdd } from "react-icons/ai";
import { useState } from "react";
import {
  useCreateUserWithEmailAndPassword,
  useSignInWithEmailAndPassword,
  useSignInWithGoogle,
} from "react-firebase-hooks/auth";
import { auth } from "../../database/initDb";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Modal from "react-modal";
import { ToastContainer, toast } from "react-toastify";
export default () => {
  const [
    createUserWithEmailAndPassword,
    createUserResponse,
    createLoading,
    createError,
  ] = useCreateUserWithEmailAndPassword(auth);
  const [
    signInWithEmailAndPassword,
    userLoginRespose,
    userLoginLoading,
    userLoginError,
  ] = useSignInWithEmailAndPassword(auth);
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [isOpen, setOpen] = useState(false);
  const [isOpen2, setOpen2] = useState(false);
  let navigate = useNavigate();
  document.body.style.backgroundColor = "#600080";

  useEffect(() => {
    if (createUserResponse || userLoginRespose) navigate("/");
    if (createError?.code === "auth/email-already-in-use") {
      toast.error("Email already in use");
    } else if (createError?.code === "auth/weak-password") {
      toast.error("Weak password");
    }
    if (userLoginError?.code === "auth/user-not-found") {
      toast.error("User not found");
    } else if (userLoginError?.code === "auth/wrong-password") {
      toast.error("Wrong password");
    }
  }, [userLoginRespose, userLoginRespose, createError, userLoginError]);

  useEffect(() => {}, []);
  function validateEmail(email) {
    var re = /\S+@\S+\.\S+/;
    return re.test(email);
  }
  function loginViaEmailAndPass(password, email) {
    if (password && validateEmail(email)) {
      signInWithEmailAndPassword(email, password);
    }
    if (!validateEmail(email)) {
      toast.error(`Email ${email} is not valid`);
    }
  }

  function registerUser() {
    if (password && validateEmail(email)) {
      createUserWithEmailAndPassword(email, password);
    }
    if (!validateEmail(email)) {
      toast.error(`Email ${email} is not valid`);
    }
  }

  return (
    <div className={cl.main}>
      <div className={cl.wrapper}>
        <h1>Login</h1>
        <div className={cl.buttons}>
          {/* <button
            onClick={() => {
              signInWithGoogle();
            }}
          >
            <AiFillGoogleCircle className={cl.logo} />
            <div className={cl.title}>Login via Google</div>
          </button> */}
          <button
            onClick={() => {
              setOpen2(true);
            }}
          >
            <MdOutlineMail className={cl.logo} />
            <div className={cl.title}>Login via E-Mail & Password </div>
          </button>
          <button onClick={() => setOpen(!isOpen)}>
            <AiOutlineUserAdd className={cl.logo} />
            <div className={cl.title}>Register</div>
          </button>
        </div>
      </div>
      <Modal
        className={cl.Modal}
        overlayClassName={cl.Overlay}
        isOpen={isOpen}
        onRequestClose={() => {
          setOpen(false);
        }}
        // style={customStyles}
        contentLabel="Example Modal"
      >
        <div className={cl.modal}>
          <p>Registration</p>
          <input
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            type="email"
            placeholder="Email"
          />
          <input
            type="password"
            placeholder="Password at least 6 characters"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <div onClick={() => registerUser()} className={cl.register}>
            Register
          </div>
        </div>
      </Modal>
      <Modal
        className={cl.Modal}
        overlayClassName={cl.Overlay}
        isOpen={isOpen2}
        onRequestClose={() => {
          setOpen2(false);
        }}
        // style={customStyles}
        contentLabel="Example Modal"
      >
        <div className={cl.modal}>
          <p>Log In</p>
          <input
            type="email"
            placeholder="Email"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <input
            type="password"
            placeholder="Password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <div
            onClick={() => loginViaEmailAndPass(password, email)}
            className={cl.register}
          >
            Log In
          </div>
        </div>
      </Modal>
    </div>
  );
};
