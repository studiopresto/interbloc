import PropTypes from 'prop-types';
import SearchIcon from '~ui/icons/Search';



export default function Input({ type = 'text', placeholder, search }) {
	return (
		<label className="form-control-container">
			{
				search ? <div className="form-control-icon"><SearchIcon/></div> : null
			}
			<input type={type} className="form-control" placeholder={placeholder}/>
		</label>
	)
}

Input.propTypes = {
	type: PropTypes.string,
	placeholder: PropTypes.string
};