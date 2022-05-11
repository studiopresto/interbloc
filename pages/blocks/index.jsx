import BlocksPage from 'routes/Blocks';
import Head from 'next/head';



export default function Blocks() {
	return (
		<>
			<Head>
				<title>InterBloc | Blocks</title>
			</Head>
			<BlocksPage/>
		</>
	);
}