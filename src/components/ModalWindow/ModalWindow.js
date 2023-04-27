import PropTypes from 'prop-types';
import CancelIcon from 'ui/icons/Cancel';

const ModalWindow = ({ onClose, children, size, title = '' }) => {
	return (
		<div className="popup">
			<div className="popup-bg"/>
			<div className="popup-close" onClick={() => onClose()}/>
			<div className={`popup-body ${size}`}>
				<div className="popup-body-close" onClick={() => onClose()}>
					<CancelIcon/>
				</div>
				<div className="popup-body-header">
					<h3>{title}</h3>
				</div>
				<div className="popup-body-content">
					{children}
				</div>
			</div>
		</div>
	)
}

ModalWindow.propTypes = {
	size: PropTypes.oneOf(['lg', 'xl', 'md', 'sm', 'xs']).isRequired,
	children: PropTypes.oneOfType([
		PropTypes.arrayOf(PropTypes.node),
		PropTypes.node
	]).isRequired,
	onClose: PropTypes.func.isRequired
}

export default ModalWindow