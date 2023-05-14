import React from 'react'
import ReactDOM from "react-dom";
import LoaderImg from "../../assets/loader.gif";
import "./Loader.scss";

const Loader = () => {
    return ReactDOM.createPortal(
        <div className="wrapper">
            <div className="loader">
                <img src={LoaderImg} alt="Loading..." />
            </div>
        </div>,
        document.getElementById("loader")
    )

}

export const SpinnerImg = () => {
    return (
        <div className="--center-all">
            <img src={LoaderImg} alt="Loading..." />
        </div>
    )
}



export default Loader
