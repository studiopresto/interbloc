import PropTypes from 'prop-types';



export default function FileIcon({ color = 'currentColor' }) {
	return (
		<svg width="16" height="20" viewBox="0 0 16 20" fill="none">
			<path d="M10.35 0.35C10.15 0.15 9.9 0 9.75 0C9.6 0 9.25 0 9 0H1C0.75 0 0.4 0.05 0.25 0.1C0.1 0.15 0 0.75 0 1V19C0 19.25 0.05 19.6 0.1 19.75C0.15 19.9 0.75 20 1 20H15C15.25 20 15.6 19.95 15.75 19.9C15.9 19.85 16 19.3 16 19V6.5C16 6.25 15.85 5.85 15.65 5.65L10.35 0.35ZM14 17.5C14 17.75 13.75 18 13.5 18H2.5C2.25 18 2 17.75 2 17.5V2.5C2 2.25 2.25 2 2.5 2H8.5C8.75 2 9 2.25 9 2.5V6.5C9 6.75 9.25 7 9.5 7H13.5C13.75 7 14 7.25 14 7.5V17.5Z" fill={color}/>
		</svg>
	)
}

FileIcon.propTypes = {
	color: PropTypes.string,
};