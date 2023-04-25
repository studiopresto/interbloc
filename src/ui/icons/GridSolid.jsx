import PropTypes from 'prop-types';



export default function GridSolidIcon({ color = 'currentColor' }) {
	return (
		<svg width="18" height="18" viewBox="0 0 18 18" fill="none">
			<path d="M0 7.5C0 7.75 0.25 8 0.5 8H7.5C7.75 8 8 7.75 8 7.5V0.5C8 0.25 7.75 0 7.5 0H0.5C0.25 0 0 0.25 0 0.5V7.5Z" fill={color}/>
			<path d="M0 17.5C0 17.75 0.25 18 0.5 18H7.5C7.75 18 8 17.75 8 17.5V10.5C8 10.25 7.75 10 7.5 10H0.5C0.25 10 0 10.25 0 10.5V17.5Z" fill={color}/>
			<path d="M10.5 0C10.25 0 10 0.25 10 0.5V7.5C10 7.75 10.25 8 10.5 8H17.5C17.75 8 18 7.75 18 7.5V0.5C18 0.25 17.75 0 17.5 0H10.5Z" fill={color}/>
			<path d="M10 17.5C10 17.75 10.25 18 10.5 18H17.5C17.75 18 18 17.75 18 17.5V10.5C18 10.25 17.75 10 17.5 10H10.5C10.25 10 10 10.25 10 10.5V17.5Z" fill={color}/>
		</svg>
	)
}

GridSolidIcon.propTypes = {
	color: PropTypes.string
};