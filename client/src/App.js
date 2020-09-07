import React, { useEffect } from "react";
import { Switch, Route } from "react-router-dom";
import axios from 'axios';

// NEWS API -> API KEY - 8d6e118f59c54ae0a3aaf8b83496380f
// Newscatcher Rapid API Key -> 237d3ddb5cmshf8270554cb06ec0p187d86jsnc404893cd6c2

import Main from "./components/Main/Main";
import Header from "./components/Header/Header";
import Particles from "react-particles-js";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faMicrophone,
  faPaperPlane,
  faArrowRight,
  faCaretSquareDown,
  faCaretSquareUp,
  faSkull,
  faVirus,
  faViruses,
  faHeart,
} from "@fortawesome/free-solid-svg-icons";

library.add(
  faMicrophone,
  faVirus,
  faSkull,
  faPaperPlane,
  faHeart,
  faArrowRight,
  faViruses,
  faCaretSquareDown,
  faCaretSquareUp
);

const particlesConfig = {
  "particles": {
    "number": {
      "value": 160,
      "density": {
        "enable": true,
        "value_area": 800
      }
    },
    "color": {
      "value": "#9d9400"
    },
    "shape": {
      "type": "triangle",
      "stroke": {
        "width": 0,
        "color": "#000000"
      },
      "polygon": {
        "nb_sides": 3
      },
      "image": {
        "src": "img/github.svg",
        "width": 100,
        "height": 100
      }
    },
    "opacity": {
      "value": 1,
      "random": true,
      "anim": {
        "enable": true,
        "speed": 1,
        "opacity_min": 0,
        "sync": false
      }
    },
    "size": {
      "value": 3,
      "random": true,
      "anim": {
        "enable": false,
        "speed": 10,
        "size_min": 1.6230472712517763,
        "sync": false
      }
    },
    "line_linked": {
      "enable": false,
      "distance": 160.24100246771155,
      "color": "#ffffff",
      "opacity": 0.03204820049354232,
      "width": 1
    },
    "move": {
      "enable": true,
      "speed": 1,
      "direction": "none",
      "random": true,
      "straight": false,
      "out_mode": "out",
      "bounce": false,
      "attract": {
        "enable": false,
        "rotateX": 600,
        "rotateY": 600
      }
    }
  },
  "interactivity": {
    "detect_on": "window",
    "events": {
      "onhover": {
        "enable": false,
        "mode": "bubble"
      },
      "onclick": {
        "enable": false,
        "mode": "repulse"
      },
      "resize": true
    },
    "modes": {
      "grab": {
        "distance": 400,
        "line_linked": {
          "opacity": 1
        }
      },
      "bubble": {
        "distance": 250,
        "size": 0,
        "duration": 2,
        "opacity": 0,
        "speed": 3
      },
      "repulse": {
        "distance": 389.53134510042634,
        "duration": 0.4
      },
      "push": {
        "particles_nb": 4
      },
      "remove": {
        "particles_nb": 2
      }
    }
  },
  "retina_detect": true
};

function App() {

  return (
    <div
      style={{
        width: "100vw",
        minHeight: "100vh",
        height: "auto",
        overflowX: "hidden",
        background: "transparent",
      }}
    >
      <Particles
        style={{
					background: "#1d1d1d",
					position: 'fixed',
					top: '0',
					left: '0',
					zIndex: '-1'
        }}
        params={particlesConfig}
        width="100vw"
        height="100vh"
      />
      <Header />
      <Switch>
        <Route to="/" exact component={Main} />
      </Switch>
    </div>
  );
}

export default App;
