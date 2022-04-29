import React from "react";
import faceScan from "./face-id.png";

export default function Logo() {
    
    // ************* Styling **************
    const divStyle = {
        marginTop: "10vh",
        width: "100%",
        display: "flex",
        justifyContent: "center",
    };

    const divStyle2 = {
        marginTop: "15px",
        width: "100%",
        display: "flex",
        justifyContent: "center",
    };

    const imgStyle = {
        width: "100px",
        height: "100px", 
        border: " 5px black solid",
    };

    return (
        <>
            <div style={divStyle}>
                <img src={faceScan} alt="Face Logo" style={imgStyle}/>
            </div>
            <div style={divStyle2}>
                <h4>" <u>F A C E</u>&nbsp; R E C O G N I T I O N "</h4>
            </div>
        </>
    );
}