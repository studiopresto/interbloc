import PropTypes from 'prop-types';

export default function Tooltip({ children, text, position = 'bottom', size = 'md', textAlign = 'left' }) {
	return (
		<div className="tooltip">
			<div className="tooltip-trigger">
				{children}
			</div>
			<div className={`tooltip-body tooltip-body-${position} tooltip-body-${size} tooltip-body-${textAlign}`}>
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
	size: PropTypes.oneOf(['md', 'sm', 'xs']),
	textAlign: PropTypes.oneOf(['left', 'right', 'center'])
};