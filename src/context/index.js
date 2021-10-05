import React, { Component } from 'react';
import dayjs from 'dayjs';

const MyContext = React.createContext();
class MyProvider extends Component {
	pomodoroTime = 25;
	shortBreakTime = 5;
	longBreakTime = 15;

	state = {
		time: dayjs().minute(this.pomodoroTime).second(0).valueOf(),
		timerActive: false,
		round: 0,
		pomodoroActive: true,
		shortBreakActive: false,
		longBreakActive: false,
	};

	activateShortBreak = () => {
		this.setState({ pomodoroActive: !this.state.pomodoroActive });
		this.setState({ shortBreakActive: !this.state.shortBreakActive });
	};

	updateTimeHandler = () => {
		const currentTime = this.state.time;
		const newTime = dayjs(currentTime).subtract(1, 'second');
		this.setState({ time: newTime });
	};

	nextRoundHandler = () => {
		const round = this.state.round;
		const pomodoro = this.state.pomodoroActive;
		const shortBreak = this.state.shortBreakActive;
		const longBreak = this.state.longBreakActive;

		if (round <= 3 && pomodoro) {
			this.activateShortBreak();
			this.setState({ time: dayjs().minute(this.shortBreakTime).second(0).valueOf() });
		}
		if (round <= 3 && shortBreak) {
			this.activateShortBreak();
			this.setState({ round: round + 1 });
			this.setState({ time: dayjs().minute(this.pomodoroTime).second(0).valueOf() });
		}

		if (round === 4 && pomodoro) {
			this.setState({ pomodoroActive: false });
			this.setState({ longBreakActive: true });
			this.setState({ time: dayjs().minute(this.pomodoroTime).second(0).valueOf() });
		}
		if (round === 4 && longBreak) {
			this.setState({ pomodoroActive: true });
			this.setState({ longBreakActive: false });
			this.setState({ timerActive: false });
			this.setState({ round: 0 });
			this.setState({ time: dayjs().minute(this.longBreakTime).second(0).valueOf() });
		}
	};

	setTimerStatusHandler = () => {
		const round = this.state.round;
		const currentStatus = this.state.timerActive;

		this.setState({ timerActive: !currentStatus });

		// Check if first round
		if (round === 0) {
			this.setState({ round: round + 1 });
		}
	};

	pomodoroBreakClickHandler = () => {
		const round = this.state.round;
		const pomodoro = this.state.pomodoroActive;
		const shortBreak = this.state.shortBreakActive;
		const longBreak = this.state.longBreakActive;

		if (!pomodoro && shortBreak) {
			const answer = window.confirm('Are you ready to jump back into it, skip this short break?');
			if (answer) {
				this.activateShortBreak();
				this.setState({ round: round + 1 });
				this.setState({ time: dayjs().minute(this.pomodoroTime).second(0).valueOf() });
			}
		}

		if (!pomodoro && longBreak) {
			const answer = window.confirm('Are you ready to jump back into it?');
			if (answer) {
				this.setState({ round: 1 });
				this.setState({ pomodoroActive: true });
				this.setState({ longBreakActive: false });
				this.setState({ time: dayjs().minute(this.pomodoroTime).second(0).valueOf() });
			}
		}
	};

	shortBreakClickHandler = () => {
		const round = this.state.round;
		const shortBreak = this.state.shortBreakActive;

		if (!shortBreak && round < 4) {
			const answer = window.confirm('Are you sure you want to skip this pomodoro round?');
			if (answer) {
				this.activateShortBreak();
				this.setState({ time: dayjs().minute(this.shortBreakTime).second(0).valueOf() });
			}
		}
	};

	longBreakClickHandler = () => {
		const round = this.state.round;
		const longBreak = this.state.longBreakActive;

		// check if timer active & is not short/long break
		if (!longBreak ?? (round > 0 && round < 4)) {
			const answer = window.confirm('Are you sure you want to skip to the final long break?');
			if (answer) {
				// this.setState({ timerActive: true });
				this.setState({ pomodoroActive: false });
				this.setState({ shortBreakActive: false });
				this.setState({ longBreakActive: true });
				this.setState({ round: 4 });
				this.setState({ time: dayjs().minute(this.longBreakTime).second(0).valueOf() });
			}
		}
	};

	render() {
		return (
			<>
				<MyContext.Provider
					value={{
						state: this.state,
						updateTime: this.updateTimeHandler,
						setTimerStatus: this.setTimerStatusHandler,
						nextRound: this.nextRoundHandler,
						pomodoroClick: this.pomodoroBreakClickHandler,
						shortBreakClick: this.shortBreakClickHandler,
						longBreakClick: this.longBreakClickHandler,
					}}
				>
					{this.props.children}
				</MyContext.Provider>
			</>
		);
	}
}

export { MyContext, MyProvider };
