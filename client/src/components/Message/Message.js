import React, { Fragment, useState } from 'react';

import classes from './Message.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Message = (props) => {
	const [ showNews, setShowNews ] = useState(true);

	let articlesView, statsView;
	if (props.articles) {
		articlesView = props.articles.map((article) => (
			<div className={classes.NewsItem} key={article._id}>
				<img src={props.articles[0].media} alt="Article Media" />
				<h2>{props.articles[0].title}</h2>
				<span>{props.articles[0].published_date.split(' ')[0]}</span>
				<p>{props.articles[0].summary}</p>
				<a target="_blank" rel="noopener noreferrer" href={props.articles[0].link}>
					Read Full Article
				</a>
			</div>
		));
	}
	if (props.stats) {
		statsView = (
			<div className={classes.Stats}>
				<div className={classes.Stat}>
					<p> <FontAwesomeIcon icon="viruses" style={{color: 'coral'}} /> Confirmed Cases: </p>
					<h3>{props.stats.confirmed}</h3>
				</div>
				<div className={classes.Stat}>
					<p><FontAwesomeIcon icon="heart" style={{color: 'rgb(57, 233, 27)'}} /> Recoveries:</p>
					<h3>{props.stats.recovered}</h3>
				</div>
				<div className={classes.Stat}>
					<p><FontAwesomeIcon icon="skull" style={{color: 'red'}} /> Deaths:</p>
					<h3>{props.stats.deaths}</h3>
				</div>
			</div>
		);
	}
	return (
		<div className={classes.MessageContainer}>
			<div className={classes.Message}>
				<p className={classes.Author}>
					<em>{props.author}</em>
				</p>
        <p className={classes.Text}>{props.msg}</p>
			</div>
			{props.articles && (
				<Fragment>
					<h1 className={classes.LatestNews}>
						Latest News &nbsp;
						<span className="cp" onClick={(e) => setShowNews(!showNews)}>
							{showNews ? (
								<FontAwesomeIcon icon="caret-square-up" />
							) : (
								<FontAwesomeIcon icon="caret-square-down" />
							)}
						</span>
					</h1>
					{showNews && <div className={classes.NewsContainer}>{articlesView}</div>}
				</Fragment>
			)}
			{props.stats && statsView}
		</div>
	);
};

export default Message;
