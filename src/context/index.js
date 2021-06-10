import React, { Component } from 'react';

const MyContext = React.createContext();
class MyProvider extends Component {
	state = {
		initialMinute: 25,
		initialSeconds: 0,
	};

	render() {
		return (
			<>
				<MyContext.Provider
					value={{
						state: this.state,
						addPlayer: this.addPlayerHandler,
						removePlayer: this.removePlayerHandler,
						next: this.nextHandler,
						getNewLooser: this.generateLooser,
						reset: this.resetGame,
					}}
				>
					{this.props.children}
				</MyContext.Provider>
			</>
		);
	}
}

export { MyContext, MyProvider };
