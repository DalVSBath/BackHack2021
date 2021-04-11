import React from "react";
import logo from "../../content/spotify-logo.svg";

class Login extends React.Component {
    render() {
        return (
            <div style={{position: "absolute", display: "flex", alignItems: "center", justifyContent: "center", flexFlow: "column", height:"100vh", width: "100vw"}}>
                <img src={logo} alt="spotify" style={{height: "35%", paddingBottom: "20px;"}} />
                <button style={{ whiteSpace: 'nowrap', fontSize: "72px", backgroundColor: "Transparent", backgroundRepeat: "no-repeat", border: "none", cursor: "pointer", overflow: "hidden", outline: "none"}}>
                    <a style={{textDecoration: "none"}} href={
                        `https://accounts.spotify.com/authorize?client_id=50f563707d1041d5bc9237357be49ee6&response_type=code&redirect_uri=${encodeURIComponent("http://localhost:3000/spotify/callback/")}&scope=user-read-private%20user-read-email%20streaming&show_dialog=true`
                    }>Connect to Spotify</a>
                </button>
                
            </div>
        );
    }
}

export default Login