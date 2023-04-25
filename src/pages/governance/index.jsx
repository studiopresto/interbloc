import Head from 'next/head';
import useTranslation from 'next-translate/useTranslation';
import GovernancePage from 'routes/Governance';

export default function Governance() {
	
	const { t } = useTranslation();
	
	return (
		<>
			<Head>
				<title>InterBloc - {t('common:page-governance')}</title>
			</Head>
			<GovernancePage/>
		</>
	)
}