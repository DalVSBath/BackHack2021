import React from 'react';
import logo from "../content/logo3.png";
import {Link} from 'react-router-dom';

const Main = () => {

    return (
        <div style={{position: "absolute", display: "flex", alignItems: "center", justifyContent: "center", height:"100vh", width: "100vw"}}>
            <div style={{height:"90vh"}}> <h1 style={{fontSize: "70px",top:"10vh", width:"100%"}}>Welcome to </h1></div>
            <div style={{position: "absolute",top:"35vh",height:"35vh", alignItems:"center",justifyItems:"center"}}><img src={logo}/></div>
            <div style={{position: "absolute",height:"30vh",top:"60vh",}}>
                <Link style={{fontSize: "80px"}} to={"/Spotify/Login"}>
                    <button style={{backgroundColor: "Transparent", backgroundRepeat: "no-repeat", border: "none", cursor: "pointer", overflow: "hidden", outline: "none"}}>
                        Click to Start
                    </button>
                </Link>
            </div>
        </div>
    );
}

export default Main;