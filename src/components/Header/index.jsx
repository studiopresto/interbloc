import React, {useEffect} from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import SearchForm from 'components/SearchForm';
import Button from 'ui/components/Button';
import Dropdown from 'ui/components/Dropdown';
import logo from '../../../public/static/images/logo.svg';
import routes from 'config/routes';
import CaseIcon from "ui/icons/Case";
import LanguageSwitcher from 'components/LanguageSwitcher/LanguageSwitcher';

export default function Header() {
	
	const { route } = useRouter();
	
	useEffect(() => {
		if (document) {
			document.body.classList.remove('nav-active')
		}
	}, [route])
	
	return (
		<>
		<header className="header">
			<div className="mobile-logo">
				<Link href={routes.public.index}>
					<a><Image src={logo.src} alt="InterBloc" width={32} height={40}/></a>
				</Link>
			</div>
			<div className="header-panel">
				<div className="header-panel-search">
					<SearchForm/>
				</div>
				<div className="header-panel-action">
					<div className="header-action-item">
						<Dropdown label="USD" prefix="$"/>
					</div>
					<div className="header-action-item">
						<LanguageSwitcher/>
					</div>
					<div className="header-action-item">
						<Button icon color="transparent">
							<CaseIcon/>
						</Button>
					</div>
				</div>
				<span className='nav-opener' onClick={()=>{document.body.classList.toggle('nav-active')}}>
					<span className='nav-bars'/>
				</span>
			</div>
		</header>
		<div className="mbl-search">
		<React.StrictMode>
			<SearchForm/>
		</React.StrictMode>
		</div>
		</>
	)
}