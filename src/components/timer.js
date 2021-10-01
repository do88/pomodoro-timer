import React, { useEffect, useContext } from 'react';
import { MyContext } from '../context';

import { ReactComponent as Play } from '../images/play.svg';
import { ReactComponent as Pause } from '../images/pause.svg';

import RoundCounter from './rounds-counter';
import SettingsButton from './settings-button';
import ControlStrip from './control-strip';

import '../styles/Timer.scss';

const Timer = () => {
	const context = useContext(MyContext);

	const timerStatus = context.state.timerActive;
	const minutes = context.state.initialMinute;
	const seconds = context.state.initialSeconds;

	useEffect(() => {
		if (timerStatus === false) return;

		const myInterval = setInterval(() => {
			if (seconds > 0) {
				context.updateSeconds();
			}
			if (seconds === 0) {
				if (minutes === 0) {
					clearInterval(myInterval);
				} else {
					context.updateMinutes();
					context.updateSeconds();
				}
			}
		}, 200);

		return () => {
			clearInterval(myInterval);
		};
	});

	return (
		<main className="timer">
			<div className="timer__wrapper">
				<ControlStrip />
				<div className="timer__clock">
					{minutes}:{seconds === 0 ? '00' : seconds}
				</div>
				<div
					className={`timer__start button ${!timerStatus ? 'button--grey' : 'button--green'}`}
					onClick={() => context.setTimerStatus()}
				>
					{timerStatus ? 'Pause' : 'Start'}
					<span className={`play ${!timerStatus ? 'active' : ''}`}>
						<Play />
					</span>
					<span className={`pause ${timerStatus ? 'active' : ''}`}>
						<Pause />
					</span>
				</div>
				<div className="timer__meta">
					<RoundCounter />
					<SettingsButton />
				</div>
			</div>
		</main>
	);
};

export default Timer;
