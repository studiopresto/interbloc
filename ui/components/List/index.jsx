import PropTypes from 'prop-types';



export default function List({ data }) {

	if (!!data.length) {
		return (
			<ul className="list-custom">
				{
					data.map((item, key) => (
						<li key={key}>
							<span className="color-grey font-16">{item[0]}</span>
							<span className="font-16 font-secondary-bold">{item[1]}</span>
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