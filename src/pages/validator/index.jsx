import Head from 'next/head';
import useTranslation from 'next-translate/useTranslation';
import ValidatorsPage from 'routes/Validators';

export default function Validators() {
	
	const { t } = useTranslation();
	
	return (
		<>
			<Head>
				<title>InterBloc - {t('common:page-validators')}</title>
			</Head>
			<ValidatorsPage/>
		</>
	)
}