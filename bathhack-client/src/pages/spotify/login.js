import React from "react";

class Login extends React.Component {
    render() {
        return (
            <a href={
                `https://accounts.spotify.com/authorize?client_id=50f563707d1041d5bc9237357be49ee6&response_type=code&redirect_uri=${encodeURIComponent("http://localhost:3000/spotify/callback/")}&scope=user-read-private%20user-read-email%20streaming&show_dialog=true`
            }>Login</a>
        );
    }
}

export default Login