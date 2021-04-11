import React from 'react';
import logo from "../content/logo3.png";
import {Link} from 'react-router-dom';
import sound from "../content/music.mp3";
import ReactSound from 'react-sound';

const Main = () => {

    return (
        <>
            <ReactSound
            url = {sound}
            playStatus={ReactSound.status.PLAYING}
            />
        <div style={{position: "absolute", display: "flex", alignItems: "center", justifyContent: "center", height:"100vh", width: "100vw"}}>
            <div style={{height:"90vh"}}> <h1 style={{fontSize: "70px",top:"10vh", width:"100%"}}>Welcome to </h1></div>
            <div style={{position: "absolute",top:"35vh",height:"35vh", alignItems:"center",justifyItems:"center"}}><img src={logo}/></div>
            <div style={{position: "absolute",height:"30vh",top:"60vh",}}>
                <Link to={"/Spotify/Login"}>
                    <button style={{ whiteSpace: 'nowrap', fontSize: "72px", backgroundColor: "Transparent", backgroundRepeat: "no-repeat", border: "none", cursor: "pointer", overflow: "hidden", outline: "none"}}>
                        {"> CLICK TO START <"}
                    </button>
                </Link>
            </div>
        </div>
        </>
    );
}

export default Main;