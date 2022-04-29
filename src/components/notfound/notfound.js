import React from "react";

export default function NotFound() {
    // ********** Style **************
    const divStyle = {
        width: "100%",
        height: "auto",
        display: "flex",
        justifyContent: "center",
        marginTop: "40px",
        marginBottom: "40px",
        padding: "10px",
        color: "red"
    };

    return(
        <div style={divStyle}>
            <h4><strong><u>Invalid Routing Path</u></strong></h4>
        </div>
    );
}