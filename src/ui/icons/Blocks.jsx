import PropTypes from 'prop-types';



export default function BlocksIcon({ color = 'currentColor' }) {
	return (
		<svg width="32" height="32" viewBox="0 0 32 32">
			<path d="M13.519 13.4833H6.17285V6.16992H13.519V13.4833Z" stroke={color} strokeWidth="2.5" fill="none"/>
			<path d="M13.519 25.7499H6.17285V18.4365H13.519V25.7499Z" stroke={color} strokeWidth="2.5" fill="none"/>
			<path d="M18.4805 13.4833V6.16992H25.8266V13.4833H18.4805Z" stroke={color} strokeWidth="2.5" fill="none"/>
			<path d="M25.8266 25.7499H18.4805V18.4365H25.8266V25.7499Z" stroke={color} strokeWidth="2.5" fill="none"/>
		</svg>
	)
}

BlocksIcon.propTypes = {
	color: PropTypes.string,
};