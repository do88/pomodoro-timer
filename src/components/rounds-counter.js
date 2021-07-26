import { ReactComponent as Tomato } from '../images/tomato.svg';

const RoundCounter = () => {
	return (
		<div className="timer__rounds">
			round
			<span className="round-1">
				<Tomato />
			</span>
			<span className="round-2">
				<Tomato />
			</span>
			<span className="round-3">
				<Tomato />
			</span>
			<span className="round-4">
				<Tomato />
			</span>
		</div>
	);
};

export default RoundCounter;
