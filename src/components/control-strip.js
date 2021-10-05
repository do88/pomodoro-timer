import { useContext } from 'react';
import { MyContext } from '../context';

const ControlStrip = () => {
	const context = useContext(MyContext);

	const round = context.state.round;
	const pomodoro = context.state.pomodoroActive;
	const shortBreak = context.state.shortBreakActive;
	const longBreak = context.state.longBreakActive;

	return (
		<div className="timer__controls">
			<button
				className={`button--red ${pomodoro ? 'active' : ''}`}
				onClick={() => context.pomodoroClick()}
			>
				pomodoro
			</button>
			<button
				className={`button--blue ${shortBreak ? 'active' : ''}`}
				onClick={() => context.shortBreakClick()}
				disabled={round === 0 || round === 4 ? true : false}
			>
				short break
			</button>
			<button
				className={`button--green ${longBreak ? 'active' : ''}`}
				onClick={() => context.longBreakClick()}
				disabled={round === 0 ? true : false}
			>
				long break
			</button>
		</div>
	);
};

export default ControlStrip;
