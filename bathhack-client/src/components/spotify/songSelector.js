import React from "react";
import { Card } from 'react-bootstrap';
import Player from "./player";
import SpotifyService from "./spotifyService";

class SongSelector extends React.Component {
    constructor(props) {
        super(props);

        this._spotifyService = new SpotifyService();

        this.state = {
            items: [],
            trackId: null,
            playing: false,
            search: "",
            loading: false,
        };
    }

    componentDidMount() {
        this._fetch();
    }

    _fetch = search => {
        fetch(`https://api.spotify.com/v1/search?type=track&market=from_token&limit=50&offset=0&q=${encodeURIComponent(search)}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this._spotifyService.GetAccessToken()}`
            }
        }).then(res => {return res.json();}).then(dta => {
            this.setState({items: dta.tracks.items})
        });
    }

    setPlaying = track => {
        this.setState({trackId: track, loading: true})
    }

    stopPlaying = () => {
        this.setState({playing: false, loading: false})
    }

    render() {
        return (
            <>
                <div>
                    <input type="text" value={this.state.search} onChange={e => this.setState({search: e.target.value})} />
                    <button onClick={() => this._fetch(this.state.search)}>Search</button>
                </div>
                <Player playing={this.state.playing} trackId={this.state.trackId} ready={() => {if(this.state.trackId != null && this.state.loading) this.setState({playing: true});}} />
                <div>
                    {this.state.items.map((item, index) => { return(
                        <Card style={{ width: '18rem', height:"355px", display: "inline-block" }} key={index}
                            onMouseEnter={() => this.setPlaying(item.id)}
                            onMouseLeave={this.stopPlaying}
                            >
                            <button
                                onClick={() => console.log("Fun")}
                                className="card-image-link"
                            >
                                {(item.album.images && item.album.images.length > 0) ? (
                                <Card.Img
                                    style={{width: "18rem"}}
                                    variant="top"
                                    src={item.album.images[0].url}
                                    alt=""
                                />
                                ) : (
                                <img src={"null"} alt="" />
                                )}
                            </button>
                            <Card.Body style={{textAlign: "center"}}>
                                <span style={{fontWeight: "600"}}>{item.name}</span><br />
                                {item.artists[0].name}
                            </Card.Body>
                        </Card>)
                    })}
                </div>
              </>
        )
    }
}

export default SongSelector;