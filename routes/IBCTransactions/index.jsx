import dynamic from 'next/dynamic';
/*
Icons
 */
import TransactionsIcon from '~ui/icons/Transactions';
/*
Components
 */
import Box from '~ui/components/Box';
import Preloader from '~ui/components/Preloader';
/*
Lazy components
 */
const IncomingOutgoing = dynamic(async () => {
	return await import('~components/IncomingOutgoing');
}, { ssr: false, loading: () => <Preloader/> });
const IBCPerformance = dynamic(async () => {
	return await import('~components/IBCPerformance');
}, { ssr: false, loading: () => <Preloader/> });
const Channels = dynamic(async () => {
	return await import('~routes/IBCTransactions/Channels');
}, { ssr: false, loading: () => <Preloader/> });



export default function IBCTransactionsPage() {
	return (
		<>
			<div className="page-header-inner">
				<div className="page-header-thumb __orange">
					<TransactionsIcon/>
				</div>
				<div>
					<h1 className="h-2">IBC Transactions</h1>
				</div>
			</div>
			<div className="page-body">
				<div className="row">
					<div className="col-lg-6">
						<Box title="Incoming & Outgoing" theme={1}>
							<IncomingOutgoing/>
						</Box>
					</div>
					<div className="col-lg-6">
						<Box title="Current IBC Performance" theme={1}>
							<IBCPerformance/>
						</Box>
					</div>
				</div>
				<Box title="Stats" adaptiveHeight>
					<div className="row">
						<div className="col-lg-3">
							<ul className="table-list mt-4">
								<li className="mb-4">
									<span className="color-grey font-bold">Relayer Coins (worth):</span>
									<span className="font-16 font-secondary-bold">1.665.456.256$</span>
								</li>
								<li className="mb-4">
									<span className="color-grey font-bold">Sent Coins (worth):</span>
									<span className="font-16 font-secondary-bold">665.456.256$</span>
								</li>
							</ul>
						</div>
						<div className="col-lg-3">
							<ul className="table-list mt-4">
								<li className="mb-4">
									<span className="color-grey font-bold">Different Relayers:</span>
									<span className="font-16 font-secondary-bold">22</span>
								</li>
								<li className="mb-4">
									<span className="color-grey font-bold">Destination count:</span>
									<span className="font-16 font-secondary-bold">18</span>
								</li>
							</ul>
						</div>
						<div className="col-lg-3">
							<ul className="table-list mt-4">
								<li className="mb-4">
									<span className="color-grey font-bold">Tps:</span>
									<span className="font-16 font-secondary-bold">12.5 tp/s</span>
								</li>
							</ul>
						</div>
						<div className="col-lg-3">
							<ul className="table-list mt-4">
								<li className="mb-4">
									<span className="color-grey font-bold">Most active channel:</span>
									<span className="font-16 font-secondary-bold">Cosmos (channel-0)</span>
								</li>
							</ul>
						</div>
					</div>
				</Box>
				<Channels/>
			</div>
		</>
	)
}