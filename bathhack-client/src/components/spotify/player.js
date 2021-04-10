import React from "react";
import Script from 'react-load-script'
import { SocketContext } from "../../App";
class Player extends React.Component {
    constructor(props) {
        super(props);

        this.player = null;

        this.state = {
            device_id: null,
            token: "BQAhwloNRiDgPnF3NE_y9W6WNuWaReoUGZUWwafb7nvUlpa6-kq2-Lfqaoyf4mc1GMV-8DgjZYJgO8PWmPl-V4RvrILjAQv-3ZP4QFBAStDhEybgly4zhTTg61dB6Q2IcL2SDmYf2ZKRw0Pd3aQB-NDyU4z9cMqP",
        }
    }
    static contextType = SocketContext;

    updateTime = time => {
        this.player.seek(time * 1000).then(() => {
            console.log('Changed position!');
          });
    }

    componentDidUpdate(prevProps) {
        if(this.props.playing !== prevProps.playing) {
            this.togglePlayback();
        }
    }

    togglePlayback = () => {
        this.player.togglePlay().then(() => {
            console.log(`Now playing: ${this.props.playing}`);
          });
    }

    resume = () => {
        this.player.resume().then(() => {
            console.log('Resumed! + ' + this.context);
            this.player.getVolume().then(volume => {
                let volume_percentage = volume * 100;
                console.log(`The volume of the player is ${volume_percentage}%`);
              });
          });
    }

    pause = () => {
        this.player.pause().then(() => {
            console.log('Paused!');
          });
    }

    play = ({
        spotify_uri,
        id,
      }) => {
          fetch(`https://api.spotify.com/v1/me/player/play?device_id=${id}`, {
            method: 'PUT',
            body: JSON.stringify({ uris: [spotify_uri] }),
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${this.state.token}`
            },
          }).then(() => {
              if(this.props.playing) {
                  this.resume();
              }else{
                  this.pause();
              }
              this.props.ready();
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
            const token = this.state.token;
            this.player = new window.Spotify.Player({
                name: 'Beat Breaker',
                getOAuthToken: cb => { cb(token); }
            });

        // Error handling
        this.player.addListener('initialization_error', ({ message }) => { console.error(message); });
        this.player.addListener('authentication_error', ({ message }) => { console.error(message); });
        this.player.addListener('account_error', ({ message }) => { console.error(message); });
        this.player.addListener('playback_error', ({ message }) => { console.error(message); });

            // Playback status updates
        //this.player.addListener('player_state_changed', state => { console.log(state); });

        // Ready
        this.player.addListener('ready', ({ device_id }) => {
            console.log('Ready with Device ID', device_id);

            this.setState({device_id: device_id});
            this.play({
                id: device_id,
                spotify_uri: 'spotify:track:' + this.props.trackId,
                });
        });

        // Not Ready
        this.player.addListener('not_ready', ({ device_id }) => {
            console.log('Device ID has gone offline', device_id);
        });

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