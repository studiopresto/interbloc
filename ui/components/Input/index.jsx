import PropTypes from 'prop-types';
import SearchIcon from '~ui/icons/Search';



export default function Input({ type = 'text', placeholder, search, size = null, readonly = false, value = '', onChange }) {
	return (
		<label className="form-control-container">
			{
				search ? <div className="form-control-icon"><SearchIcon/></div> : null
			}
			<input
				type={type}
				className={`form-control ${!!size ? 'form-control-' + size : ''}`}
				placeholder={placeholder}
				readOnly={readonly}
				value={value}
				onChange={(e) => onChange(e)}
			/>
		</label>
	)
}

Input.propTypes = {
	type: PropTypes.string,
	placeholder: PropTypes.string,
	size: PropTypes.oneOf(['md']),
	readonly: PropTypes.bool,
};