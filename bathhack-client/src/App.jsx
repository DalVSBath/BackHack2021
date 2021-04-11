import React from 'react';
import {BrowserRouter, Route, Switch, Link} from 'react-router-dom';
import { getCreatorSocket, getViberSocket } from './components/sockets/getSockets';
import './App.css';
import video1 from './content/vd1.mp4'
import logo from "./content/logo3.png"


const SongSelector  = React.lazy(() => import('./components/spotify/songSelector'));

const Creator = React.lazy(() => import("./pages/clients/creator"));
const Viber = React.lazy(() => import("./pages/clients/viber"));
const SpotifyCallback = React.lazy(() => import("./pages/spotify/callback"));
const SpotifyLogin = React.lazy(() => import("./pages/spotify/login"));

const Log = React.lazy(() => import("./pages/creatorOrViber"));

export const SocketContext = React.createContext(null);
const vSocket = getViberSocket({requestViber: true});
const cSocket = getCreatorSocket({requestCreator: true});

const App = () => {
  return (
    <><div sytle={{alignItems: "center"}}>
        <video src={video1} playsinline autoPlay muted loop id="myVideo"/>
      </div>
      <BrowserRouter>
        <React.Suspense fallback={"Loading..."}>
          <Switch>
            <Route path="/" exact={true} render={props => 
              <div style={{position: "absolute", display: "flex", alignItems: "center", justifyContent: "center", height:"130vh", width: "100vw"}}>
                <div style={{height:"20vh"}}> <h1 style={{fontSize: "70px",top:"10vh", width:"100%"}}>Welcome to </h1></div>
                <div style={{position: "absolute",top:"30vh",height:"60vh", alignItems:"center",justifyItems:"center"}}><img src={logo}/></div>
                <div style={{height:"20vh",top:"90vh",justifyItems:"center"}}><Link style={{fontSize: "35px", textAlign: "center"}} to={"/Log"}>{"\n"}Click to Start</Link></div>
                </div>
            } />
            <Route path="/creator" render={props => <SocketContext.Provider value={cSocket}>
                <Creator {...props} />
              </SocketContext.Provider>} />
            <Route path="/viber" render={props => <SocketContext.Provider value={vSocket}>
                <Viber {...props} />
              </SocketContext.Provider>} />
            <Route path="/selector" render={props => <SocketContext.Provider value={cSocket}>
                <SongSelector {...props} />
              </SocketContext.Provider>} />
            <Route path="/spotify/callback" render={props => <SocketContext.Provider value={cSocket}>
                <SpotifyCallback {...props} />
              </SocketContext.Provider>} />
            <Route path="/spotify/login" render={props => <SocketContext.Provider value={cSocket}>
                <SpotifyLogin {...props} />
              </SocketContext.Provider>} />

              <Route path="/Log" render={props => <SocketContext.Provider value={cSocket}>
                <Log {...props} />
              </SocketContext.Provider>} />
              
          </Switch>
        </React.Suspense>
      </BrowserRouter>
      </>
  );
}

export default App;
