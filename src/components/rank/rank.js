import React, { useState, useEffect } from "react";

export default function Rank({userName, entries}) {

    // ************ Styling *************
    const divStyle = {
        marginTop: "5vh",
    };

    const divStyle2 = {
        width: "100%",
        display: "flex",
        justifyContent: "center",
    };

    useEffect(() => {
    }, [entries]);

    return (
        <div style={divStyle}>
            <div style={divStyle2}>
                <div><u>{ userName }</u> , number of images you recognized . . . </div>
            </div>

            <div style={divStyle2}>
                <h2>#{entries}</h2>
            </div>
        </div>
    );
}