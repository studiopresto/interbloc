import PropTypes from 'prop-types';



export default function List({ data }) {

	if (!!data.length) {
		return (
			<ul className="list-custom">
				{
					data.map((item, key) => (
						<li key={key}>
							<span className="color-grey font-16" dangerouslySetInnerHTML={{ __html: item[0] }}/>
							<span className="font-16 font-secondary-bold text-break" dangerouslySetInnerHTML={{ __html: item[1] }}/>
						</li>
					))
				}
			</ul>
		)
	}

	return null
}

List.propTypes = {
	data: PropTypes.array.isRequired,
};