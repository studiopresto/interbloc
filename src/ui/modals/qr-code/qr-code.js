import ModalWindow from 'components/ModalWindow/ModalWindow';
import QRCode from 'ui/components/QRCodeComponent/QRCodeComponent';

const QRCodeModal = (props) => {
	return (
		<ModalWindow id="qr-code-modal" {...props}>
			<QRCode {...props}/>
		</ModalWindow>
	)
}

export default QRCodeModal