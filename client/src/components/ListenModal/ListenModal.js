import React, { useEffect, useState } from "react";

import classes from "./ListenModal.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();

recognition.continuous = true;
recognition.lang = "en-US";
recognition.interimResults = true;

const ListenModal = (props) => {
  const [interim, setInterim] = useState("");
  const [transcript, setTranscript] = useState("");

  useEffect(() => {
    recognition.start();
    recognition.onresult = (e) => {
      for (let res of e.results) {
        const result = res[0].transcript;
        if (result){
          if (res.isFinal) {
            setTranscript(result);
            setInterim("");
            // LET THE USER SEE THE FINAL RESULT BEFORE CLOSING MODAL
            setInterval(() => {
              recognition.stop();
              props.onSpeech(transcript);
              props.cancel();
            }, 1500);
          } else {
            setInterim(result);
          }
        }
      }
    };
  }, []);

  const recognitionStop = () => {
    recognition.stop();
    props.cancel();
  };

  return (
    <div className={classes.ListenModal}>
      <div className={classes.Modal}>
        <h1>Tell me your query</h1>
        {interim && (
          <p className="my-2" style={{ color: "gray" }}>
            {interim}
          </p>
        )}
        {transcript && <p className="my-2 text-dark ">{transcript}</p>}
        {!transcript && !interim && (<p className="text-dark font-weight-bold" >Bol na bhosdike</p>)}
        <h1>
          <FontAwesomeIcon icon="microphone" />
        </h1>
        <button className={classes.Cancel} onClick={recognitionStop}>
          Cancel
        </button>
      </div>
    </div>
  );
};

export default ListenModal;
