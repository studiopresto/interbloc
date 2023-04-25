import BlocksPage from 'routes/Blocks';
import useTranslation from 'next-translate/useTranslation';
import Head from 'next/head';

export default function Blocks() {
	
	const { t } = useTranslation();
	
	return (
		<>
			<Head>
				<title>InterBloc - {t('common:page-blocks')}</title>
			</Head>
			<BlocksPage/>
		</>
	);
}