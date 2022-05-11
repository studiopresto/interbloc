import PropTypes from 'prop-types';



export default function UserIcon({ color = 'currentColor' }) {
	return (
		<svg width="24" height="24" viewBox="0 0 24 24" fill="none">
			<path fillRule="evenodd" clipRule="evenodd" d="M11.9615 12.9615C15.2646 12.9615 17.9423 10.2839 17.9423 6.98077C17.9423 3.67768 15.2646 1 11.9615 1C8.65845 1 5.98077 3.67768 5.98077 6.98077C5.98077 10.2839 8.65845 12.9615 11.9615 12.9615ZM7 14.6703C3.13401 14.6703 0 17.8043 0 21.6703V22.2142C0 22.7665 0.447715 23.2142 0.999999 23.2142H22.9231C23.4754 23.2142 23.9231 22.7665 23.9231 22.2142V21.6703C23.9231 17.8043 20.7891 14.6703 16.9231 14.6703H7Z" fill={color}/>
		</svg>
	)
}

UserIcon.propTypes = {
	color: PropTypes.string,
};