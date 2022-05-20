import PropTypes from 'prop-types';



export default function Card({ theme = '', children, icon = false, color = 'primary' }) {
	return (
		<div className={`card card-theme-${theme}`}>
			{
				icon
				? (
					<div className={`card-thumb bg-${color}`}>{icon}</div>
					)
				: null
			}
			<div className="card-content">
				{children}
			</div>
		</div>
	)
}

Card.propTypes = {
	theme: PropTypes.number,
	children: PropTypes.oneOfType([PropTypes.object, PropTypes.node]),
	color: PropTypes.oneOf(['primary', 'blue', 'violet', 'orange', 'turquoise']),
};