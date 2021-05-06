// Core imports
import React from 'react';
import { MyContext } from './context';

// Project components
import Header from './components/header';

// App styling
import './index.css';

class App extends React.Component {
	static contextType = MyContext;

	render() {
		return (
			<div className="wrapper">
				<Header />
				<main className="timer">Timer</main>
				<footer className="footer">Footer</footer>
			</div>
		);
	}
}

export default App;
