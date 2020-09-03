import React, { Fragment } from "react";

import classes from "./Message.module.css";

const Message = () => {
  return (
    <div className={classes.MessageContainer}>
      <div className={classes.Message}>
        <p className={classes.Author}>
          <em>Author</em>
        </p>
        <p className={classes.Text}>
          Here are your results for "Find me the latest news.."
        </p>
      </div>
      <div className={classes.Results}>
        <div></div>
      </div>
    </div>
  );
};

export default Message;
