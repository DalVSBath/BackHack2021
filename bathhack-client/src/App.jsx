import React from 'react';
import {BrowserRouter, Route, Switch, Link} from 'react-router-dom';
import { getCreatorSocket, getViberSocket } from './components/sockets/getSockets';
import './App.css';
import video1 from './content/vd1.mp4'


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
    <><div>
        <video src={video1} playsinline autoPlay muted loop id="myVideo"/>
      </div>
      <BrowserRouter>
        <React.Suspense fallback={"Loading..."}>
          <Switch>
<<<<<<< HEAD
            <Route path="/" exact = {true} render={props => 
              
              <div><h1> We're using react... <Link  to={"/Log"}>Go to Log</Link> </h1></div>
      
=======
            <Route path="/" exact={true} render={props => 
              <div style={{position: "absolute", display: "flex", alignItems: "center", justifyContent: "center", height:"100vh", width: "100vw"}}><div style={{ width:"100vw", textAlign:"center", display:"block" }}><h1 style={{fontSize: "90px", width:"100%"}}>Welcome to ...</h1></div><br /><div><Link style={{fontSize: "70px"}} to={"/Log"}>Click to Start</Link></div></div>
>>>>>>> e26961e9f93b4876f37d514be15a4a1985fc2336
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
