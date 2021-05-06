import React from 'react';
import { MyContext } from './context';

class App extends React.Component {
	static contextType = MyContext;
	render() {
		return (
			<div className="wrapper">
				<div className="center-wrapper">
					<h1>Who pays the bill ?</h1>
					{console.log(this.context.state)}
				</div>
			</div>
		);
	}
}

export default App;
