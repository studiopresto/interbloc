import Head from 'next/head';
import ValidatorOpen from 'routes/ValidatorOpen';



export default function Validator() {
	return (
		<>
			<Head>
				<title>InterBloc | Validator</title>
			</Head>
			<ValidatorOpen/>
		</>
	)
}