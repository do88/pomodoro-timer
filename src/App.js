// Core imports
import React from 'react';
import { MyContext } from './context';

// Project components
import Header from './components/header';
import Footer from './components/footer';
import Timer from './components/timer';

// App styling
import './index.css';

class App extends React.Component {
	static contextType = MyContext;

	render() {
		return (
			<div className="wrapper">
				<Header />
				<Timer />
				<Footer />
			</div>
		);
	}
}

export default App;
