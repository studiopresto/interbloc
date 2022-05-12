import PropTypes from 'prop-types';



export default function PhoneIcon({ color = 'currentColor' }) {
	return (
		<svg width="20" height="24" viewBox="0 0 20 24" fill="none" xmlns="http://www.w3.org/2000/svg">
			<path d="M20 0.6C20 0.24 19.75 0 19.375 0H0.625C0.25 0 0 0.24 0 0.6V23.4C0 23.76 0.25 24 0.625 24H19.375C19.75 24 20 23.76 20 23.4V0.6ZM17.5 2.4V18H12.625C12.625 19.2 11.4375 20.4 10.0625 20.4C8.6875 20.4 7.5 19.2 7.5 18H2.5V2.4H17.5Z" fill={color}/>
		</svg>
	)
}

PhoneIcon.propTypes = {
	color: PropTypes.string,
};