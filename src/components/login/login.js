import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useNavigate } from 'react-router-dom';
import { useAuth } from "../auth/auth";

export default function Login({ loadData }) {
    // ******** States **********
    let [userName, setUserName] = useState("");
    let [password, setPassword] = useState("");

    let [loading, setLoading] = useState(false);
    let [errorMsg, setErrorMsg] = useState(false);
    let navigate = useNavigate();

    const auth = useAuth(); 
        
    // ************* Styling *************
    const divStyle = {
        width: "100%",
        maxHeight: "80vh",
        display: "flex",
        justifyContent: "center",
        marginTop: "40px",
        marginBottom: "40px",
        padding: "10px",
        background: "#141414",
    };

    const formStyle = {
        width: "40%",
        color: "black",
        margin: "10px",
        padding: "20px", 
        background: "#E8E8E8",
        borderRadius: "5px",
    };

    const divStyle2 = {
        width: "100%",
        display: "flex",
        justifyContent: "center",
    };

    // ********* Functions *************
    const onUserNameChange = (evt) => {
        setUserName(prev => evt.target.value);
    };

    const onPasswordChange = (evt) => {
        setPassword(prev => evt.target.value);
    };

    const onButtonSubmit = () => {
        setLoading(true);
        fetch("https://sheltered-castle-12743.herokuapp.com/login", {
            method: "post",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ userName: userName, password: password })
        })
        .then(response => response.json())
        .then(response => {
            console.clear(); 
            if(response.message === "success") {
                setLoading(false);
                loadData(response.user);
                setErrorMsg(false);
                auth.login(); 
                navigate("/profile");
            }
            else {
                setLoading(false); 
                setErrorMsg(true);
                auth.logout();
            }
        })
        .catch(err => {
            console.log(err);
            setLoading(false);
            setErrorMsg(true);
            auth.logout();
        });
    };

    return ( 
        <div style={divStyle}>
            <Form style={formStyle}>
                <div style={divStyle2}>
                    <h4>LOGIN</h4>
                </div>
                <Form.Group className="mb-3">
                    <Form.Label>User Name</Form.Label>
                    <Form.Control id="login-userName" name="userName" type="text" placeholder="User Name" onChange={onUserNameChange} autoFocus/>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Password</Form.Label>
                    <Form.Control id="login-password" name="password" type="password" placeholder="Password" onChange={onPasswordChange} />
                </Form.Group>
                <div style={divStyle2}>
                    <Button variant="primary" onClick={onButtonSubmit} disabled={loading}>LOGIN</Button>
                </div>

                {errorMsg ? 
                    <div style={divStyle2}>
                        <h6 style={{color: "red", marginTop: "10px"}}>UserName or Password Incorrect</h6>
                    </div>
                :
                " "
                }
            </Form> 
        </div>
    );
}