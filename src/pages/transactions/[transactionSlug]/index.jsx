import Head from 'next/head';
import TransactionPage from 'routes/Transaction';

export default function Transaction() {
	return (
		<>
			<Head>
				<title>InterBloc | Transaction</title>
			</Head>
			<TransactionPage/>
		</>
	)
}