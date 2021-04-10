import React from "react";
import qs from "qs";
import { Redirect } from "react-router";
import { SocketContext } from "../../App";
import SpotifyService from "../../components/spotify/spotifyService";

class Callback extends React.Component {
    constructor(props) {
        super(props);
        let itms = qs.parse(props.location.search.replace("?", ""));

        this._spotifyService = new SpotifyService();
        this.state = {
            redirect: null,
            code: itms.code,
        }
    }
    static contextType = SocketContext;

    componentDidMount() {
        this.context.AddRefreshCallback(this.setToken.bind(this))
        this.context.sendCode(this.state.code);
    }

    setToken(tokenSet) {
        console.log(tokenSet);
        this._spotifyService.SetAllTokens(tokenSet);
    }

    render() {
        if(this.state.redirect)
            return <Redirect to={"/selector"} />

        return (
            <div>Loading...</div>
        )
    }
}

export default Callback