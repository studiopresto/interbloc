import PropTypes from 'prop-types';



export default function Tooltip({ children, text, position = 'bottom' }) {
	return (
		<div className="tooltip">
			<div className="tooltip-trigger">
				{children}
			</div>
			<div className={`tooltip-body tooltip-body-${position}`}>
				<div className="tooltip-body-content">
					{text}
				</div>
			</div>
		</div>
	)
}

Tooltip.propTypes = {
	children: PropTypes.oneOfType([PropTypes.node, PropTypes.element]).isRequired,
	text: PropTypes.string.isRequired,
	position: PropTypes.oneOf(['top', 'right', 'bottom', 'left']),
};