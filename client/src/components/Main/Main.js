import React, { useState, useEffect, Fragment, memo } from 'react';
import classes from './Main.module.css';
import axios from 'axios';
import io from 'socket.io-client';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ListenModal from '../ListenModal/ListenModal';
import Header from '../Header/Header';
import Message from '../Message/Message';

const Main = () => {
	// console.log('RENDERING MAIN');
	const [ name, setName ] = useState('');
	const [ hasName, sethasName ] = useState(false);
	// const [articles, setArticles] = useState(null);
	// const [stats, setStats] = useState(null);
	const [ listen, setListen ] = useState(false);
	const [ speech, setSpeech ] = useState('');
	const [ loading, setLoading ] = useState(false);
	const [ socket, setSocket ] = useState();
	const [ messages, setMessages ] = useState([]);

	const generateMessageObj = (value, author = 'Kovi') => {
		let msgObj = Object.assign({});
		for (let item of value) {
			msgObj = Object.assign(msgObj, item);
		}
		msgObj.author = author;
		// console.log(msgObj);
		return msgObj;
	};

	// SOCKET USE-EFFECT - DEFINE AND HANDLE SOCKET EVENTS AFTER SOCKET CONNECTION HAS BEEN ESTABLISHED.
	useEffect(
		() => {
			// console.log('SOCKET USE-EFFECT');
			if (socket) {
				socket.on('query-response', (response) => {
					let msgObj = generateMessageObj(response);
					setMessages((prevState) => [ ...prevState,msgObj ]);
					koviSpeak(msgObj.text);
					setLoading(false);
					console.log(messages);
				});
			}
		},
		[ socket ]
	);

	// NAME USE-EFFECT - SET NAME OF CURRENT USER.
	useEffect(
		() => {
			// console.log('GREETINGS FROM KOVI');
			if (name) {
				const clientSocket = io('localhost:8000', { query: `name=${name}` });
				setSocket(clientSocket);
				clientSocket.on('greetings', (msg) => {
					let obj = generateMessageObj(msg)
					setMessages((prevState) => [ ...prevState,obj  ]);
					koviSpeak(obj.text);
				});
			}
		},
		[ hasName ]
	);

	// TEXT-TO-SPEECH FUNCTION
	const koviSpeak = (text) => {
		window.speechSynthesis.speak(new SpeechSynthesisUtterance(text));
	};

	// SERVER RESPONSE FUNCTION.
	const queryRasa = (query) => {
		setLoading(true);
		console.log(query);
		setMessages((prevState) => [ ...prevState, generateMessageObj([ { text: query } ], name) ]);
		socket.emit('query', query);
	};

	return (
		<div className={classes.Main}>
			<Header />
			{listen && <ListenModal onSpeech={(sp) => queryRasa(sp)} cancel={() => setListen(false)} />}
			{!hasName && (
				<div className={classes.EnterName}>
					<h1>Can you tell me your name?</h1>
					<input
						type="text"
						placeholder="Enter Your Name"
						required
						autoFocus={true}
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
						<Message
							key={Date.now() + Math.random()}
							author={msg.author}
							msg={msg.text}
							articles={msg.news}
							stats={msg.stats}
						/>
					))}
				</div>
				<div className={classes.ChatControls}>
					{loading ? (
						<progress max="100" style={{ height: '5px', width: '95%' }} />
					) : (
						<Fragment>
							<p className={classes.ControlIcon} onClick={() => setListen(true)}>
								<FontAwesomeIcon icon="microphone" />
							</p>
							<input
								type="text"
								className={classes.Query}
								placeholder="Say or type &quot;Give me the latest coronavirus news updates&quot;"
								autoFocus
								spellCheck="false"
								value={speech}
								onChange={(e) => setSpeech(e.target.value)}
							/>
							<p
								className={classes.ControlIcon}
								onClick={() => {
									queryRasa(speech);
									setSpeech('');
								}}
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

export default memo(Main);
