import React, { Component } from 'react';

const MyContext = React.createContext();
class MyProvider extends Component {
	state = {
		initialMinute: 1,
		initialSeconds: 30,
		timerActive: false,
		round: 0,
		pomodoroActive: false,
		shortBreakActive: false,
		longBreakActive: false,
	};

	updateMinutesHandler = () => {
		const currentTime = this.state.initialMinute;
		this.setState({ initialMinute: currentTime - 1 });
	};

	updateSecondsHandler = () => {
		const currentTime = this.state.initialSeconds;
		if (currentTime > 0) {
			this.setState({ initialSeconds: currentTime - 1 });
		}
	};

	setTimerStatusHandler = () => {
		const round = this.state.round;
		const pomodoro = this.state.pomodoroActive;
		const currentStatus = this.state.timerActive;

		this.setState({ timerActive: !currentStatus });

		// Check if first round
		if (round === 0) {
			this.setState({ round: round + 1 });
			this.setState({ pomodoroActive: !pomodoro });
		}
	};

	render() {
		return (
			<>
				<MyContext.Provider
					value={{
						state: this.state,
						updateMinutes: this.updateMinutesHandler,
						updateSeconds: this.updateSecondsHandler,
						setTimerStatus: this.setTimerStatusHandler,
					}}
				>
					{this.props.children}
				</MyContext.Provider>
			</>
		);
	}
}

export { MyContext, MyProvider };
