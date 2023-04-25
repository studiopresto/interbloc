import PropTypes from 'prop-types';



export default function SortIcon({ color = 'currentColor' }) {
	return (
		<svg width="10" height="9" viewBox="0 0 10 9">
			<path fillRule="evenodd" clipRule="evenodd" d="M6.9225 4.73708C6.76507 4.91886 6.67842 5.15127 6.67842 5.39174V7.69336C6.67842 8.24565 6.23071 8.69336 5.67842 8.69336H4.43184C3.87956 8.69336 3.43184 8.24565 3.43184 7.69336V5.39219C3.43184 5.15173 3.34519 4.91931 3.18777 4.73754L0.864662 2.05504C0.303786 1.4074 0.76384 0.400391 1.62059 0.400391H8.48928C9.34603 0.400391 9.80609 1.4074 9.24521 2.05504L6.9225 4.73708Z" fill={color}/>
		</svg>
	)
}

SortIcon.propTypes = {
	color: PropTypes.string,
};