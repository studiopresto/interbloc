import Head from 'next/head';
import GovernancePage from '~routes/Governance';

export default function Governance() {
	return (
		<>
			<Head>
				<title>InterBloc | Governance Overview</title>
			</Head>
			<GovernancePage/>
		</>
	)
}