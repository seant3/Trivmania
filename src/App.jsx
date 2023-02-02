import { useState } from "react";
import { Route, Routes } from "react-router-dom";
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

  return (
    <Routes>
      <Route path="/play" element={<PlayPage />} />
      <Route path="/login" element={<LoginPage handleSignupOrLogin={handleSignupOrLogin}/>} />
      <Route path="/signup" element={<SignupPage handleSignupOrLogin={handleSignupOrLogin}/>} />
      <Route path="/" element={<FeedPage loggedUser={user}/>} />
      <Route path="/:username" element={<ProfilePage loggedUser={user}/>} />
    </Routes>
  );
}
