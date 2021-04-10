import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import logo from './logo.svg';
import './App.css';

const Creator = React.lazy(() => import("./pages/clients/creator"));
const Viber = React.lazy(() => import("./pages/clients/viber"));

const App = () => {
  return (
    <BrowserRouter>
      <React.Suspense fallback={"Loading..."}>
        <Switch>
          <Route path="/creator" render={props => <Creator {...props} />} />
          <Route path="/viber" render={props => <Viber {...props} />} />
        </Switch>
      </React.Suspense>
    </BrowserRouter>


    // <div className="App">
    //   <header className="App-header">
    //     <img src={logo} className="App-logo" alt="logo" />
    //     <p>
    //       Edit <code>src/App.js</code> and save to reload.
    //     </p>
    //     <a
    //       className="App-link"
    //       href="https://reactjs.org"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       Learn React
    //     </a>
    //   </header>
    // </div>
  );
}

export default App;
