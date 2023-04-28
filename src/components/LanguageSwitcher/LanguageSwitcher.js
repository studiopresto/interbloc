import {useMemo} from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import Dropdown from 'ui/components/Dropdown';
import {LANGUAGES} from 'config/constants';

import styles from './LanguageSwitcher.module.scss';

const LanguageSwitcher = () => {
	
	const { locale, asPath } = useRouter();
	const languages = LANGUAGES;
	
	const currentLanguage = useMemo(() => {
		return languages.find(lang => lang.id === locale)
	}, [locale, languages]);
	
	const sortedLanguages = useMemo(() => {
		return languages.sort((a, b) => {
			let la = a.id.toLowerCase();
			let lb = b.id.toLowerCase();
			if (la < lb) {
				return -1;
			}
			if (la > lb) {
				return 1;
			}
			return 0
		})
	}, [locale, languages]);
	
	return (
		<Dropdown label={currentLanguage.iso} icon={currentLanguage.icon}>
			{/*<ul className={styles['languages']}>*/}
			{/*	{sortedLanguages.filter(lang => lang !== currentLanguage).map((language, index) => (*/}
			{/*		<li className={styles['languages-item']} key={index}>*/}
			{/*			<Link href={asPath} locale={language.id}>*/}
			{/*				<a className={styles['languages-link']}>*/}
			{/*					<span className={styles['languages-link-icon']}>*/}
			{/*						<Image src={language.icon || ''} alt={language.name} width={26} height={26}/>*/}
			{/*					</span>*/}
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