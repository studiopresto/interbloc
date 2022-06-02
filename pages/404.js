import Image from 'next/image';
import banner from '~static/images/404.svg';



export default function FourOhFour() {
	return (
		<>
			<div className="pnf">
				<div className="pnf-box">
					<div className="pnf-box-banner">
						<Image src={banner.src} alt="404" layout="fill"/>
					</div>
					<div className="pnf-box-description">
						<p className="pnf-title font-secondary-bold">Sorry</p>
						<p className="font-bold">The page you are looking for can’t be found.</p>
					</div>
				</div>
			</div>
		</>
	)
}