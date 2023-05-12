import PropTypes from 'prop-types';
import Link from 'next/link';

export default function List({ data }) {
	if (!!data.length) {
		return (
			<ul className="list-custom">
				{
					data.map((item, key) => (
						item ? (
								<li key={key}>
									<span className="color-grey font-16" dangerouslySetInnerHTML={{ __html: item.label }}/>
									{item?.value?.href && item?.value?.newTab
										? (
											<a
												href={item.value.href}
												className="font-16 font-secondary-bold text-break"
												dangerouslySetInnerHTML={{ __html: item.value.title }}
												target="_blank"/>
										)
										: item?.value?.href && !item?.value?.newTab
											? (
												<Link href={item.value.href}>
													<a
														className="font-16 font-secondary-bold text-break"
														dangerouslySetInnerHTML={{ __html: item.value.title }}/>
												</Link>
											)
											: <span className="font-16 font-secondary-bold text-break" dangerouslySetInnerHTML={{ __html: item?.value?.title }}/>}
								</li>
							) : null
					))
				}
			</ul>
		)
	}

	return null
}

List.propTypes = {
	data: PropTypes.arrayOf(PropTypes.shape({
		label: PropTypes.string.isRequired,
		value: PropTypes.shape({
			title: PropTypes.any,
			href: PropTypes.oneOfType([PropTypes.any, PropTypes.string]),
			newTab: PropTypes.bool
		})
	}))
};