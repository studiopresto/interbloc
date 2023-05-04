import {useCallback} from 'react';
import PropTypes from 'prop-types';
import useTranslation from 'next-translate/useTranslation';
import toast, {Toaster} from 'react-hot-toast';
import Tooltip from 'ui/components/Tooltip';
import Button from 'ui/components/Button';
import FileIcon from 'ui/icons/File';
import {styles} from 'config/toast/styles';

const CopyValueButton = ({ value }) => {
	
	const { t } = useTranslation();
	
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
	
	return (
		<>
			<Tooltip text={t('actions:copy-address')} size="xs" textAlign="center">
				<Button icon onClick={handleCopyAddress}>
					<FileIcon/>
				</Button>
			</Tooltip>
			<Toaster position="top-center" reverseOrder={true}/>
		</>
	)
}

CopyValueButton.propTypes = {
	value: PropTypes.string.isRequired
}

export default CopyValueButton