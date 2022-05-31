import Head from 'next/head';
import BlockOpenPage from '~routes/BlockOpen';



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