import PropTypes from 'prop-types';
import {DebounceInput} from 'react-debounce-input';
import SearchIcon from 'ui/icons/Search';
import CancelIcon from 'ui/icons/Cancel';

export default function Input(
	{
		type = 'text',
		placeholder,
		search = false,
		size = null,
		readonly = false,
		value = '',
		onChange = undefined,
		onReset = undefined
	}) {
	return (
		<label className="form-control-container">
			{search ? <div className="form-control-icon"><SearchIcon/></div> : null}
			<DebounceInput
				minLength={2}
				debounceTimeout={500}
				type={type}
				className={`form-control ${!!size ? 'form-control-' + size : ''}`}
				placeholder={placeholder}
				readOnly={readonly}
				value={value}
				onChange={(e)=> onChange && onChange(e.target.value)}
			/>
			{onReset && value !== '' ? <button className="form-control-button" onClick={onReset}><CancelIcon/></button> : null}
		</label>
	)
}

Input.propTypes = {
	type: PropTypes.string,
	placeholder: PropTypes.string,
	size: PropTypes.oneOf(['md']),
	readonly: PropTypes.bool,
	onChange: PropTypes.func,
	value: PropTypes.string,
	search: PropTypes.bool
};