import Link from 'next/link';
import Image from 'next/image';
import useTranslation from 'next-translate/useTranslation';
import logo from '../../../public/static/images/logo.svg';
import routes from 'config/routes';
import VerticalNavItem from './VerticalNavItem';
import HomeIcon from 'ui/icons/Home';
import BlocksIcon from 'ui/icons/Blocks';
import TransactionsIcon from 'ui/icons/Transactions';
import UserIcon from 'ui/icons/User';
import EyeIcon from 'ui/icons/Eye';

export default function VerticalNav() {
	
	const { t } = useTranslation();
	
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
				<VerticalNavItem href={routes.public.index} label={t('common:page-home')}>
					<HomeIcon/>
				</VerticalNavItem>
				<VerticalNavItem href={routes.public.blocks} label={t('common:page-blocks')}>
					<BlocksIcon/>
				</VerticalNavItem>
				<VerticalNavItem href={routes.public.transactions} label={t('common:page-transactions')}>
					<TransactionsIcon/>
				</VerticalNavItem>
				<VerticalNavItem href={routes.public.governance} label={t('common:page-governance')}>
					<EyeIcon/>
				</VerticalNavItem>
				<VerticalNavItem href={routes.public.validators} label={t('common:page-validators')}>
					<UserIcon/>
				</VerticalNavItem>
			</div>
			{/* }
			<div className="verticalNav-detail">
				<VerticalNavItem href={routes.public.index} label="Settings">
					<SettingsIcon/>
				</VerticalNavItem>
			</div>*/}
		</div>
	)
}
