import Head from 'next/head';
import TransactionsPage from '~routes/Transactions';



export default function Transactions() {
	return (
		<>
			<Head>
				<title>InterBloc | Transactions</title>
			</Head>
			<TransactionsPage/>
		</>
	)
}