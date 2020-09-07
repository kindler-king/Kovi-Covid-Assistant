import React, { useEffect, useState } from "react";

import classes from "./ListenModal.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;
let recognition = new SpeechRecognition();

recognition.continuous = true;
recognition.lang = "en-US";
recognition.interimResults = true;

const ListenModal = (props) => {
  const [interim, setInterim] = useState("");
  const [transcript, setTranscript] = useState("");

  useEffect(() => {
    recognition.start();
  }, []);

  const { onSpeech, cancel } = props;

  useEffect(() => {
    recognition.onresult = (e) => {
      for (let res of e.results) {
        const result = res[0].transcript;
        if (result) {
          if (res.isFinal) {
            setTranscript(result);
            setInterim("");
            recognition.stop();
            // LET THE USER SEE THE FINAL RESULT BEFORE CLOSING MODAL
            setTimeout(() => {
              onSpeech(result);
              cancel();
            }, 1500);
          } else {
            setInterim(result);
          }
        }
      }
    };
  }, [transcript, onSpeech, cancel]);

  return (
    <div className={classes.ListenModal}>
      <div className={classes.Modal}>
        <h1>
          Tell me your query&nbsp;
          <FontAwesomeIcon icon="microphone" />
        </h1>
        {interim && (
          <p className={classes.ModalText} style={{ color: "gray" }}>
            {interim}
          </p>
        )}
        {transcript && <p className={classes.ModalText}>{transcript}</p>}
        {!transcript && !interim && (
          <p className={classes.ModalText}>Listening for query...</p>
        )}
        <button
          className={classes.Cancel}
          onClick={() => {
            recognition.stop();
            props.cancel();
          }}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default ListenModal;
