import PropTypes from 'prop-types';



export default function ArrowIcon({ color = 'currentColor' }) {
	return (
		<svg width="32" height="8" viewBox="0 0 32 8" fill="none">
			<path d="M31.3536 4.35356C31.5488 4.15829 31.5488 3.84171 31.3536 3.64645L28.1716 0.464469C27.9763 0.269207 27.6597 0.269207 27.4645 0.464469C27.2692 0.659731 27.2692 0.976314 27.4645 1.17158L30.2929 4L27.4645 6.82843C27.2692 7.02369 27.2692 7.34027 27.4645 7.53554C27.6597 7.7308 27.9763 7.7308 28.1716 7.53554L31.3536 4.35356ZM-5.35817e-08 4.5L31 4.5L31 3.5L5.35817e-08 3.5L-5.35817e-08 4.5Z" fill={color}/>
		</svg>
	)
}

ArrowIcon.propTypes = {
	color: PropTypes.string,
};