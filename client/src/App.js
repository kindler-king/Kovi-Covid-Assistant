import React from "react";
import { Switch, Route } from "react-router-dom";

// NEWS API -> API KEY - 8d6e118f59c54ae0a3aaf8b83496380f
// Newscatcher Rapid API Key -> 237d3ddb5cmshf8270554cb06ec0p187d86jsnc404893cd6c2

import Main from "./components/Main/Main";
import Header from './components/Header/Header';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faMicrophone, faPaperPlane, faArrowRight } from '@fortawesome/free-solid-svg-icons'

library.add(faMicrophone, faPaperPlane, faArrowRight);

function App() {
  return (
    <div
      style={{
        width: "100vw",
        minHeight: '100vh',
        height: "auto",
        overflowX: "hidden",
        background: '#1d1c1c'
      }}
    >
      <Header />
      <Switch>
        <Route to="/" exact component={Main} />
      </Switch>
    </div>
  );
}

export default App;
