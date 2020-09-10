import React, { Fragment, useState, memo } from 'react';

import classes from './Message.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Message = (props) => {
	const [ showNews, setShowNews ] = useState(true);

	let articlesView, statsView;
	if (props.articles) {
		articlesView = props.articles.map((article) => (
			<div className={classes.NewsItem} key={article._id}>
				<img src={article.media} alt="Article Media" />
				<h2>{article.title}</h2>
				<span>{article.published_date.split(' ')[0]}</span>
				<p>{article.summary}</p>
				<a target="_blank" rel="noopener noreferrer" href={article.link}>
					Read Full Article
				</a>
			</div>
		));
	}
	if (props.stats) {
		statsView = (
			<Fragment>
				<h1 style={{ color: '#fff' }}>{props.stats.tag} Stats</h1>
				<div className={classes.Stats}>
					<div className={classes.Stat}>
						<p>
							<FontAwesomeIcon icon="viruses" style={{ color: 'white' }} /> Confirmed Cases:{' '}
						</p>
						<h3>{props.stats.data.confirmed}</h3>
					</div>
					<div className={classes.Stat}>
						<p>
							<FontAwesomeIcon icon="heart" style={{ color: 'white' }} /> Recoveries:
						</p>
						<h3>{props.stats.data.recovered}</h3>
					</div>
					<div className={classes.Stat}>
						<p>
							<FontAwesomeIcon icon="skull" style={{ color: 'white' }} /> Deaths:
						</p>
						<h3>{props.stats.data.deaths}</h3>
					</div>
				</div>
			</Fragment>
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

function arraysEqual(a, b) {
  if (a === b) return true;
  if (a == null || b == null) return false;
  if (a.length !== b.length) return false;

  for (var i = 0; i < a.length; ++i) {
    if (a[i] !== b[i]) return false;
  }
  return true;
}

// const shouldRerender = (prevProps, newProps) => {
// 	let ret = false;
// 	if(prevProps.text === )
// };

export default memo(Message);
