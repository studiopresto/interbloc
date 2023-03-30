import Head from 'next/head';
import ProposalPage from '~routes/Proposal';



export default function Proposal() {
    return (
        <>
            <Head>
                <title>InterBloc | Proposal</title>
            </Head>
            <ProposalPage/>
        </>
    )
}