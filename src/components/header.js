import { ReactComponent as Logo } from '../images/pomodoro-logo.svg';
import '../styles/Header.css';

const Header = () => {
	return (
		<header className="header">
			<Logo className="header__logo" />
		</header>
	);
};

export default Header;
