import { ReactComponent as Play } from '../images/play.svg';
import { ReactComponent as Pause } from '../images/pause.svg';
import { ReactComponent as Tomato } from '../images/tomato.svg';
import { ReactComponent as SettingsCog } from '../images/settings-cog.svg';

import '../styles/Timer.css';

const Timer = () => {
	return (
		<main className="timer">
			<div className="timer__wrapper">
				<div className="timer__controls">
					<button className="button pomodoro-js">pomodoro</button>
					<button className="button button--blue short-break-js">short break</button>
					<button className="button button--green long-break-js">long break</button>
				</div>
				<div className="timer__clock">25:00</div>
				<div className="timer__start">
					Start
					<span className="play">
						<Play />
					</span>
					<span className="pause">
						<Pause />
					</span>
				</div>
				<div className="timer__meta">
					<div className="timer__rounds">
						Round
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
					<div className="timer__settings">
						Settings
						<span className="settings">
							<SettingsCog />
						</span>
					</div>
				</div>
			</div>
		</main>
	);
};

export default Timer;
