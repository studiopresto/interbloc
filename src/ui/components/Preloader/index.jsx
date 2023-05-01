import Image from 'next/image';
import Spinner from './assets/images/Spinner.svg';

export default function Preloader() {
	return (
		<div className="preloader">
			<div className="preloader-icon">
				<Image src={Spinner.src} alt="Loading..." width={70} height={70}/>
			</div>
		</div>
	)
}