import React, { useState, useEffect, Fragment } from "react";
import classes from "./Main.module.css";
import axios from "axios";
import io from "socket.io-client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ListenModal from "../ListenModal/ListenModal";
import Message from "../Message/Message";

const Main = () => {
  const [name, setName] = useState("");
  const [hasName, sethasName] = useState(false);
  // const [articles, setArticles] = useState(null);
  // const [stats, setStats] = useState(null);
  const [listen, setListen] = useState(false);
  const [speech, setSpeech] = useState("");
  const [loading, setLoading] = useState(false);
  const [socket, setSocket] = useState();
  const [messages, setMessages] = useState([]);

  const generateMessageObj = (value, author="Kovi") => {
    console.log(author);
    return {author, value}
  }

  // SOCKET USE-EFFECT - DEFINE AND HANDLE SOCKET EVENTS AFTER SOCKET CONNECTION HAS BEEN ESTABLISHED.
  useEffect(() => {
    if (socket) {
      socket.on("query-response", (response) => {
        koviSpeak(response);
        setMessages((prevState) => [
          ...prevState, generateMessageObj(response)
        ]);
        setLoading(false);
        console.log(messages);
      });
    }
  }, [socket]);

  // NAME USE-EFFECT - SET NAME OF CURRENT USER.
  useEffect(() => {
    if (name) {
      const clientSocket = io("localhost:8000", { query: `name=${name}` });
      setSocket(clientSocket);
      clientSocket.on("greetings", (msg) => {
        koviSpeak(msg);
        console.log(msg);
        setMessages((prevState) => [
          ...prevState,generateMessageObj(msg),
        ]);
        console.log(messages);
      });
    }
  }, [hasName]);

  // TEXT-TO-SPEECH FUNCTION
  const koviSpeak = (text) => {
    window.speechSynthesis.speak(new SpeechSynthesisUtterance(text));
  };

  // SERVER RESPONSE FUNCTION.
  const queryRasa = (query) => {
    setLoading(true);
    console.log(query);
    setMessages((prevState) => [...prevState, generateMessageObj(query, name)]);    
    socket.emit("query", query);
  };

  return (
    <div className={classes.Main}>
      {listen && (
        <ListenModal
          onSpeech={(sp) => queryRasa(sp)}
          cancel={() => setListen(false)}
        />
      )}
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
          {name && (
            <button onClick={() => sethasName(true)}>
              Proceed&nbsp;
              <FontAwesomeIcon icon="arrow-right" />
            </button>
          )}
        </div>
      )}
      <div className={classes.ChatContainer}>
        <div className={classes.ChatWindow}>
          {/* Messages go here */}
          {messages.map((msg) => (
            <Message author={msg.author} msg={msg.value} />
          ))}
        </div>
        <div className={classes.ChatControls}>
          {loading ? (
            <progress
              max="100"
              style={{ height: "5px", width: "95%" }}
            ></progress>
          ) : (
            <Fragment>
              <p
                className={classes.ControlIcon}
                onClick={() => setListen(true)}
              >
                <FontAwesomeIcon icon="microphone" />
              </p>
              <input
                type="text"
                className={classes.Query}
                placeholder='Say or type "Give me the latest coronavirus news updates"'
                autoFocus
                spellCheck="false"
                value={speech}
                onChange={(e) => setSpeech(e.target.value)}
              />
              <p
                className={classes.ControlIcon}
                onClick={() => queryRasa(speech)}
              >
                <FontAwesomeIcon icon="paper-plane" />
              </p>
            </Fragment>
          )}
        </div>
      </div>
    </div>
  );
};

export default Main;
