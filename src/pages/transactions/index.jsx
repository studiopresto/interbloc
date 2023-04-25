import Head from 'next/head';
import useTranslation from 'next-translate/useTranslation';
import TransactionsPage from 'routes/Transactions';

export default function Transactions() {
	
	const { t } = useTranslation();
	
	return (
		<>
			<Head>
				<title>InterBloc - {t('common:page-transactions')}</title>
			</Head>
			<TransactionsPage/>
		</>
	)
}