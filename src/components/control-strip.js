import { useContext } from 'react';
import { MyContext } from '../context';

const ControlStrip = () => {
	const context = useContext(MyContext);

	const pomodoro = context.state.pomodoroActive;
	const shortBreak = context.state.shortBreakActive;
	const longBreak = context.state.longBreakActive;

	return (
		<div className="timer__controls">
			<button className={`pomodoro-js ${pomodoro ? 'active' : ''}`}>pomodoro</button>
			<button className={`button--blue short-break-js ${shortBreak ? 'active' : ''}`}>
				short break
			</button>
			<button className={`button--green long-break-js ${longBreak ? 'active' : ''}`}>
				long break
			</button>
		</div>
	);
};

export default ControlStrip;
