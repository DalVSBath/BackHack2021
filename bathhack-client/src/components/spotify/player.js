import React from "react";
import Script from 'react-load-script'
import { SocketContext } from "../../App";
import SpotifyService from "./spotifyService";
class Player extends React.Component {
    constructor(props) {
        super(props);

        this.player = null;
        this._spotifyService = new SpotifyService();

        this.state = {
            device_id: null,
        }
    }
    static contextType = SocketContext;

    updateTime = time => {
        this.player.seek(time * 1000).then(() => {
            console.log('Changed position!');
          });
    }

    componentDidUpdate(prevProps) {
        if(prevProps.playing !== this.props.playing){
            if(this.props.playing) {
                this.resume();
            }else {
                this.pause();
            }
        }

        if(this.props.trackId !== prevProps.trackId) {
            this.play({
                id: this.state.device_id,
                spotify_uri: 'spotify:track:' + this.props.trackId,
                });
        }

        if(this.player !== null && this.props.timeStamp !== prevProps.timeStamp) {
            this.player.getCurrentState().then(s => {
                //if(!s)
                    //console.error("user not musicing");
                this.props.ready(s);
            });
        }

    }

    togglePlayback = () => {
        this.player.togglePlay().then(() => {
            console.log(`Now playing: ${this.props.playing}`);
          });
    }

    resume = () => {
        this.player.resume().then(() => {
            this.player.getCurrentState().then(s => {if(s && s.paused) this.resume();})
            console.log('Resumed!');
          });
    }

    pause = () => {
        this.player.pause().then(() => {
            this.player.getCurrentState().then(s => {if(s && !s.paused) this.pause();})
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
              'Authorization': `Bearer ${this._spotifyService.GetAccessToken()}`
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
          } else if(window.onSpotifyWebPlaybackSDKReady) {
              try {
                window.onSpotifyWebPlaybackSDKReady = resolve;
              } catch (e) {
                  setTimeout(resolve, 1500);
              }
          }else {
            setTimeout(resolve, 1500);
          }
        }).then(() => {
            const token = this._spotifyService.GetAccessToken();
            this.player = new window.Spotify.Player({
                name: 'Beat Breaker',
                getOAuthToken: cb => { cb(token); }
            });

        // Error handling
        //this.player.addListener('initialization_error', ({ message }) => { console.error(message); });
        //this.player.addListener('authentication_error', ({ message }) => { console.error(message); });
        //this.player.addListener('account_error', ({ message }) => { console.error(message); });
        this.player.addListener('playback_error', ({ message }) => { console.error(message); });

            // Playback status updates
        this.player.addListener('player_state_changed', state => { 
            if (
                this.state && state
                && state.track_window.previous_tracks.find(x => x.id === state.track_window.current_track.id)
                && state.paused
                ) {
                    this.pause();
                    console.log('Track ended');
                    this.props.TrackEnd(true);
              }
            if(this.props.playing) {
                this.resume();
            }else{
                this.pause();
            } 
        });

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
        console.log("Well Well Well")
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