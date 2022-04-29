import React from "react";
import "./facerecognition.css";


export default function FaceRecognition({box, searchInput}) { 

    // ************* Styling *************
    const divStyle = {
        width: "100%",
        height: "auto", 
        display: "flex",
        justifyContent: "center",
        marginTop: "40px", 
        marginBottom: "40px",
        padding: "10px",
    };
    
    const divStyle2 = {
        position: "absolute",
        border: "30px solid #fad1d0",
    };

    const imgStyle = {
        width:"500px",
        height: "auto",
    };

    const divStyle3 = {
        color: "red",
    };
    
    return (
        <div style={divStyle}>
        {(searchInput !== "") ? 
            <div style={divStyle2}>
                <img id="inputImg" src={searchInput} alt="Search Input" style={imgStyle}/>
                {box.map((element, i) => {
                    return <div key={i} className="bounding-box" style={{ top: element.topRow, right: element.rightCol, bottom: element.bottomRow, left: element.leftCol}}></div>;
                })}
            </div> 
        :
            <div style={divStyle3}>
                    <strong>Please enter a valid url for image that is either in PNG or JPEG format</strong>
            </div>
        }
        </div>
    );
}