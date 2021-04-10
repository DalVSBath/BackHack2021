import React from "react";
import Script from 'react-load-script'
class Player extends React.Component {
    constructor(props) {
        super(props);

        this.player = null;

        this.state = {
            device_id: null,
            token: "BQCm5ZCts0ZwCYRk8GStIQ_ht-AQfypaCvsgKFhZmVPkBcDuRYACU5SlqQkHCKytMAmcSya_pq28lU5PYoEZ7fG6l04mIIu94Osf_KCFAlBvVvxUNa2x7aBDAKLrUK2NGvU1u9EL6VIFIbfaxUByPfJewwaXXVwH",
        }
    }
    

    resume = () => {
        this.player.togglePlay().then(() => {
            console.log('Resumed!');
          });
    }

    play = ({
        spotify_uri,
        id,
        token
      }) => {
          fetch(`https://api.spotify.com/v1/me/player/play?device_id=${id}`, {
            method: 'PUT',
            body: JSON.stringify({ uris: [spotify_uri] }),
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer BQCm5ZCts0ZwCYRk8GStIQ_ht-AQfypaCvsgKFhZmVPkBcDuRYACU5SlqQkHCKytMAmcSya_pq28lU5PYoEZ7fG6l04mIIu94Osf_KCFAlBvVvxUNa2x7aBDAKLrUK2NGvU1u9EL6VIFIbfaxUByPfJewwaXXVwH`
            },
          });
      };
    handleScriptLoad = () => {
        return new Promise(resolve => {
          if (window.Spotify) {
            resolve();
          } else {
            window.onSpotifyWebPlaybackSDKReady = resolve;
          }
        }).then(() => {
            const token = 'BQCm5ZCts0ZwCYRk8GStIQ_ht-AQfypaCvsgKFhZmVPkBcDuRYACU5SlqQkHCKytMAmcSya_pq28lU5PYoEZ7fG6l04mIIu94Osf_KCFAlBvVvxUNa2x7aBDAKLrUK2NGvU1u9EL6VIFIbfaxUByPfJewwaXXVwH';
            this.player = new window.Spotify.Player({
                name: 'Web Playback SDK Quick Start Player',
                getOAuthToken: cb => { cb(token); }
            });

        // Error handling
        this.player.addListener('initialization_error', ({ message }) => { console.error(message); });
        this.player.addListener('authentication_error', ({ message }) => { console.error(message); });
        this.player.addListener('account_error', ({ message }) => { console.error(message); });
        this.player.addListener('playback_error', ({ message }) => { console.error(message); });

            // Playback status updates
            this.player.addListener('player_state_changed', state => { console.log(state); });

            // Ready
            this.player.addListener('ready', ({ device_id }) => {
                console.log('Ready with Device ID', device_id);

                this.setState({device_id: device_id});
            });

            // Not Ready
            this.player.addListener('not_ready', ({ device_id }) => {
                console.log('Device ID has gone offline', device_id);
            });

            var time = setTimeout(() => {
                this.play({
                id: this.state.device_id,
                token: "BQCm5ZCts0ZwCYRk8GStIQ_ht-AQfypaCvsgKFhZmVPkBcDuRYACU5SlqQkHCKytMAmcSya_pq28lU5PYoEZ7fG6l04mIIu94Osf_KCFAlBvVvxUNa2x7aBDAKLrUK2NGvU1u9EL6VIFIbfaxUByPfJewwaXXVwH",
                spotify_uri: 'spotify:track:7xGfFoTpQ2E7fRF5lN10tr',
                });
                clearTimeout(time);
            }, 2500);

            var time2 = setTimeout(() => {
                this.resume();
                clearTimeout(time2);
            }, 5000)

            // Connect to the player!
            this.player.connect();
            });
      }

    handleScriptError = e => {
        console.error(e);
    }

    render() {
        return (
            <Script 
                url="https://sdk.scdn.co/spotify-player.js" 
                onError={this.handleScriptError} 
                onLoad={this.handleScriptLoad}
            />
        );
    }
}

export default Player;