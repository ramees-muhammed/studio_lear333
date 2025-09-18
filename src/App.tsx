import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import "./pages/ImageSelection/ImageSelection.css";
import Login from "./pages/RegisterPage/Auth/Login";
import ForgotPass from "./pages/RegisterPage/Auth/ForgotPass";
import Register from "./pages/RegisterPage/Auth/Register";
import OTPVerify from "./pages/RegisterPage/Auth/OTPVerify";
import RegisterSuccess from "./pages/RegisterPage/Auth/RegisterSuccess";
import Subscriptions from "./pages/RegisterPage/Subscriptions/Subscriptions";
import Gallery from "./pages/ImageSelection/Gallery/Gallery";
import Auth from "./pages/ImageSelection/Auth/Auth";
import SignatureAlbums from "./pages/SignatureAlbum/Gallery/SignatureAlbums";
import AlbumsAuth from "./pages/SignatureAlbum/Auth/AlbumsAuth";
import Home from "./pages/Home/Home";
import {
  InvitationTheme1,
  InvitationTheme2,
  InvitationTheme3,
} from "./pages/DigitalInvitation/_invitation_themes/InvitationThemes";

function App() {
  const [isSelectionLoggedIn, setIsSelectionLoggedIn] = useState(
    localStorage.getItem("loginstatus") === "true"
  );

  const [isAlbumLoggedIn, setIsAlbumLoggedIn] = useState(
    localStorage.getItem("albumloginstatus") === "true"
  );

  useEffect(() => {
    const handleStorageChange = () => {
      setIsSelectionLoggedIn(localStorage.getItem("loginstatus") === "true");
    };

    window.addEventListener("storage", handleStorageChange);

    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsSelectionLoggedIn(localStorage.getItem("loginstatus") === "true");
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="App">
      <Routes>
        {/* <Route path='/' element={<div><h1>Studio Lear</h1></div>} /> */}
        <Route path="/" element={<Home />} />
        <Route path="/create/login" element={<Login />} />
        <Route path="/create/forgot-pass" element={<ForgotPass />} />
        <Route path="/create/register" element={<Register />} />
        <Route path="/create/verify-account" element={<OTPVerify />} />
        <Route
          path="/create/registered-successfully"
          element={<RegisterSuccess />}
        />
        <Route path="/create/subscriptions" element={<Subscriptions />} />

        <Route
          path="/albums/:album_id"
          element={isSelectionLoggedIn ? <Gallery /> : <Auth />}
        />

        <Route
          path="/signature-albums/:album_id"
          element={!isAlbumLoggedIn ? <SignatureAlbums /> : <AlbumsAuth />}
        />

        <Route path="/invitation/classic/:id" element={<InvitationTheme1 />} />
        <Route path="/invitation/soft/:id" element={<InvitationTheme2 />} />
        <Route path="/invitation/retro/:id" element={<InvitationTheme3/>} />
      </Routes>
    </div>
  );
}

export default App;

// import { Route, Routes } from 'react-router-dom';
// import './App.css'
// import './pages/ImageSelection/ImageSelection.css'
// import Login from './pages/RegisterPage/Auth/Login';
// import ForgotPass from './pages/RegisterPage/Auth/ForgotPass';
// import Register from './pages/RegisterPage/Auth/Register';
// import OTPVerify from './pages/RegisterPage/Auth/OTPVerify';
// import RegisterSuccess from './pages/RegisterPage/Auth/RegisterSuccess';
// import Subscriptions from './pages/RegisterPage/Subscriptions/Subscriptions';
// import Gallery from './pages/ImageSelection/Gallery/Gallery';
// import Auth from './pages/ImageSelection/Auth/Auth';

// function App() {
//   const albums_loginstatus = localStorage.getItem("loginstatus")
//   console.log("albums_loginstatus:", albums_loginstatus)

//   return (
//     <div className='App' >
//       <Routes>
//         {/* studiolear.com/ */}
//         <Route path='/' element={<div><h1>Studio Lear</h1></div>} />

//         {/* studiolear.com/create/ */}
//         <Route path='/create/login' element={<Login />} />
//         <Route path='/create/forgot-pass' element={<ForgotPass />} />

//         <Route path='/create/register' element={<Register />} />
//         <Route path='/create/verify-account' element={<OTPVerify />} />
//         <Route path='/create/registered-successfully' element={<RegisterSuccess />} />
//         <Route path='/create/subscriptions' element={<Subscriptions />} />

//         {/* studiolear.com/image-selection/ */}

//         <Route path='/albums/:project_name/:album_id' element={albums_loginstatus ? <Gallery /> : <Auth />} />

//       </Routes>
//     </div>
//   )
// }

// export default App;
