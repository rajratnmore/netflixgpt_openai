import React, { useRef, useState, useEffect } from "react";
import Header from "./Header";
import { checkValidData } from "../utils/validate";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../utils/firebase";
import { userImage } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { netflixBackgroundImage } from "../utils/constants";

const Login = () => {
  const [isSignInForm, setIsSignInForm] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  const dispatch = useDispatch();

  const name = useRef(null);
  const email = useRef(null);
  const password = useRef(null);

  useEffect(() => {
    // Validate the form data for Sing In
    if (errorMessage !== null) {
      return; // If errorMessage is not null, return without further processing
    }

    if (!isSignInForm) {
      // Sign Up Logic
      createUserWithEmailAndPassword(auth, email.current.value, password.current.value)
        .then((userCredential) => {
          const user = userCredential.user;
          updateProfile(user, {
            displayName: name.current.value,
            photoURL: userImage,
          })
            .then((auth) => {
              const { uid, email, displayName } = auth.currentUser;
              dispatch(addUser({ uid: uid, email: email, displayName: displayName, userImage: userImage }));
            })
            .catch((error) => {
              setErrorMessage(error);
            });
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(errorCode + " - " + errorMessage);
        });
    } else {
      // Sign In Logic
      signInWithEmailAndPassword(auth, email.current.value, password.current.value)
        .then((userCredential) => {})
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(errorCode + " - " + errorMessage);
        });
    }
  }, [dispatch, isSignInForm, errorMessage]); // Watch for changes in errorMessage

  const handleButtonClick = () => {
    // Validate the form data
    if (isSignInForm) {
      const message = checkValidData(email.current.value, password.current.value);
      setErrorMessage(message);
    } else {
      const message = checkValidData(email.current.value, password.current.value, name.current.value);
      setErrorMessage(message);
    }
  };

  const toggleSignInForm = () => {
    setIsSignInForm(!isSignInForm);
  };

  return (
    <>
      <Header />
      <div className="absolute">
        <img src={netflixBackgroundImage} alt="logo" />
      </div>
      <div className="w-10/12 md:w-4/12 p-12 absolute bg-black bg-opacity-80 top-20 mx-auto left-0 right-0 rounded-md ">
        <form
          onSubmit={(e) => {
            e.preventDefault();
          }}
          className="p-4 text-white"
        >
          <h1 className="font-bold tracking-wider text-3xl py-4 w-full">{isSignInForm ? "Sign In" : "Sign Up"}</h1>
          {!isSignInForm && (
            <input
              ref={name}
              className="px-4 py-3 my-2 w-full rounded-md border border-slate-500 bg-zinc-800 bg-opacity-50"
              type="text"
              placeholder="Full Name"
              autoComplete="username"
            />
          )}
          <input
            ref={email}
            className="px-4 py-3 my-2 w-full rounded-md border border-slate-500 bg-zinc-800 bg-opacity-50"
            type="text"
            placeholder="Email Address"
            autoComplete="email"
          />
          <input
            ref={password}
            className="px-4 py-3 my-2 w-full rounded-md border border-slate-500 bg-zinc-800 bg-opacity-50"
            type="password"
            placeholder="Password"
            autoComplete="current-password"
          />
          <p className="text-red-700 font-bold px-2">{errorMessage}</p>
          <button
            className="p-2 my-2 w-full rounded-md font-medium"
            style={{ backgroundColor: "#EA0B18" }}
            onClick={handleButtonClick}
          >
            {isSignInForm ? "Sign In" : "Sign Up"}
          </button>
          <p className="py-4">
            {isSignInForm ? (
              <>
                New to Netflix?{" "}
                <span className="cursor-pointer font-bold" onClick={toggleSignInForm}>
                  Sign up now
                </span>
              </>
            ) : (
              <>
                Already Registered?{" "}
                <span className="cursor-pointer font-bold" onClick={toggleSignInForm}>
                  Sign In now
                </span>
              </>
            )}
          </p>
        </form>
      </div>
    </>
  );
};

export default Login;
