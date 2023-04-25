import Head from 'next/head';
import IBCTransactionsPage from 'routes/IBCTransactions';

export default function IBCTransactions() {
	return (
		<>
			<Head>
				<title>InterBloc | IBC Transactions</title>
			</Head>
			<IBCTransactionsPage/>
		</>
	)
}