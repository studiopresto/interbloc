import {useCallback} from 'react';
import PropTypes from 'prop-types';
import useTranslation from 'next-translate/useTranslation';
import {useModal} from 'hooks/useModal';
import QRCodeModal from 'ui/modals/qr-code/qr-code';
import Tooltip from 'ui/components/Tooltip';
import Button from 'ui/components/Button';
import GridSolidIcon from 'ui/icons/GridSolid';

const OpenQRCode = ({ value }) => {
	
	const { t } = useTranslation();
	const qrCodeModal = useModal(QRCodeModal, { size: 'xs', value, title: t('common:modal-qr') });
	
	const handleQRModal = useCallback(() => {
		qrCodeModal();
	}, [qrCodeModal])
	
	return (
		<Tooltip text={t('actions:click-view-qr')} size="sm" textAlign="center">
			<Button icon onClick={handleQRModal}>
				<GridSolidIcon/>
			</Button>
		</Tooltip>
	)
}

OpenQRCode.propTypes = {
	value: PropTypes.string.isRequired
}

export default OpenQRCode