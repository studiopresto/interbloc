import PropTypes from 'prop-types';



export default function Dot({ children }) {
	return (
		<div className="icon-dot">
			<div className="icon-dot-item">
				{children}
			</div>
		</div>
	)
}

Dot.propTypes = {
	children: PropTypes.oneOfType([PropTypes.node, PropTypes.element]).isRequired,
};