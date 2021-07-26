import '../styles/Footer.scss';

const Footer = () => {
	const date = new Date();

	return (
		<footer className="footer">
			© {date.getFullYear()} Dmitry Osipchuk - Find me on{' '}
			<a href="https://github.com/do88" target="_blank" rel="noreferrer">
				GitHub
			</a>{' '}
			or{' '}
			<a href="https://www.linkedin.com/in/osipchuk/" target="_blank" rel="noreferrer">
				LinkedIn
			</a>
		</footer>
	);
};

export default Footer;
