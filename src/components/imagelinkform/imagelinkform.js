import React, {useEffect} from "react";
import { Container, Form, Button, Col, Row } from "react-bootstrap";

export default function ImageLinkForm({onInputChange, onButtonSubmit}) {

    // ************ Styling **********
    const searchBoxStyle = { 
        display: "flex",
        justifyContent: "center",
        marginTop: "5vh"
    };

    const divStyle = {
        width: "60%",
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center", 
        backgroundColor: "#669DB3FF",
        borderRadius: "5px", 
    };

    const colStyle = {
        margin: "10px", 
    };

    const colButtonStyle = {
        width: "100%",
        display: "flex",
        justifyContent: "center",
    };

    return (
        <Container>
            <Form>
                <Form.Group as={Row} className="mb-3" controlId="formGroupEmail" style={searchBoxStyle}>
                    <div style={divStyle}>
                        <Col sm={10} style={colStyle}>
                            <Form.Control type="text" placeholder="Enter Image Url" onChange={onInputChange}/>  
                        </Col> 
                        <Col style={colButtonStyle}>
                            <Button variant="warning" style={colStyle} onClick={onButtonSubmit}>Detect</Button> 
                        </Col>
                    </div>
                </Form.Group>
            </Form>
        </Container>
    );
}