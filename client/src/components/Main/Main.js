import React, { useState, useEffect } from "react";
import classes from "./Main.module.css";
import axios from "axios";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ListenModal from "../ListenModal/ListenModal";
import Message from "../Message/Message";

const Main = () => {
  const [name, setName] = useState("");
  const [hasName, sethasName] = useState(true);
  const [articles, setArticles] = useState(null);
  const [stats, setStats] = useState(null);
  const [listen, setListen] = useState(true);
  const [speech, setSpeech] = useState("");

  useEffect(() => {
    // axios({
    // 	method: 'GET',
    // 	url: 'https://newscatcher.p.rapidapi.com/v1/search',
    // 	headers: {
    // 		'content-type': 'application/octet-stream',
    // 		'x-rapidapi-host': 'newscatcher.p.rapidapi.com',
    // 		'x-rapidapi-key': '237d3ddb5cmshf8270554cb06ec0p187d86jsnc404893cd6c2',
    // 		useQueryString: true
    // 	},
    // 	params: {
    // 		media: 'True',
    //     sort_by: 'relevancy',
    //     ranked_only: 'true',
    //     lang: 'en',
    //     country: 'in',
    // 		page: '1',
    // 		q: 'Flight Booking India Coronavirus'
    // 	}
    // })
    // 	.then((response) => {
    //     console.log(response.data.articles);
    //     setArticles(response.data.articles);
    // 	})
    // 	.catch((error) => {
    // 		console.log(error);
    // 	});
    const articles = [
      {
        _id: "b595b3c70533daaa0i722f79d3c7e9c4b",
        _score: 22.358946,
        author: "Monit Khanna",
        clean_url: "indiatimes.com",
        country: "IN",
        media:
          "https://bsmedia.business-standard.com/_media/bs/img/article/2020-07/29/full/1596046429-1041.jpg",
        language: "en",
        link:
          "https://www.indiatimes.com/technology/science-and-future/elon-musk-gets-emotional-after-spacex-crew-dragon-launch-recounts-18-year-struggle-514623.html",
        published_date: "2020-06-01 14:44:20",
        rank: "340",
        rights:
          "Copyright: © 2020 Times Internet Limited. Powered by Indiatimes Lifestyle Network. All rights reserved, https://www.indiatimes.com/privacypolicy",
        summary:
          "Elon Musk was overwhelmed with emotions upon the successful launch as well as docking of the Crew Dragon capsule, which was later renamed by the astronauts as Endeavour.",
        title:
          "Elon Musk Gets Emotional After SpaceX Crew Dragon Launch, Recounts 18 Year Struggle",
        topic: "NA",
      },
      {
        _id: "b595b3c70s533daaa0722f79d3c7e9c4b",
        _score: 22.358946,
        author: "Monit Khanna",
        clean_url: "indiatimes.com",
        media:
          "https://bsmedia.business-standard.com/_media/bs/img/article/2020-07/29/full/1596046429-1041.jpg",
        country: "IN",
        language: "en",
        link:
          "https://www.indiatimes.com/technology/science-and-future/elon-musk-gets-emotional-after-spacex-crew-dragon-launch-recounts-18-year-struggle-514623.html",
        published_date: "2020-06-01 14:44:20",
        rank: "340",
        rights:
          "Copyright: © 2020 Times Internet Limited. Powered by Indiatimes Lifestyle Network. All rights reserved, https://www.indiatimes.com/privacypolicy",
        summary:
          "Elon Musk was overwhelmed with emotions upon the successful launch as well as docking of the Crew Dragon capsule, which was later renamed by the astronauts as Endeavour.",
        title:
          "Elon Musk Gets Emotional After SpaceX Crew Dragon Launch, Recounts 18 Year Struggle",
        topic: "NA",
      },
      {
        _id: "b595b3c70533daaaa0722f79d3c7e9c4b",
        _score: 22.358946,
        author: "Monit Khanna",
        clean_url: "indiatimes.com",
        media:
          "https://bsmedia.business-standard.com/_media/bs/img/article/2020-07/29/full/1596046429-1041.jpg",
        country: "IN",
        language: "en",
        link:
          "https://www.indiatimes.com/technology/science-and-future/elon-musk-gets-emotional-after-spacex-crew-dragon-launch-recounts-18-year-struggle-514623.html",
        published_date: "2020-06-01 14:44:20",
        rank: "340",
        rights:
          "Copyright: © 2020 Times Internet Limited. Powered by Indiatimes Lifestyle Network. All rights reserved, https://www.indiatimes.com/privacypolicy",
        summary:
          "Elon Musk was overwhelmed with emotions upon the successful launch as well as docking of the Crew Dragon capsule, which was later renamed by the astronauts as Endeavour.",
        title:
          "Elon Musk Gets Emotional After SpaceX Crew Dragon Launch, Recounts 18 Year Struggle",
        topic: "NA",
      },
      {
        _id: "b595b3c70533daaa_0722f79d3c7e9c4b",
        _score: 22.358946,
        author: "Monit Khanna",
        media:
          "https://bsmedia.business-standard.com/_media/bs/img/article/2020-07/29/full/1596046429-1041.jpg",
        clean_url: "indiatimes.com",
        country: "IN",
        language: "en",
        link:
          "https://www.indiatimes.com/technology/science-and-future/elon-musk-gets-emotional-after-spacex-crew-dragon-launch-recounts-18-year-struggle-514623.html",
        published_date: "2020-06-01 14:44:20",
        rank: "340",
        rights:
          "Copyright: © 2020 Times Internet Limited. Powered by Indiatimes Lifestyle Network. All rights reserved, https://www.indiatimes.com/privacypolicy",
        summary:
          "Elon Musk was overwhelmed with emotions upon the successful launch as well as docking of the Crew Dragon capsule, which was later renamed by the astronauts as Endeavour.",
        title:
          "Elon Musk Gets Emotional After SpaceX Crew Dragon Launch, Recounts 18 Year Struggle",
        topic: "NA",
      },
      {
        _id: "b595b3c70533daaa07-22f79d3c7e9c4b",
        _score: 22.358946,
        author: "Monit Khanna",
        media:
          "https://bsmedia.business-standard.com/_media/bs/img/article/2020-07/29/full/1596046429-1041.jpg",
        clean_url: "indiatimes.com",
        country: "IN",
        language: "en",
        link:
          "https://www.indiatimes.com/technology/science-and-future/elon-musk-gets-emotional-after-spacex-crew-dragon-launch-recounts-18-year-struggle-514623.html",
        published_date: "2020-06-01 14:44:20",
        rank: "340",
        rights:
          "Copyright: © 2020 Times Internet Limited. Powered by Indiatimes Lifestyle Network. All rights reserved, https://www.indiatimes.com/privacypolicy",
        summary:
          "Elon Musk was overwhelmed with emotions upon the successful launch as well as docking of the Crew Dragon capsule, which was later renamed by the astronauts as Endeavour.",
        title:
          "Elon Musk Gets Emotional After SpaceX Crew Dragon Launch, Recounts 18 Year Struggle",
        topic: "NA",
      },
    ];
    setArticles(articles);
    const stats = [
      {
        country: "India",
        code: "IN",
        confirmed: 3948594,
        recovered: 3043588,
        critical: 8944,
        deaths: 68682,
        latitude: 20.593684,
        longitude: 78.96288,
        lastChange: "2020-09-04T15:12:59+02:00",
        lastUpdate: "2020-09-04T15:45:03+02:00",
      },
    ];
    setStats(stats[0]);
  }, []);

  useEffect(() => {
    console.log(speech);
  }, [speech]);

  return (
    <div className={classes.Main}>
      {listen && (
        <ListenModal
          onSpeech={(sp) => setSpeech(sp)}
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
          <Message author="Covid Assistant" msg="Greeting Message" />
          <Message author="User" msg="Give me some news on coronavirus" />
          <Message
            author="Covid Assistant"
            msg="Here are some news articles"
            articles={articles}
          />
          <Message author="User" msg="Show me Coronavirus India Statistics" />
          <Message
            author="Covid Assistant"
            msg="Here are the stats for India"
            stats={stats}
          />
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
