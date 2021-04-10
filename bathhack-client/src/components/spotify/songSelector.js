import React from "react";
import { Card } from 'react-bootstrap';
import Player from "./player";

class SongSelector extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            items: [],
            trackId: "6730LysZdBvgjo5MgWo4Tm",
            playing: false,
            token: "BQDzuPYCvuExURWgrvFe7xY-D_r_M_G12Sn35td28s8T-hG2Oy4jky2gNEpQ9UP_eksHE_t9eJng7lII5mxgqTxHyPBD2wUVu7DVq6J1iBJdAFXwKbn3yI2smQK9brYv9mzT6U9qfZk3xkFpccYarfD5X7vC0u-o",
        };
    }

    componentDidMount() {
        this._fetch();
    }

    _fetch = search => {
        fetch(`https://api.spotify.com/v1/search?type=track&market=from_token&offset=0&q=${encodeURIComponent(search)}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.state.token}`
            }
        }).then(res => {return res.json();}).then(dta => {
            this.setState({items: dta.tracks.items})
        });
    }

    render() {
        return (
            <>
                <Player playing={this.state.playing} trackId={this.state.trackId} ready={() => console.log("Ready")} />
                {this.state.items.map((item, index) => { return(
                    <Card style={{ width: '18rem' }} key={index}>
                        <a
                            target="_blank"
                            href="nowhere"
                            rel="noopener noreferrer"
                            className="card-image-link"
                        >
                            {(item.album.images && item.album.images.length > 0) ? (
                            <Card.Img
                                variant="top"
                                src={item.album.images[0].url}
                                alt=""
                            />
                            ) : (
                            <img src={"null"} alt="" />
                            )}
                        </a>
                        <Card.Body>
                            <Card.Title>{item.artists[0].name}</Card.Title>
                            {item.id}
                        </Card.Body>
                    </Card>)
                })}
              </>
        )
    }
}

export default SongSelector;