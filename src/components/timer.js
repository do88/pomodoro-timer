import dayjs from 'dayjs';

import React, { useEffect, useContext } from 'react';
import { MyContext } from '../context';

import { ReactComponent as Play } from '../images/play.svg';
import { ReactComponent as Pause } from '../images/pause.svg';

import RoundCounter from './rounds-counter';
// import SettingsButton from './settings-button';
import ControlStrip from './control-strip';

import '../styles/Timer.scss';

const Timer = () => {
	const context = useContext(MyContext);

	const time = dayjs(context.state.time).format('mm:ss');
	const timerStatus = context.state.timerActive && time !== '00:00';

	const pomodoro = context.state.pomodoroActive;
	const shortBreak = context.state.shortBreakActive;
	const longBreak = context.state.longBreakActive;

	let currentTimer;
	if (pomodoro) currentTimer = 'pomodoro';
	if (shortBreak) currentTimer = 'short-break';
	if (longBreak) currentTimer = 'long-break';

	useEffect(() => {
		if (timerStatus === false) return;

		const myInterval = setInterval(() => {
			if (time !== '00:00') {
				context.updateTime();
			}
		}, 10);

		return () => clearInterval(myInterval);
	});

	useEffect(() => {
		if (time === '00:00') {
			context.nextRound();
			return;
		}
	});

	return (
		<main className="timer">
			<div className="timer__wrapper">
				<ControlStrip />
				<div className={`timer__clock timer__clock--${currentTimer}`}>{time}</div>
				<button
					className={`timer__start button ${timerStatus ? 'button--green' : 'button--grey'}`}
					onClick={() => context.setTimerStatus()}
				>
					{timerStatus ? (
						<span className="play">
							Pause <Pause />
						</span>
					) : (
						<span className="pause">
							Start <Play />
						</span>
					)}
				</button>
				<div className="timer__meta">
					<RoundCounter />
					{/* <SettingsButton /> */}
				</div>
			</div>
		</main>
	);
};

export default Timer;
