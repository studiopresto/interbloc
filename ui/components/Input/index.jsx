import PropTypes from 'prop-types';
import SearchIcon from '~ui/icons/Search';
import {useState} from "react";



export default function Input({ type = 'text', placeholder, search, size = null, readonly = false, value = ''  }) {
	const [stateOfInput, setStateOfInput] = useState(value);

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
				value={stateOfInput}
				onChange={(e)=> setStateOfInput(e.target.value)}
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