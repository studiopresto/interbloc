import PropTypes from 'prop-types';



export default function ArrowShortIcon({ color = 'currentColor' }) {
	return (
		<svg width="14" height="8" viewBox="0 0 14 8" fill="none">
			<path d="M13.3536 4.35356C13.5488 4.15829 13.5488 3.84171 13.3536 3.64645L10.1716 0.464469C9.97631 0.269207 9.65973 0.269207 9.46447 0.464469C9.2692 0.659731 9.2692 0.976313 9.46447 1.17158L12.2929 4L9.46447 6.82843C9.2692 7.02369 9.2692 7.34027 9.46447 7.53554C9.65973 7.7308 9.97631 7.7308 10.1716 7.53554L13.3536 4.35356ZM-1.34497e-07 4.5L13 4.5L13 3.5L1.34497e-07 3.5L-1.34497e-07 4.5Z" fill={color}/>
		</svg>
	)
}

ArrowShortIcon.propTypes = {
	color: PropTypes.string,
};