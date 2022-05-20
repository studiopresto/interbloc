import PropTypes from 'prop-types';
import Link from 'next/link';
import { useRouter } from 'next/router';



export default function VerticalNavItem({ children, href = '/', label }) {

	const { asPath } = useRouter();

	return (
		<div className={`verticalNav-list-item ${asPath === href ? 'is-active' : ''}`}>
			<Link href={href}>
				<a>
					<span className="link-icon">
						{children}
					</span>
					{!!label ? <span className="link-title">{label}</span> : null}</a>
			</Link>
		</div>
	)
}

VerticalNavItem.propTypes = {
	href: PropTypes.string.isRequired,
	label: PropTypes.string.isRequired,
};