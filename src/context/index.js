import React, { Component } from 'react';
import dayjs from 'dayjs';

const MyContext = React.createContext();
class MyProvider extends Component {
	state = {
		time: dayjs().minute(5).second(0).valueOf(),
		timerActive: false,
		round: 0,
		pomodoroActive: true,
		shortBreakActive: false,
		longBreakActive: false,
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

		const activateShortBreak = () => {
			this.setState({ pomodoroActive: !pomodoro });
			this.setState({ shortBreakActive: !shortBreak });
		};

		// Check if first round
		if (round <= 3 && pomodoro) {
			activateShortBreak();
			this.setState({ time: dayjs().minute(2).second(30).valueOf() });
		}
		if (round <= 3 && shortBreak) {
			activateShortBreak();
			this.setState({ round: round + 1 });
			this.setState({ time: dayjs().minute(5).second(0).valueOf() });
		}

		// Check if second round
		if (round === 4 && pomodoro) {
			this.setState({ pomodoroActive: false });
			this.setState({ longBreakActive: true });
			this.setState({ time: dayjs().minute(10).second(0).valueOf() });
		}
		if (round === 4 && longBreak) {
			this.setState({ pomodoroActive: true });
			this.setState({ longBreakActive: false });
			this.setState({ round: 0 });
			this.setState({ time: dayjs().minute(15).second(0).valueOf() });
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

	render() {
		return (
			<>
				<MyContext.Provider
					value={{
						state: this.state,
						updateTime: this.updateTimeHandler,
						setTimerStatus: this.setTimerStatusHandler,
						nextRound: this.nextRoundHandler,
					}}
				>
					{this.props.children}
				</MyContext.Provider>
			</>
		);
	}
}

export { MyContext, MyProvider };
