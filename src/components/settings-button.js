import { ReactComponent as SettingsCog } from '../images/settings-cog.svg';

const SettingsButton = () => {
	return (
		<button className="timer__settings button button--settings">
			settings
			<span className="settings">
				<SettingsCog />
			</span>
		</button>
	);
};

export default SettingsButton;
