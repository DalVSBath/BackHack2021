import Cookies from "../cookies";
import { SocketContext } from "../../App";

const SpotifyAccessToken = `SpotifyAccessToken_BH2021`;
const SpotifyRefreshToken = `SpotifyRefreshToken_BH2021`;
const SpotifyTokenExpiry = `SpotifyTokenExpiry_BH2021`;

class SpotifyService {
    GetAccessToken() {
        var expires = Date.parse(Cookies.Get(SpotifyTokenExpiry));
        if(expires <= new Date()){
            this.RefreshAccessToken();
        }

        return Cookies.Get(SpotifyAccessToken);
    }

    IsValid() {
        var expires = Date.parse(Cookies.Get(SpotifyTokenExpiry));
        return (expires <= new Date());
    }
    static contextType = SocketContext;

    SetAccessToken(AccessToken, ExpiresIn) {
        Cookies.Set(SpotifyAccessToken, AccessToken);
        Cookies.Set(SpotifyTokenExpiry, new Date((new Date()).getTime() + (ExpiresIn - (5*60)) * 1000));
    }
    
    SetAllTokens(TokenSet) {
        Cookies.Set(SpotifyAccessToken, TokenSet.access_token);
        Cookies.Set(SpotifyRefreshToken, TokenSet.refresh_token);
        Cookies.Set(SpotifyTokenExpiry, new Date((new Date()).getTime() + (TokenSet.expires_in - (5*60)) * 1000));
    }

    RefreshAccessToken() {
        this.context.AddAccessCallback((tokenSet => {this.SetAccessToken(tokenSet.access_token, tokenSet.expires_in);}).bind(this))
        this.context.sendRefresh(Cookies.Get(SpotifyRefreshToken));
    }
}

export default SpotifyService;