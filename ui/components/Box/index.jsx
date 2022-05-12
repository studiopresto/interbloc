import PropTypes from 'prop-types';



export default function Box({ children, theme = '', title, icon, color = 'primary', staticHeight = false }) {

	const bodyHeight = typeof staticHeight === 'number' ? staticHeight : null;

	return (
		<div className={`box box-theme-${theme}`}>
			<div className="box-header">
				{
					!!icon
						? (
							<div className={`box-header-thumb ${color ? 'color-' + color : ''}`}>
								{icon}
							</div>
						) : null
				}
				<p className="box-header-title h-4">{title}</p>
			</div>
			<div className={`box-body ${staticHeight ? 'box-body-height' : ''}`} style={{ height: bodyHeight }}>
				{children}
			</div>
		</div>
	)
}

Box.propTypes = {
	theme: PropTypes.number,
	title: PropTypes.string,
	icon: PropTypes.oneOfType([PropTypes.object, PropTypes.node]),
	color: PropTypes.oneOf(['primary', 'blue', 'violet', 'orange', 'turquoise']),
	staticHeight: PropTypes.oneOfType([PropTypes.bool, PropTypes.number]),
}