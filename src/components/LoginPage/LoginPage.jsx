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
  const [signInWithGoogle, user, loading, error] = useSignInWithGoogle(auth);
  const [createUserWithEmailAndPassword, user2, loading2, error2] =
    useCreateUserWithEmailAndPassword(auth);
  const [signInWithEmailAndPassword, user3, loading3, error3] =
    useSignInWithEmailAndPassword(auth);
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [isOpen, setOpen] = useState(false);
  const [isOpen2, setOpen2] = useState(false);
  let navigate = useNavigate();
  document.body.style.backgroundColor = "#600080";

  useEffect(() => {
    if (user || user2 || user3) {
      navigate("/");
    }
  }, [user, user2, user3]);

  useEffect(() => {
    if (error2) {
      if (error2.code === "auth/weak-password") {
        toast.error("Password should be at least 6 characters ");
      }
      if (error2.code === "auth/email-already-in-use") {
        toast.error("Email already in use");
      }
      if (user2) {
        toast.success("Done");
      }
      if (loading2) {
        toast.info("Loading");
      }
    }
  }, [error2, user2, loading2]);

  function loginViaEmailAndPass() {
    if (password && validateEmail(email)) {
      signInWithEmailAndPassword(email, password);
    }
    if (!validateEmail(email)) {
      toast.error(`Email ${email} is not valid`);
    }
  }
  function validateEmail(email) {
    var re = /\S+@\S+\.\S+/;
    return re.test(email);
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
            placeholder="Password"
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
            onClick={() => {
              loginViaEmailAndPass();
            }}
            className={cl.register}
          >
            Log In
          </div>
        </div>
      </Modal>
    </div>
  );
};
