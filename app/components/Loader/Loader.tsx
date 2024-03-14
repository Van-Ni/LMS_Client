import React from "react";
import "./Loader.css";

const Loader = () => {
    return (
        <div className="h-screen" style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
            <div className="loader"></div>
        </div>
    );
};

export default Loader;
