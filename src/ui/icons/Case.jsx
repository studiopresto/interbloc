import PropTypes from 'prop-types';



export default function CaseIcon({ color = 'currentColor' }) {
	return (
		<svg width="28" height="26" viewBox="0 0 28 26">
			<path fillRule="evenodd" clipRule="evenodd" d="M9.60553 3H18.4679L18.4679 5H9.60553L9.60553 3ZM6.60553 5V3C6.60553 1.34315 7.94868 0 9.60553 0H18.4679C20.1248 0 21.4679 1.34315 21.4679 3V5H26C27.1046 5 28 5.89543 28 7V24C28 25.1046 27.1046 26 26 26H2C0.895431 26 0 25.1046 0 24V7C0 5.89543 0.895431 5 2 5H6.60553Z" fill={color}/>
		</svg>
	)
}

CaseIcon.propTypes = {
	color: PropTypes.string,
};