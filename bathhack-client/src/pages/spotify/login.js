import React from "react";
import { Redirect } from "react-router";
import SpotifyService from "../../components/spotify/spotifyService";
import logo from "../../content/spotify-logo.svg";

class Login extends React.Component {
    constructor(props) {
        super(props);

        this._spotifyService = new SpotifyService();
    }

    render() {
        if(this._spotifyService.IsValid())
            return <Redirect push to={"/Log"} />

        return (
            <div style={{position: "absolute", display: "flex", alignItems: "center", justifyContent: "center", flexFlow: "column", height:"100vh", width: "100vw"}}>
                <a style={{textDecoration: "none", flexFlow: "colmn"}} href={
                    `https://accounts.spotify.com/authorize?client_id=50f563707d1041d5bc9237357be49ee6&response_type=code&redirect_uri=${encodeURIComponent("http://localhost:3000/spotify/callback/")}&scope=user-read-private%20user-read-email%20streaming&show_dialog=true`
                }>
                    <div style={{textAlign: "center"}}>
                    <img src={logo} alt="spotify" style={{height: "30vh", paddingBottom: "20px;"}} />
                    </div>
                    <button style={{ whiteSpace: 'nowrap', fontSize: "72px", backgroundColor: "Transparent", backgroundRepeat: "no-repeat", border: "none", cursor: "pointer", overflow: "hidden", outline: "none"}}>
                        Connect to Spotify
                    </button>
                </a>
                
            </div>
        );
    }
}

export default Login