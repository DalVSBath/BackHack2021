import React, { useState } from 'react';
import Player from '../../components/spotify/player'


const Viber = () => {  
    const [playing, setPlaying] = useState(false);

    return (
        <>
            <Player playing={playing} trackId="6730LysZdBvgjo5MgWo4Tm" ready={() => console.log("Ready")} />
            <p>this is the viber screen (Thanks for the amazing name Dan)</p>
            <button onClick={() => setPlaying(!playing)}>This Is Button</button>
        </>
    )
}

export default Viber;