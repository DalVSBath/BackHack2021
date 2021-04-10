import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import { getCreatorSocket, getViberSocket } from './components/sockets/getSockets';
import './App.css';

const Creator = React.lazy(() => import("./pages/clients/creator"));
const Viber = React.lazy(() => import("./pages/clients/viber"));


export const SocketContext = React.createContext(null);
const vSocket = getViberSocket();
const cSocket = getCreatorSocket();


const App = () => {
  return (
      <BrowserRouter>
        <React.Suspense fallback={"Loading..."}>
          <Switch>
            <Route path="/creator" render={props => <SocketContext.Provider value={cSocket}>
                <Creator {...props} />
              </SocketContext.Provider>} />
            <Route path="/viber" render={props => <SocketContext.Provider value={vSocket}>
                <Viber {...props} />
              </SocketContext.Provider>} />
          </Switch>
        </React.Suspense>
      </BrowserRouter>
  );
}

export default App;
