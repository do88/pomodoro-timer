import React, { useContext } from 'react';
import { ReactComponent as Tomato } from '../images/tomato.svg';
import { MyContext } from '../context';

const RoundCounter = () => {
	const context = useContext(MyContext);

	const currentRound = context.state.round;

	return (
		<div className="timer__rounds">
			round
			<span className={`round ${currentRound > 0 ? 'active' : ''}`}>
				<Tomato />
			</span>
			<span className={`round ${currentRound > 1 ? 'active' : ''}`}>
				<Tomato />
			</span>
			<span className={`round ${currentRound > 2 ? 'active' : ''}`}>
				<Tomato />
			</span>
			<span className={`round ${currentRound > 3 ? 'active' : ''}`}>
				<Tomato />
			</span>
		</div>
	);
};

export default RoundCounter;
