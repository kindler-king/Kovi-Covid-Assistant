const express = require('express');
const socketio = require('socket.io');
const axios = require('axios');
const mongoose = require('mongoose');

// ENABLING ENVIRONMENT VARIABLES
require('dotenv').config();

const Message = require('./models/Message');
const {
	countries,
	getGlobalNews,
	getGlobalStats,
	getNewsSearchString,
	getNewsByCountry,
	getStatsByCountry
} = require('./countries');

// Init App
const app = express();

// Connect to DB
mongoose
	.connect(process.env.DB_URI, {
		useNewUrlParser: true,
		useCreateIndex: true,
		useFindAndModify: true,
		useUnifiedTopology: true
	})
	.then(() => {
		console.log('DB CONNECTED');
	})
	.catch((err) => {
		console.log('ERROR CONNECTING TO DB', err);
	});

// CORS
app.use((req, res) => {
	res.set('Access-Control-Allow-Origin', '*');
	res.set('Access-Control-Allow-Headers', '*');
});

const PORT = process.env.PORT || 8000;
const server = app.listen(PORT, () => console.log(`SERVER STARTED ON PORT: ${PORT}`));

const stats = {
	confirmed: 28078373,
	recovered: 20118538,
	critical: 60532,
	deaths: 914639,
	lastChange: '2020-09-10T08:10:32+02:00',
	lastUpdate: '2020-09-10T08:15:03+02:00'
};

const news = {
	status: 'ok',
	total_hits: 3829,
	page: 1,
	total_pages: 766,
	page_size: 5,
	articles: [
		{
			summary:
				'Chief Minister Arvind Kejriwal said on Saturday that coronavirus cases in Delhi have increased due to the increased number of testing in the national capital to detect the patients. Asserting that there was no need to panic due to the increasing number of coronavirus cases in Delhi, Arvind Kejriwal said the situation is under control."I want to assure you that the coronavirus situation in Delhi is completely under control but there is no room for complacency. There is no need to panic. Coronavirus cases in Delhi are increasing as we have doubled testing to detect the patients infected with the disease," Arvind Kejriwal said on Saturday.',
			country: 'IN',
			author: null,
			link:
				'https://www.indiatoday.in/india/story/coronavirus-cases-in-delhi-increasing-due-to-more-testing-no-need-to-panic-arvind-kejriwal-1718867-2020-09-05',
			language: 'en',
			media:
				'https://akm-img-a-in.tosshub.com/indiatoday/images/story/202009/PTI26-08-2020_000062B-647x363.jpeg?2sIiQTW67Sv8PGQdMUSJeZPMn9I5PzfT',
			title: 'Coronavirus cases in Delhi increasing due to more testing, no need to panic: Arvind Kejriwal',
			media_content: null,
			clean_url: 'indiatoday.in',
			rights: 'indiatoday.in',
			rank: '2503',
			topic: 'news',
			published_date: '2020-09-05 06:57:30',
			_id: '924ffaa7a8d6bc49a7349435b6ad0428',
			_score: 4.990186
		},
		{
			summary:
				"Coronavirus India highlights: India's total number of coronavirus cases stand at 4,204,613. Maharashtra's tally has crossed the 900,000 mark. Stay tuned for coronavirus LIVE updates",
			country: 'IN',
			author: null,
			link:
				'https://www.business-standard.com/article/current-affairs/coronavirus-live-updates-india-cases-statewise-world-corona-list-death-toll-maharashtra-delhi-vaccine-update-covid-news-120090700016_1.html',
			language: 'en',
			media:
				'https://www.business-standard.com/article/current-affairs/coronavirus-live-updates-india-cases-statewise-world-corona-list-death-toll-maharashtra-delhi-vaccine-update-covid-news-120090700016_1.html',
			title: 'Coronavirus LIVE: India adds 583,368 cases in 7 days; tally at 4,204,613',
			media_content:
				'https://www.business-standard.com/article/current-affairs/coronavirus-live-updates-india-cases-statewise-world-corona-list-death-toll-maharashtra-delhi-vaccine-update-covid-news-120090700016_1.html',
			clean_url: 'business-standard.com',
			rights: 'Copyright business-standard.com',
			rank: '1654',
			topic: 'business',
			published_date: '2020-09-07 06:42:07',
			_id: 'deb5fc67617c7bb675492c6991d67349',
			_score: 4.9459467
		},
		{
			summary:
				"By: | September 6, 2020 4:22:46 pm India has become the world's third country to surpass 4 million coronavirus infections, behind only the US and Brazil with over 6.3 million and 4.1 million cases respectively.German Development Minister Gerd Müller on Sunday said Germany is significantly expanding its aid program in India where coronavirus cases are soaring rapidly.Germany will give the South Asian country 330,000 coronavirus testing kits and 600,000 pieces of personal protective equipment worth a total of €15 million ($17.",
			country: 'IN',
			author: '',
			link:
				'https://indianexpress.com/article/coronavirus/coronavirus-germany-gives-india-millions-in-aid-thousands-of-testing-kits-6585386/',
			language: 'en',
			media: 'https://images.indianexpress.com/2013/01/westbengalcovidtesting.jpg',
			title: 'Coronavirus: Germany gives India millions in aid, thousands of testing kits',
			media_content: null,
			clean_url: 'indianexpress.com',
			rights: 'indianexpress.com',
			rank: '1291',
			topic: 'news',
			published_date: '2020-09-06 10:52:46',
			_id: 'e1ffa37b5be61e63a70a43a842427fa6',
			_score: 4.897838
		},
		{
			summary:
				"Brazil has confirmed 10,273 new coronavirus cases in the past 24 hours, more than 300 new deaths from COVID-19 were registered in that period, the country's Health Ministry informs. Brazil's total number of confirmed coronavirus cases now stands at 4,147,794. In the past 24 hours, 310 new coronavirus-related deaths were confirmed in Brazil with the total death toll now standing at 126,960, the ministry said on Monday. On Sunday, Brazil reported more than 14,500 new coronavirus cases and over 440 new deaths from COVID-19.",
			country: 'IN',
			author: null,
			link:
				'https://www.business-standard.com/article/international/brazil-coronavirus-update-covid-19-death-toll-approaches-127-000-120090800107_1.html',
			language: 'en',
			media: 'https://bsmedia.business-standard.com/_media/bs/img/article/2020-08/31/full/1598844272-8193.jpg',
			title: 'Brazil coronavirus update: Covid-19 death toll approaches 127,000',
			media_content: null,
			clean_url: 'business-standard.com',
			rights: 'Copyright www.business-standard.com',
			rank: '1655',
			topic: 'news',
			published_date: '2020-09-08 03:07:00',
			_id: 'cd81acb969fb5cc027d79c2a2f0ecc90',
			_score: 4.87622
		},
		{
			summary:
				"India surpassed 40-lakh mark of total coronavirus cases on Saturday. (Photo: PTI)India's coronavirus case tally crossed the 40-lakh mark on Saturday with a spike of 86,432 new cases in the past 24 hours. Coronavirus case tally in India now stands at 40,23,179 according to the health ministry.India broke its own record of highest coronavirus cases reported in 24 hours. This is also the highest one-day spike in the world.At the same time, the number of recoveries surged to 31,07,223, with over 70,000 new cases treated of coronavirus in the past 24 hours, pushing the recovery rate to 77.",
			country: 'IN',
			author: null,
			link:
				'https://www.indiatoday.in/india/story/india-s-tally-crosses-40-lakh-mark-spike-86-432-cases-1718828-2020-09-05',
			language: 'en',
			media:
				'https://akm-img-a-in.tosshub.com/indiatoday/images/story/202009/PTI_corona_new-647x363.jpeg?wwGI94tVT7z2RRQESmAWifBToUUun_GI',
			title: "Coronavirus: India's tally crosses 40-lakh mark with spike of 86,432 cases",
			media_content: null,
			clean_url: 'indiatoday.in',
			rights: 'indiatoday.in',
			rank: '2503',
			topic: 'news',
			published_date: '2020-09-05 04:06:22',
			_id: '3c288a48fdbec0687ba18db56ed9eb73',
			_score: 4.8759937
		}
	],
	user_input: {
		q: 'Coronavirus',
		search_in: 'summary_en',
		lang: 'en',
		country: 'IN',
		from: '2020-09-03 00:00:00',
		to: null,
		ranked_only: 'True',
		from_rank: null,
		to_rank: null,
		sort_by: 'relevancy',
		page: 1,
		size: 5,
		sources: null,
		not_sources: null,
		topic: null,
		media: 'True'
	}
};

// CHATBOT RESPONSE SCHEMA
// [
// 	{
// 		text: 'rwekjfnhwif'
// 	},
// {
// 		news:
// 	},
// {
// 		stats: []
// 	}
// ]

// Socket-io Setup
const io = socketio(server);

io.on('connection', (socket) => {
	// console.log("Socket Connected", socket.handshake.query);
	// console.log('User Connected');
	console.log('Somebody connected to Kovi');
	// HANDSHAKE
	const name = socket.handshake.query.name;
	socket.emit('greetings', [
		{
			text: `Welcome ${name}. I am Kovi. I will help you stay updated about coronavirus. I can assist you with news, statistics and general queries you might have. All the information provided is taken from trusted and verified sources.`
		},
		{
			stats: {
				tag: 'World',
				data: stats
			}
		},
		{
			news: null
		}
	]);

	socket.on('query', (query) => {
		// TEMPORARY FILTER FOR NEWS AND STAT QUERIES CATEGORISED BY COUNTRIES/GLOBAL
		const ar = query.toLowerCase().split(' ');
		const country = countries.find((country) => query.split(' ').includes(country.name));
		console.log(ar, country);
		if (
			ar.includes('statistics') ||
			ar.includes('stats') ||
			ar.includes('count') ||
			ar.includes('recoveries') ||
			ar.includes('deaths') ||
			ar.includes('confirmed') ||
			ar.includes('cases')
		) {
			if (country) {
				getStatsByCountry(country.code)
					.then((res) => {
						console.log(res.data);
						socket.emit('query-response', [
							{
								text: 'Here are some stats'
							},
							{
								stats: {
									tag: country.name,
									data: res.data[0]
								}
							},
							{
								news: null
							}
						]);
					})
					.catch((err) => {
						console.log(err);
						socket.emit([
							{
								text: 'Oops! Failed to get response. I do not feel so good'
							},
							{
								stats: null
							},
							{
								news: null
							}
						]);
					});
			} else {
				getGlobalStats()
					.then((res) =>
						socket.emit('query-response', [
							{
								text: 'Here are some stats'
							},
							{
								stats: {
									tag: 'World',
									data: res.data[0]
								}
							},
							{
								news: null
							}
						])
					)
					.catch((err) => {
						console.log(err);
						socket.emit([
							{
								text: 'Oops! Failed to get response. I do not feel so good'
							},
							{
								stats: null
							},
							{
								news: null
							}
						]);
					});
			}
		} else if (ar.includes('news')) {
			// console.log(q);
			if (country) {
				let q = getNewsSearchString(query, country.name);
				getNewsByCountry(country.code, q)
					.then((res) =>
						socket.emit('query-response', [
							{
								text: 'Here is some news'
							},
							{
								stats: null
							},
							{
								news: res.data.articles
							}
						])
					)
					.catch((err) => {
						console.log(err);
						socket.emit([
							{
								text: 'Oops! Failed to get response'
							},
							{
								stats: null
							},
							{
								news: null
							}
						]);
					});
			} else {
				let q = getNewsSearchString(query);
				getGlobalNews(q)
					.then((res) =>
						socket.emit('query-response', [
							{
								text: 'Here is some news'
							},
							{
								stats: null
							},
							{
								news: res.data.articles
							}
						])
					)
					.catch((err) => {
						console.log(err);
						socket.emit([
							{
								text: 'Oops! Failed to get response'
							},
							{
								stats: null
							},
							{
								news: null
							}
						]);
					});
			}
		} else {
			// Query Rasa
			axios
				.post('http://localhost:5005/webhooks/rest/webhook', { sender: name, message: query })
				.then((res) => socket.emit('query-response', res.data))
				.catch((err) => {
					console.log(err);
					socket.emit('query-response', [
						{
							text: 'Oops! Failed to get response. I do not feel so good'
						},
						{
							stats: null
						},
						{
							news: null
						}
					]);
				});
		}
	});

	socket.on('disconnect', () => {
		console.log('Socket Disconnected');
	});
});

io.on('error', (err) => console.log(err));
