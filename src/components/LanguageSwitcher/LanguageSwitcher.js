import {useMemo} from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Dropdown from 'ui/components/Dropdown';
import {LANGUAGES} from 'config/constants';

import styles from './LanguageSwitcher.module.scss';

const LanguageSwitcher = () => {
	
	const { locale, asPath } = useRouter();
	const languages = LANGUAGES;
	
	const currentLanguage = useMemo(() => {
		return languages.find(lang => lang.id === locale)
	}, [locale]);
	
	return (
		<Dropdown label={currentLanguage.iso}>
			{/*<ul className={styles['languages']}>*/}
			{/*	{languages.filter(lang => lang !== currentLanguage).map((language, index) => (*/}
			{/*		<li className={styles['languages-item']} key={index}>*/}
			{/*			<Link href={asPath} locale={language.id}>*/}
			{/*				<a className={styles['languages-link']}>*/}
			{/*					<span className={styles['languages-link-title']}>{language.iso}</span>*/}
			{/*				</a>*/}
			{/*			</Link>*/}
			{/*		</li>*/}
			{/*	))}*/}
			{/*</ul>*/}
		</Dropdown>
	)
}

export default LanguageSwitcher