import PropTypes from 'prop-types';
import QRCode from 'react-qr-code';

const QRCodeComponent = ({ value }) => {
	return (
		<div className="qr">
			{/*<div className="qr-header">*/}
			{/*	<h3>Address QR Code</h3>*/}
			{/*</div>*/}
			<div className="qr-body">
				<QRCode value={value} bgColor="#1E1F1F" fgColor="#FFFFFF" title="Address QR Code" size={348}/>
				<p className="qr-body-value">{value}</p>
			</div>
		</div>
	)
}

QRCodeComponent.propTypes = {
	value: PropTypes.string.isRequired
}

export default QRCodeComponent