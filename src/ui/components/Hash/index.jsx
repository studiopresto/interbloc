import PropTypes from 'prop-types';
import HashIcon from 'ui/icons/Hash';
import CopyValueButton from 'components/CopyValueButton/CopyValueButton';
import OpenQRCode from 'ui/components/OpenQRButton/OpenQRCode';

export default function Hash({ title = 'Hash', value }) {
	
	if (!!value) {
		return (
			<div className="hash">
				<div className="hash-icon">
					<HashIcon/>
				</div>
				<span className="h-4 hash-title">{title}:</span>
				<span className="hash-value font-base text-break">{value}</span>
				<div className="hash-action">
					<CopyValueButton value={value}/>
					<OpenQRCode value={value}/>
				</div>
			</div>
		)
	}
	return null
}

Hash.propTypes = {
	title: PropTypes.string,
	value: PropTypes.string.isRequired,
};