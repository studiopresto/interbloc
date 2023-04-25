import PropTypes from 'prop-types';



export default function Checkbox({ onChange, label }) {
	return (
		<label className="form-check">
			<input type="checkbox" className="form-check-input" onChange={onChange}/>
			<span className="form-check-icon"/>
			<span className="form-check-label">{label}</span>
		</label>
	)
}

Checkbox.propTypes = {
	onChange: PropTypes.func.isRequired,
	label: PropTypes.string,
};