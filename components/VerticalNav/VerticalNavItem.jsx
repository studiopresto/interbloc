import PropTypes from 'prop-types';
import Link from 'next/link';
import { useRouter } from 'next/router';



export default function VerticalNavItem({ children, href = '/' }) {

	const { asPath } = useRouter();

	return (
		<div className={`verticalNav-list-item ${asPath === href ? 'is-active' : ''}`}>
			<Link href={href}>
				<a>{children}</a>
			</Link>
		</div>
	)
}

VerticalNavItem.propTypes = {
	href: PropTypes.string.isRequired
};