import React, { useEffect } from "react";
import { signOut } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { onAuthStateChanged } from "firebase/auth";
import { addUser, removeUser } from "../utils/userSlice";
import { useDispatch } from "react-redux";
import { SUPPORTED_LANGUAGES, netflixLogo } from "../utils/constants";
import { userImage } from "../utils/constants";
import { toggleGptSearchView } from "../utils/gptSlice";
import { changeLanguage } from "../utils/configSlice";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((store) => store.user);
  const showGptSearch = useSelector((store) => store.gpt.showGptSearch);

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {})
      .catch((error) => {
        navigate("/error");
      });
  };

  useEffect(() => {
    // This function onAuthStateChanged' keeps check wheather 'user is logged in or not'
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in
        const { uid, email, displayName } = user;
        dispatch(addUser({ uid: uid, email: email, displayName: displayName, userImage: userImage }));
        navigate("/browse");
      } else {
        // User is signed out
        dispatch(removeUser());
        navigate("/");
      }
    });
    // Unsubscribe when component unmount
    return () => unsubscribe();
  }, [dispatch, navigate]);

  const handleGptSearchClick = () => {
    dispatch(toggleGptSearchView());
    dispatch(changeLanguage("en"));
  };

  const handleLanguageChange = (e) => {
    dispatch(changeLanguage(e.target.value));
  };

  return (
    <>
      <div className="fixed w-full bg-gradient-to-b from-black z-20 flex flex-col items-center md:flex-row md:justify-between">
        <div className="">
          <img className="w-40" src={netflixLogo} alt="logo" />
        </div>
        {user && (
          <div className="flex flex-wrap justify-center p-2">
            {showGptSearch && (
              <select
                className="px-4 m-4 bg-gray-500 focus:outline-none rounded-sm"
                name=""
                id=""
                onChange={handleLanguageChange}
              >
                {SUPPORTED_LANGUAGES.map((lang) => (
                  <option key={lang.identifier} value={lang.identifier}>
                    {lang.name}
                  </option>
                ))}
              </select>
            )}

            <button className="px-2 md:px-4 m-4 rounded-md bg-blue-800 text-white" onClick={handleGptSearchClick}>
              {showGptSearch ? "Home Page" : "GPT Search"}
            </button>
            <div className="flex">
              <img className="w-12 m-2" alt="userImage" src={user?.userImage} />
              <button className="font-bold text-white" onClick={handleSignOut}>
                (Sign Out)
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Header;
