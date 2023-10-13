import React  from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Favorites from "../pages/Favorites";
import Login from "../pages/Login";
import Register from "../pages/Register";
import PrivateRoute from "../components/PrivateRoute";
import ChangePassword from "../pages/ChangePassword";
import CS50Intro from "../pages/CS50Intro";

export default function AppRouter({changeLogin}) {
  return (
    <Routes>
      <Route path="/" element={
        <Home/>
      }/>
      <Route path="/login" element={
        <Login changeLogin={changeLogin}/>
      }/>
      <Route path="/cs50x" element={
        <CS50Intro/>
      }/>
      <Route path="/register" element={
        <Register/>
      }/>
      <Route path="/password" element={
        <PrivateRoute>
          <ChangePassword/>
        </PrivateRoute>
      }/>
      <Route path="/favorites" element={
        <PrivateRoute>
          <Favorites/>
        </PrivateRoute>
      }/>
    </Routes>
  )
}
