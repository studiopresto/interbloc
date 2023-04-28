import {useCallback} from 'react';
import PropTypes from 'prop-types';
import toast, { Toaster } from 'react-hot-toast';
import useTranslation from 'next-translate/useTranslation';
import HashIcon from 'ui/icons/Hash';
import Button from 'ui/components/Button';
import FileIcon from 'ui/icons/File';
import GridSolidIcon from 'ui/icons/GridSolid';
import QRCodeModal from 'ui/modals/qr-code/qr-code';
import Tooltip from 'ui/components/Tooltip';
import {useModal} from 'hooks/useModal';
import {styles} from 'config/toast/styles';

export default function Hash({ title = 'Hash', value }) {
	
	const { t } = useTranslation();
	const qrCodeModal = useModal(QRCodeModal, { size: 'xs', value, title: t('common:modal-qr') });
	
	const copyAddress = async () => {
		if ('clipboard' in navigator) {
			await navigator.clipboard.writeText(value);
			return 'success'
		}
		
		return 'error'
	}
	
	const handleCopyAddress = useCallback(() => {
		copyAddress()
			.then(status => {
				toast[status](status === 'success'
					? t('labels:address-was-copied')
					: t('labels:this-didnt-work'),
					{
						style: styles
					});
			})
	}, [copyAddress])
	
	const handleQRModal = useCallback(() => {
		qrCodeModal();
	}, [qrCodeModal])
	
	if (!!value) {
		return (
			<>
				<div className="hash">
					<div className="hash-icon">
						<HashIcon/>
					</div>
					<span className="h-4 hash-title">{title}:</span>
					<span className="hash-value font-base text-break">{value}</span>
					<div className="hash-action">
						<Tooltip text={t('actions:copy-address')} size="xs" textAlign="center">
							<Button icon onClick={handleCopyAddress}>
								<FileIcon/>
							</Button>
						</Tooltip>
						<Tooltip text={t('actions:click-view-qr')} size="sm" textAlign="center">
							<Button icon onClick={handleQRModal}>
								<GridSolidIcon/>
							</Button>
						</Tooltip>
					</div>
				</div>
				<Toaster position="top-center" reverseOrder={true}/>
			</>
		)
	}
	return null
}

Hash.propTypes = {
	title: PropTypes.string,
	value: PropTypes.string.isRequired,
};