import React from "react";
import { Navbar, Container, Nav, Button} from "react-bootstrap";
import { LinkContainer } from 'react-router-bootstrap';
import { useAuth } from "../auth/auth";

export default function Navigation({ userName, onLogout }) {
    // *********** States **************
    const auth = useAuth(); 

    // *********** Styling *************
    const itemStyle = {
        marginRight: '10px',
    };

    // ********** Functions ***********
    const logout = () => {
        // setUser({
        //     _id: "",
        //     userName: "",
        //     email: "",
        //     password: "",
        //     entries: 0,
        //     joined: ""
        // });
        auth.logout();
        onLogout();
    };

    return (
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Container>
                <Navbar.Brand className="justify-content-center">Face Detection App</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav" className="justify-content-end">

                    {(!auth.userLoggedIn ?
                        <Nav>
                            <LinkContainer to="/signup" style={itemStyle}>
                                <Button variant="primary">Sign Up</Button>
                            </LinkContainer>
                            <LinkContainer to="/login" style={itemStyle}>
                                <Button variant="outline-success" style={itemStyle}>Login</Button>
                            </LinkContainer>
                        </Nav>
                        :
                        <Nav>
                            <Navbar.Text style={itemStyle}> Hello, {userName} </Navbar.Text>
                            <LinkContainer to="/login" style={itemStyle}>
                                <Button variant="outline-danger" onClick={logout} style={itemStyle}>Logout</Button>
                            </LinkContainer>
                        </Nav>
                    )}
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
} 