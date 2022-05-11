import Image from 'next/image';
import logo from '~static/images/logo-white.png';
/*
Components
 */
import UnionIcon from '~ui/icons/Union';
import Button from '~ui/components/Button';
/*
Icons
 */
import ArrowLongIcon from '~ui/icons/ArrowLong';
import Box from '~ui/components/Box';
import BlocksIcon from '~ui/icons/Blocks';


export default function MainPage() {

	return (
		<>
			<div className="page-header">
				<div className="d-md-flex align-items-md-center">
					<div className="page-header-icon">
						<Image src={logo} width={132} height={31}/>
					</div>
					<div>
						<h1 className="h-1">B2B blockchain services</h1>
						<p className="h-3">and consulting</p>
					</div>
				</div>
				<Button href="#" label="Projects" color="primary" withIcon>
					<ArrowLongIcon/>
				</Button>
			</div>
			<div className="row">
				<div className="col-4">
					<Box title="Blocks" theme={1} icon={<BlocksIcon/>} color="turquoise"/>
				</div>
				<div className="col-4">
					<Box title="Tokenomics" theme={2} icon={<UnionIcon/>} color="orange"/>
				</div>
			</div>
		</>
	)
}