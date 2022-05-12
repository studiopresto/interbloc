import PropTypes from 'prop-types';



export default function RSSIcon({ color = 'currentColor' }) {
	return (
		<svg width="24" height="24" viewBox="0 0 24 24" fill="none">
			<circle cx="6.5" cy="17.5" r="3.5" fill="#2B251B"/>
			<path d="M15 20C15 13.9249 10.0751 9 4 9" stroke={color} strokeWidth="4" strokeLinecap="round"/>
			<path d="M22 21C22 10.5066 13.4934 2 3 2" stroke={color} strokeWidth="4" strokeLinecap="round"/>
		</svg>
	)
}

RSSIcon.propTypes = {
	color: PropTypes.string,
};