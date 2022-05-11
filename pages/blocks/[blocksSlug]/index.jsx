import BlockOpenPage from '~routes/BlockOpen';
import Head from 'next/head';

export default function Block() {
	return (
		<>
			<Head>
				<title>InterBloc | Block</title>
			</Head>
			<BlockOpenPage/>
		</>
	)
}