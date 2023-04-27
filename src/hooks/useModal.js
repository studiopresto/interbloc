import {useContext} from 'react';
import {ModalContext} from 'context/modal';

export const useModal = (ModalComponent, options = {}) => {
	const { size = 'md', ...modalProps } = options;
	const [open, close] = useContext(ModalContext);
	
	return (onCancel) => {
		const handleCancel = () => {
			close();
			onCancel && onCancel();
		}
		
		open(<ModalComponent onClose={handleCancel} size={size} {...modalProps}/>)
		
		return close;
	}
}