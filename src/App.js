/* 
* **********************************
*
* CREATOR OF THIS APP: Danish Sharma
*
* **********************************
*/

import React, { useState, useEffect } from "react";

import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import { Row, Col } from "react-bootstrap";
import { Navigate, Route, Routes } from 'react-router-dom'; 

// Components
import { AuthProvider } from "./components/auth/auth";
import { RequireAuth } from "./components/auth/requireAuth";
import Logo from './components/logo/logo';
import ImageLinkForm from './components/imagelinkform/imagelinkform';
import Rank from './components/rank/rank';
import FaceRecognition from "./components/facerecognition/facerecognition";
import Login from "./components/login/login";
import SignUp from "./components/signup/signup";
import Navigation from "./components/navigation/navigation";

function App() {

  
  // *********** States **************
  let [searchInput, setSearchInput] = useState("");
  let [searchUrl, setSearchUrl] = useState("");

  let [box, setBox] = useState([]);

  let [user, setUser] = useState({
    _id: "",
    userName: "",
    email: "",
    password: "",
    entries: 0,
    joined: ""
  }); 

  // *********** Functions ***********
  const populateUser = (data) => { 
    setUser(prev => data); 
  };

  const calculateFaceBox = (data) => {
    setBox(prev => []);
    let output = [];
    const response = data.outputs[0].data.regions;
    const responseLength = data.outputs[0].data.regions.length;
    const image = document.getElementById("inputImg");
    const width = Number(image.width);
    const height = Number(image.height);

    for (let i = 0; i < responseLength; i++) {
      output[i] = {
        leftCol: response[i].region_info.bounding_box.left_col * width,
        topRow: response[i].region_info.bounding_box.top_row * height,
        rightCol: width - (response[i].region_info.bounding_box.right_col * width),
        bottomRow: height - (response[i].region_info.bounding_box.bottom_row * height)
      };
    }

    return output;
  };

  const displayFaceBox = (boxes) => {
    setBox(prev => boxes);
  };

  const onInputChange = (evt) => {
    setSearchInput(prev => evt.target.value);
  };

  const onButtonSubmit = () => {

    setSearchUrl(prev => searchInput);

    fetch("https://sheltered-castle-12743.herokuapp.com/imageurl", {
      method: "post",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ "imageUrl": searchInput })
    })
      .then(response => response.json())
      .then(response => {
        if (response.message === "success") {
          fetch("https://sheltered-castle-12743.herokuapp.com/image", {
            method: 'put',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ _id: user._id })
          })
            .then(response => response.json())
            .then(response => {
              if(response.user) {
                // setUser(prev => prev.entries = response.user.entries); (DONT USE THIS, YOU ARE SETTING THE WHOLE USER AS ENTRIES)
                user.entries = response.user.entries;  
                setSearchInput(prev => "");
              }
            })
            .catch(err => console.log(err));
            displayFaceBox(calculateFaceBox(response.reply));
        }
      })
      .catch(err => console.log(err));
  };

  const logout = () => { 
    setUser({
      _id: "",
      userName: "",
      email: "",
      password: "",
      entries: 0,
      joined: ""
    });

    setSearchInput("");
    setSearchUrl(""); 
  };

  useEffect(() => {
  }, [searchInput, searchUrl, user]);

  return (
    <AuthProvider>
      <Navigation userName={user.userName} onLogout={logout}/>

      <Logo />

      <Row>
        <Col>
          <Routes>
            <Route path="/" element={<Navigate to="/login" />} />
            <Route path="/login" element={<Login loadData={populateUser}/>} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/profile" element={
              <RequireAuth>
                <Rank userName={user.userName} entries={user.entries}/>
                <ImageLinkForm onInputChange={onInputChange} onButtonSubmit={onButtonSubmit} />
                <FaceRecognition box={box} searchInput={searchUrl} />
              </RequireAuth>
            } />
            <Route path="*" element={<div>Nothing Here</div>} />
          </Routes>
        </Col>
      </Row> 
    </AuthProvider>
  );
}

export default App;
