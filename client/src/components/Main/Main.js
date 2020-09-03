import React, { useState } from "react";
import classes from "./Main.module.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Message from '../Message/Message';

const Main = () => {
  const [name, setName] = useState("");
  const [hasName, sethasName] = useState(false);

  return (
    <div className={classes.Main}>
      {!hasName && (
        <div className={classes.EnterName}>
          <h1>Can you tell me your name?</h1>
          <input
            type="text"
            placeholder="Enter Your Name"
            required
            autoFocus
            spellCheck="false"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          {name && <button onClick={() => sethasName(true)} >
            Proceed&nbsp;
            <FontAwesomeIcon icon="arrow-right" />
          </button>}
        </div>
      )}
      <div className={classes.ChatContainer}>
        <div className={classes.ChatWindow}>
          {/* Messages go here */}
          <Message />
          <Message />
        </div>
        <div className={classes.ChatControls}>
          <p className={classes.ControlIcon}>
            <FontAwesomeIcon icon="microphone" />
          </p>
          <input
            type="text"
            className={classes.Query}
            placeholder='Type "Give me the latest news updates"'
            autoFocus
            spellCheck="false"
          />
          <p className={classes.ControlIcon}>
            <FontAwesomeIcon icon="paper-plane" />
          </p>
        </div>

      </div>
    </div>
  );
};

export default Main;
