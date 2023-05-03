import Image from 'next/image';
import placeholder from '../../../../public/static/images/logo.svg';

export default function EmptyBlock({ title = 'Data is not available' }) {
	return (
		<div className="empty-block">
			<div className="d-flex align-items-center">
				<Image src={placeholder.src} width={40} height={40} alt={title}/>
				<p className="color-grey font-20 ml-3">{title}</p>
			</div>
		</div>
	)
}