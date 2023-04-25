import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import SearchForm from 'components/SearchForm';
import Button from 'ui/components/Button';
import Dropdown from 'ui/components/Dropdown';
import logo from '../../../public/static/images/logo.svg';
import routes from 'config/routes';
import CaseIcon from "ui/icons/Case";
import LanguageSwitcher from 'components/LanguageSwitcher/LanguageSwitcher';

export default function Header() {
	return (
		<>
		<header className="header">
			<strong className="mobile-logo">
				<Link href={routes.public.index}>
						<Image src={logo.src} alt="InterBloc" width={32} height={40}/>
				</Link>
			</strong>
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
					<span className='nav-bars'></span>				
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