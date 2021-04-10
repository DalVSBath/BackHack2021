import Player from '../../components/spotify/player';
import ArrowLayout from '../../components/ddr/arrowLayout';
import React, { useState } from 'react';


const Viber = () => {  
    const [playing, setPlaying] = useState(false);

    return (
        <>
            <Player playing={playing} trackId="6730LysZdBvgjo5MgWo4Tm" ready={() => console.log("Ready")} />
            <ArrowLayout />
            <p>this is the viber screen (Thanks for the amazing name Dan)</p>
            <button onClick={() => setPlaying(!playing)}>This Is Button</button>
        </>
    )
}

export default Viber;