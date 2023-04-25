import PropTypes from 'prop-types';



export default function ArrowLongIcon({ color = 'currentColor' }) {
	return (
		<svg width="59" height="8" viewBox="0 0 59 8" fill="none">
			<path d="M1 3.5C0.723858 3.5 0.5 3.72386 0.5 4C0.5 4.27614 0.723858 4.5 1 4.5L1 3.5ZM58.3536 4.35356C58.5488 4.1583 58.5488 3.84172 58.3536 3.64645L55.1716 0.464472C54.9763 0.26921 54.6597 0.26921 54.4645 0.464472C54.2692 0.659734 54.2692 0.976317 54.4645 1.17158L57.2929 4.00001L54.4645 6.82843C54.2692 7.0237 54.2692 7.34028 54.4645 7.53554C54.6597 7.7308 54.9763 7.7308 55.1716 7.53554L58.3536 4.35356ZM1 4.5L58 4.50001L58 3.50001L1 3.5L1 4.5Z" fill={color}/>
		</svg>
	)
}

ArrowLongIcon.propTypes = {
	color: PropTypes.string,
};