import React, { useState, useEffect, useContext } from 'react';
import { MyContext } from '../context';

import { ReactComponent as Play } from '../images/play.svg';
import { ReactComponent as Pause } from '../images/pause.svg';
import { ReactComponent as Tomato } from '../images/tomato.svg';
import { ReactComponent as SettingsCog } from '../images/settings-cog.svg';

import '../styles/Timer.scss';

const Timer = () => {
	const context = useContext(MyContext);

	console.log(context);

	// const { initialMinute = 0, initialSeconds = 0 } = props;
	// const [minutes, setMinutes] = useState(initialMinute);
	// const [seconds, setSeconds] = useState(initialSeconds);

	// useEffect(() => {
	// 	let myInterval = setInterval(() => {
	// 		if (seconds > 0) {
	// 			setSeconds(seconds - 1);
	// 		}
	// 		if (seconds === 0) {
	// 			if (minutes === 0) {
	// 				clearInterval(myInterval);
	// 			} else {
	// 				setMinutes(minutes - 1);
	// 				setSeconds(59);
	// 			}
	// 		}
	// 	}, 1000);
	// 	return () => {
	// 		clearInterval(myInterval);
	// 	};
	// });

	return (
		<main className="timer">
			<div className="timer__wrapper">
				<div className="timer__controls">
					<button className="button pomodoro-js">pomodoro</button>
					<button className="button button--blue short-break-js">short break</button>
					<button className="button button--green long-break-js">long break</button>
				</div>
				<div className="timer__clock">25:00</div>
				<div className="timer__start button button--grey">
					start
					<span className="play active">
						<Play />
					</span>
					<span className="pause">
						<Pause />
					</span>
				</div>
				<div className="timer__meta">
					<div className="timer__rounds">
						round
						<span className="round-1">
							<Tomato />
						</span>
						<span className="round-2">
							<Tomato />
						</span>
						<span className="round-3">
							<Tomato />
						</span>
						<span className="round-4">
							<Tomato />
						</span>
					</div>
					<button className="timer__settings button button--settings">
						settings
						<span className="settings">
							<SettingsCog />
						</span>
					</button>
				</div>
			</div>
		</main>
	);
};

export default Timer;
