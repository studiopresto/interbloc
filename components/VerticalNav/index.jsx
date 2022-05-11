import Link from 'next/link';
import Image from 'next/image';
import logo from '~static/images/logo.svg';
/*
Config
 */
import routes from '~config/routes';
/*
Components
 */
import VerticalNavItem from '~components/VerticalNav/VerticalNavItem';
import HomeIcon from '~ui/icons/Home';
import BlocksIcon from '~ui/icons/Blocks';
import SettingsIcon from '~ui/icons/Settings';
import TransactionsIcon from '~ui/icons/Transactions';



export default function VerticalNav() {
	return (
		<div className="verticalNav">
			<div className="verticalNav-logo">
				<Link href={routes.public.index}>
					<a>
						<Image src={logo.src} alt="InterBloc" width={32} height={40}/>
					</a>
				</Link>
			</div>
			<div className="verticalNav-list">
				<VerticalNavItem href={routes.public.index}>
					<HomeIcon/>
				</VerticalNavItem>
				<VerticalNavItem href={routes.public.blocks}>
					<BlocksIcon/>
				</VerticalNavItem>
				<VerticalNavItem href={routes.public.transactions}>
					<TransactionsIcon/>
				</VerticalNavItem>
			</div>
			<div className="verticalNav-detail">
				<VerticalNavItem href="#">
					<SettingsIcon/>
				</VerticalNavItem>
			</div>
		</div>
	)
}