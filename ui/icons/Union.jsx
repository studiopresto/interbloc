import PropTypes from 'prop-types';



export default function UnionIcon({ color = 'currentColor' }) {
	return (
		<svg width="24" height="24" viewBox="0 0 24 24" fill="none">
			<path fillRule="evenodd" clipRule="evenodd" d="M5.34277 15.5482C5.57328 10.0166 10.0165 5.57329 15.5481 5.34271C14.4525 2.23063 11.4867 0 8 0C3.58172 0 0 3.58175 0 8.00006C0 11.4869 2.23066 14.4527 5.34277 15.5482ZM16 24.0001C20.4183 24.0001 24 20.4183 24 16C24 11.5817 20.4183 7.99996 16 7.99996C11.5817 7.99996 8 11.5817 8 16C8 20.4183 11.5817 24.0001 16 24.0001Z" fill={color}/>
		</svg>
	)
}

UnionIcon.propTypes = {
	color: PropTypes.string,
};