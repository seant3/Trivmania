import { useState } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import "./App.css";

import LoginPage from "./pages/LoginPage/LoginPage";
import SignupPage from "./pages/SignupPage/SignupPage";
import FeedPage from "./pages/FeedPage/FeedPage";
import PlayPage from "./pages/PlayPage/PlayPage";

import userService from "./utils/userService";
import ProfilePage from "./pages/ProfilePage/ProfilePage";

export default function App() {
  const [user, setUser] = useState(userService.getUser())

  function handleSignupOrLogin() {
    setUser(userService.getUser());
  }

  function handleLogout() {
    userService.logout();
    setUser(null);
  }

  if(user) {
    return(
      <Routes>
      <Route path="/play" element={<PlayPage loggedUser={user} handleLogout={handleLogout}/>} />
      <Route path="/login" element={<LoginPage handleSignupOrLogin={handleSignupOrLogin}/>} />
      <Route path="/signup" element={<SignupPage handleSignupOrLogin={handleSignupOrLogin}/>} />
      <Route path="/" element={<FeedPage loggedUser={user} handleLogout={handleLogout}/>} />
      <Route path="/:username" element={<ProfilePage loggedUser={user} handleLogout={handleLogout}/>} />
    </Routes>
    )
  }

  return (
    <Routes>
      <Route path="/login" element={<LoginPage handleSignupOrLogin={handleSignupOrLogin}/>} />
      <Route path="/signup" element={<SignupPage handleSignupOrLogin={handleSignupOrLogin}/>} />
      <Route path="/*" element={<Navigate to="/login"/>} />
    </Routes>
  );
}
