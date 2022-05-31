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
/*
Icons
 */
import HomeIcon from '~ui/icons/Home';
import BlocksIcon from '~ui/icons/Blocks';
import SettingsIcon from '~ui/icons/Settings';
import TransactionsIcon from '~ui/icons/Transactions';
import UserIcon from '~ui/icons/User';
import DirectoryIcon from '~ui/icons/Directory';
import EyeIcon from '~ui/icons/Eye';
import BurgerIcon from '~ui/icons/Burger';



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
				<VerticalNavItem href={routes.public.index} label="Home">
					<HomeIcon/>
				</VerticalNavItem>
				<VerticalNavItem href={routes.public.blocks} label="Blocks">
					<BlocksIcon/>
				</VerticalNavItem>
				<VerticalNavItem href={routes.public.transactions} label="Transactions">
					<TransactionsIcon/>
				</VerticalNavItem>
				<VerticalNavItem href={routes.public.interbloc} label="Interbloc">
					<DirectoryIcon/>
				</VerticalNavItem>
				<VerticalNavItem href={routes.public.proposal} label="Proposal">
					<BurgerIcon/>
				</VerticalNavItem>
				<VerticalNavItem href={routes.public.governance} label="Governance">
					<EyeIcon/>
				</VerticalNavItem>
				<VerticalNavItem href={routes.public.validators} label="Validators">
					<UserIcon/>
				</VerticalNavItem>
			</div>
			<div className="verticalNav-detail">
				<VerticalNavItem href={routes.public.index} label="Settings">
					<SettingsIcon/>
				</VerticalNavItem>
			</div>
		</div>
	)
}