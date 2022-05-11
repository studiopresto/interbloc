import PropTypes from 'prop-types';
import Link from 'next/link';



export default function Button({ children = false, type = 'default', href = '', target, label = '', onClick, size, color, variant = 'solid', withIcon = false, fullHeight, fullWidth, icon = false }) {

	const sizeClass = !!size ? 'btn-' + size : null;
	const colorClass = !!color ? 'btn-' + color : null;
	const outlineClass = variant === 'outline' ? 'btn-' + variant : 'btn-' + variant;
	const heightClass = fullHeight ? 'btn-fullHeight' : null;
	const widthClass = fullWidth ? 'btn-fullWidth' : null;
	const iconClass = icon ? 'btn-theme-icon' : null;
	const classes = [sizeClass, colorClass, outlineClass, heightClass, widthClass, iconClass].join(' ');

	if (!!href) {
		return (
			<Link href={href}>
				<a
					className={`btn ${classes}`}
					target={target}
					rel={!!target ? 'noopener noreferrer' : null}>
					{withIcon ? <span className="btn-title">{label}</span> : null}
					{!children ? <span className="btn-title">{label}</span> : children}
				</a>
			</Link>
		)
	}

	return (
		<button
			type={type}
			onClick={onClick}
			className={`btn ${classes}`}>
			{withIcon ? <span className="btn-title">{label}</span> : null}
			{!children ? <span className="btn-title">{label}</span> : children}
		</button>
	)
}

Button.propTypes = {
	type: PropTypes.oneOf(['default', 'button']),
	href: PropTypes.string,
	target: PropTypes.string,
	label: PropTypes.string,
	onClick: PropTypes.func,
	size: PropTypes.oneOf(['sm']),
	color: PropTypes.oneOf(['primary', 'blue', 'violet', 'orange', 'turquoise', 'transparent']),
	children: PropTypes.oneOfType([PropTypes.node, PropTypes.bool]),
	withIcon: PropTypes.bool,
	variant: PropTypes.oneOf(['solid', 'outline']),
	fullHeight: PropTypes.bool,
	fullWidth: PropTypes.bool,
	icon: PropTypes.bool,
};