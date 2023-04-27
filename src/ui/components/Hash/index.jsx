import {useCallback} from 'react';
import PropTypes from 'prop-types';
import useTranslation from 'next-translate/useTranslation';
import HashIcon from 'ui/icons/Hash';
import Button from 'ui/components/Button';
import FileIcon from 'ui/icons/File';
import GridSolidIcon from 'ui/icons/GridSolid';
import QRCodeModal from 'ui/modals/qr-code/qr-code';
import {useModal} from 'hooks/useModal';

export default function Hash({ title = 'Hash', value }) {
	
	const { t } = useTranslation();
	const qrCodeModal = useModal(QRCodeModal, { size: 'xs', value, title: t('common:modal-qr') });
	
	const handleModal = useCallback(() => {
		qrCodeModal();
	}, [])
	
	if (!!value) {
		return (
			<div className="hash">
				<div className="hash-icon">
					<HashIcon/>
				</div>
				<span className="h-4 hash-title">{title}:</span>
				<span className="hash-value font-base text-break">{value}</span>
				<div className="hash-action">
					<Button icon>
						<FileIcon/>
					</Button>
					<Button icon onClick={handleModal}>
						<GridSolidIcon/>
					</Button>
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